import { select, isCancel, cancel } from "@clack/prompts";
import * as v from "./validate.js";

// Function to validate records
export default async function (records, headers) {
  const clean = [];
  const errors = [];
  const companiesSet = new Set();

  const requiredFields = [
    "Company Name",
    "Email",
    "LinkedIn Profile URL",
    "Employee Size",
    "Company URL",
    "Location",
    "Phone Number",
  ];

  let resolvedHeaders = {};


  for (const field of requiredFields) {
    resolvedHeaders[field] = await select({
      message: `Which column corresponds to ${field}?`,
      options: [
        ...headers.map((h) => ({ value: h, label: h })),
        { value: null, label: "None" },
      ],
    });

    if (isCancel(resolvedHeaders[field])) {
      cancel(`Operation cancelled.`);
      process.exit(1);
    }
  }

  for (let record of records) {
    const recordError = [];

    for (const field of requiredFields) {
      const column = resolvedHeaders[field];

      if (column) {
        const value = record[column];

        if (!value) {
          recordError.push(`${field} is missing`);
          continue;
        }

        // Validate based on field type
        switch (field) {
          case "Company Name":
            if (!v.isCompanyName(value)) recordError.push("Incorrect company name");
            else if (companiesSet.has(value)) recordError.push("Duplicate company name");
            else companiesSet.add(value);
            break;

          case "LinkedIn Profile URL":
            if (!v.isLinkedInURL(value)) recordError.push("Incorrect LinkedIn profile URL");
            break;

          case "Employee Size":
            if (!v.isEmployeeSize(value)) recordError.push("Incorrect employee size");
            break;

          case "Company URL":
            if (!v.isURL(value)) recordError.push("Incorrect company URL");
            break;

          case "Email":
            if (!v.isEmail(value)) recordError.push("Incorrect email");
            break;

          case "Location":
            if (!v.isLocation(value)) recordError.push("Incorrect location");
            break;

          case "Phone Number":
            if (!v.isPhoneNumber(value)) recordError.push("Incorrect phone number");
            break;
        }
      }
    }

    if (recordError.length > 0) {
      errors.push({ ...record, errors: recordError });
    } else {
      clean.push(record);
    }
  }

  return { clean, errors };
}