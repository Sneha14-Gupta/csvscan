import fs from "fs";
import Papa from "papaparse";
import { log } from "@clack/prompts";


export function readCSV(file) {
  try {
    const fileContent = fs.readFileSync(file, "utf-8");
    const parse = Papa.parse(fileContent, {
      header: true,
    });

    return { body: parse.data, headers: parse.meta.fields };
  } catch (err) {
    log.error(`Error reading from ${file}`);
    process.exit(1);
  }
}

export function writeCSV(file, data) {
  const stringify = Papa.unparse(data);
  try {
    fs.writeFileSync(file, stringify);
  } catch (err) {
    log.error(`Error writing to ${file}`);
    process.exit(1);
  }
}