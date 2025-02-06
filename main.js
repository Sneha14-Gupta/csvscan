#!/usr/bin/env node
import { intro, spinner, log, outro } from "@clack/prompts";
import { readCSV, writeCSV } from "./lib/io.js";
import chalk from "chalk";
import prompt from "./lib/prompt.js";
import core from "./lib/core.js";

const introduction = chalk.bold.green;
const outroColor = chalk.bold.blue;

async function main() {
  intro(introduction(`CSVGuard validate your LinkedIn leads CSV file.`));
  const { input, output, report } = await prompt();
  const { body, headers } = readCSV(input);
  const { clean, errors } = await core(body, headers);
  writeCSV(output, clean);
  if (report) {
    writeCSV(report, errors);
  }
  log.success(
    introduction(
      `File validation completed. Check ${output} and ${report} for results.`
    )
  );
  outro(outroColor(`You're all set!`));
}

main();
