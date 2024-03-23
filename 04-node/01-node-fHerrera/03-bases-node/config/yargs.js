const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar",
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    describe: "Muestra la tabla en consola",
    default: false,
  })
  .option("h", {
    alias: "hasta",
    type: "number",
    default: 10,
    describe: "limite deñ producto",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw `la base tiene que ser un numero`;
    } else {
      return true;
    }
  }).argv;

module.exports = argv;
