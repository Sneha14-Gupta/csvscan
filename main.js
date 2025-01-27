const fs = require("fs");
const papa = require("papaparse");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

// Get input, output files from cli arguments
const inputFile = argv.input;
const outputFile = argv.output;

// Function to read from the csv file
function readCsv(file) {
  const fileContent = fs.readFileSync(file, "utf-8");
  const records = papa.parse(fileContent, {
    header: true,
  });
  const headers = records.meta.fields;
  const body = records.data;
  return { headers, body };
}

function writeCSV(path,data){
    const stringfy=papa.unparse(data.body)
    fs.writeFileSync(path,stringfy)

}
writeCSV(outputFile,readCsv(inputFile))