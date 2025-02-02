#!/usr/bin/env node
import { intro, outro, log} from "@clack/prompts";
import core from "./lib/core.js";
import prompt from "./lib/prompt.js";
import { readCSV, writeCSV } from "./lib/io.js";

async function main() {
  intro(`CSVSCAN start your csv validation`);

  const { input, output, errors: errorsFile } = await prompt();

  // const s = spinner();

  log.success(input);
  log.success(output);
  log.success(errorsFile);

  // s.start("Reading the file");

  const csvData = readCSV(input);
  const [clean, errors] = core(csvData.body);

  log.success("Validation rules complete ✅");

  // s.start("Creating new files");

  // Generate clean csv
  writeCSV(output, clean);
  log.success("Write to clean done ✅");

  // Generate report
  writeCSV(errorsFile, errors);
  log.success("Generated report successfully! ✅");

  // s.stop();
  outro("You're done!");
}

await main();