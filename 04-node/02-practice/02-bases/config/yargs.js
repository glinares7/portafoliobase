const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .options({
    base: {
      alias: "b",
      type: "number",
      describe: "la base del numero a multiplicar",
      demanOption: true,
    },
  })
  .option({
    listar: {
      alias: "l",
      type: "boolean",
      describe: "si va tener o no el titulo",
    },
  })
  .option({
    hasta: {
      alias: "h",
      type: "number",
      describe: "donde finaliza el multiplicador",
    },
  })
  .check((argv, options) => {
    const filePaths = argv.b;
    if (isNaN(filePaths)) {
      throw "la base es obligatoria ";
    } else {
      return true;
    }
  }).argv;

module.exports = argv;
