import { createRequire } from "module";
import { text, isCancel, cancel } from "@clack/prompts";

const require = createRequire(import.meta.url);
const packageJSON = require("../package.json");

// Handling CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    type: "string",
    description: "What is the input file",
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "What will be the output file",
  })
  .option("errors", {
    alias: "e",
    type: "string",
    description: "What will be the errors file",
  })
  .help("h")
  .alias("h", "help")
  .version(packageJSON.version)
  .alias("v", "version")
  .parse();

export default async function () {
  let { input, output, errors } = argv;

  //  Prompt if the values are not in CLI arguments
  if (!(input && output && errors)) {
    input = await text({
      message: "What is your input file?",
      placeholder: "The csv file to read",
      initialValue: "companies.csv",
      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    output = await text({
      message: "What will be the output file?",
      placeholder: "The output csv file",
      initialValue: "final.csv",
      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    errors = await text({
      message: "What will be the errors file?",
      placeholder: "The csv file for errors",
      initialValue: "errors.csv",
      validate(value) {
        if (!value.toLowerCase().endsWith(".csv"))
          return `Only csv files are supported!`;
      },
    });

    if (isCancel(input) || isCancel(output) || isCancel(errors)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  return { input, output, errors };
}