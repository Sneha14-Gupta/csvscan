import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import Papa from "papaparse";
import { log, select } from "@clack/prompts";

const error = chalk.bold.red;

export function readCSV(file) {
  try {
    const fileContent = readFileSync(file, "utf8");
    const records = Papa.parse(fileContent, {
      header: true,
    });
    const headers = records.meta.fields;
    const body = records.data;
    return { headers, body };
  } catch (err) {
    log.error(error("Error occured while reading the file"));
    process.exit(1);
  }
}

export function writeCSV(path, data) {
  try {
    const stringify = Papa.unparse(data);
    writeFileSync(path, stringify);

    log.success("File written successfully");
  } catch (err) {
    log.error(error("Error occured while writing the file"));
    process.exit(1);
  }
}