import { text, isCancel, cancel } from "@clack/prompts";
import { argv } from "./yargs.js";
import core from "./core.js";

export default async function () {
  let input, output, report;

  // If CLI arguments are provided, use them
  if (argv.input && argv.output && argv.report) {
    input = argv.input;
    output = argv.output;
    report = argv.report;
  } else {
    // Otherwise, use interactive prompts
    input = await text({
      message: "What is your input file?",
      defaultValue: "leads.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    output = await text({
      message: "What is your output file?",
      defaultValue: "final.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    report = await text({
      message: "What is your report file?",
      defaultValue: "report.csv",
      validate: (value) => {
        if (!value.toLowerCase().endsWith("csv")) {
          return "Only csv files are supported.";
        }
      },
    });

    // Check for cancel
    if (isCancel(input) || isCancel(output) || isCancel(report)) {
      cancel("Operation cancelled.");
      process.exit(1);
    }
  }

  return { input, output, report };
}