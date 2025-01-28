import { readFileSync, writeFileSync } from "fs";
import Papa from "papaparse";

export function readCSV(file) {
  const fileContent = readFileSync(file, "utf8");
  const records = Papa.parse(fileContent, {
    header: true,
  });
  const headers = records.meta.fields;
  const body = records.data;
  return { headers, body };
}

export function writeCSV(path, data) {
  const stringify = Papa.unparse(data);
  writeFileSync(path, stringify);
}