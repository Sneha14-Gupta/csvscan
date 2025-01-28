import { readCSV, writeCSV } from "./lib/io.js";
import * as v from "./lib/validate.js";

console.log(v.isEmail("hey@gmail.com"));

// Handling CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

function validateAndClean(records) {
  const clean = [];
  const errors = [];
  const companies = new Set();

  for (let record of records) {
    const recordError = [];
    // Validate company name
    if (!v.isCompanyName(record["Company Name"])) {
      recordError.push("Company name is not valid");
    } else if (companies.has(record["Company Name"])) {
      recordError.push("Company name is not unique");
    } else {
      companies.add(record["Company Name"]);
    }

    // Validate linkedin url
    if (!v.isLinkedInURL(record["LinkedIn Profile URL"])) {
      recordError.push("LinkedIn url is not valid");
    }

    // Validate employee size
    if (!v.isEmployeeSize(record["Employee Size"])) {
      recordError.push("Employee size is not valid");
    }

    // Validate website url
    if (!v.isURL(record["Website URL"])) {
      recordError.push("Website URL is not valid");
    }

    if (!recordError.length) {
      clean.push(record);
    } else {
      errors.push({ ...record, errors: recordError });
    }
  }

  return [clean, errors];
}

function main() {
  const csvData = readCSV(argv.input);
  const [clean, errors] = validateAndClean(csvData.body);
  console.log("Validation rules complete ✅");

  // Generate clean csv
  writeCSV(argv.output, clean);
  console.log("Write to clean done ✅");

  // Generate report
  writeCSV(argv.report, errors);
  console.log("Generated report successfully! ✅");
}

main();