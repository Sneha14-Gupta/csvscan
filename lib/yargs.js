import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJSON = require("../package.json");

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
export const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    type: "string",
    description: "Input CSV file",
  })
  .option("output", {
    alias: "o",
    type: "string",
    description: "Output CSV file for clean data",
  })
  .option("report", {
    alias: "r",
    type: "string",
    description: "Output CSV file for error reports",
  })
  .help("h")
  .alias("h", "help")
  .version(packageJSON.version)
  .alias("v", "version")
  .parse();