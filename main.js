#!/usr/bin/env node

import { readCSV, writeCSV } from "./lib/io.js";
import core from "./lib/core.js";

// Handling CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;



function main() {
  const csvData = readCSV(argv.input);
  const [clean, errors] = core(csvData.body);
  console.log("Validation rules complete ✅");

  // Generate clean csv
  writeCSV(argv.output, clean);
  console.log("Write to clean done ✅");

  // Generate report
  writeCSV(argv.report, errors);
  console.log("Generated report successfully! ✅");
}

main();