import validator from "validator";
import fetch from 'node-fetch';

// Checks for a valid email pattern
export const isEmail = (text) => {
  return validator.isEmail(text) || text === "NA" || text === "N/A";
};

// Checks for a valid URL pattern
export const isURL = (text) => {
  return validator.isURL(text);
};

// Checks for a URL containing "linkedin"
export const isLinkedInURL = (text) => {
  return validator.isURL(text) && text.includes("linkedin");
};

// Regex for employee size patterns
export const isEmployeeSize = (text) => {
  const employeeSizeRegex = /^(?:\d+(?:-\d+)?|\d+k\+?|\d+\+)$/i;
  return employeeSizeRegex.test(text);
};

// Checks for a company name that is not a number, URL, or employee size
export const isCompanyName = (text) => {
  return (
    !validator.isNumeric(text) &&
    !validator.isURL(text) &&
    !isEmployeeSize(text)
  );
};

// Validates if the text is a phone number (no alphabet characters allowed)
export const isPhoneNumber = (text) => {
  return !/[a-zA-Z]/.test(text); // Checks if there's no alphabet
};

// Checks if the location is valid by using the OpenStreetMap API
export const isLocation = async (text) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json`);
    const data = await response.json();
    return data.length > 0; // Returns true if the location exists in the OpenStreetMap database
  } catch (error) {
    console.error("Error fetching location data:", error);
    return false;
  }
};

// Checks if the date follows the format YYYY-MM-DD
export const isDate = (text) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(text); // Matches exactly "YYYY-MM-DD"
};
