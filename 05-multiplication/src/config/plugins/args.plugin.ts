import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const args = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Base of multiplication table",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Limit of multiplication table",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show the multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "table",
    describe: "Name of the file",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "Destination of the file",
  })
  .check((argv) => {

    if (argv.b < 1) throw "Error: The base must be greater than 0";

    return true;
  })
  .parseSync()