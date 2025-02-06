import validator from "validator";
import fetch from "node-fetch";

export const isCompanyName = (text) => {
  return !validator.isURL(text) && !validator.isNumeric(text);
};

export const isEmail = (text) => {
  return validator.isEmail(text) || text === "NA" || text === "N/A";
};

export const isLinkedInURL = (text) => {
  return validator.isURL(text) && text.includes("linkedin");
};

export const isEmployeeSize = (text) => {
  const employeeSizeRegEx = /^(?:\d+-\d+|\d+k\+|\d+k|\d+\+|\d+)$/;
  return employeeSizeRegEx.test(text);
};

export const isURL = (text) => {
  return validator.isURL(text);
};

export const isLocation = async (text) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        text
      )}&format=json`
    );
    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return false;
  }
};

export const isPhoneNumber = (text) => {
  return (
    !validator.matches(text, /[a-zA-Z]/) && 
    !validator.matches(text, /[^0-9+\-()]/) && 
    text.length > 5
  );
};