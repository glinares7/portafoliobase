const argv = require("./config/yargs");
const resultadoTabla = require("./helpers/multiplicar");

// const entorno = process.argv.slice(-1)
// const cadena = entorno.toString().split('=')

// console.log(cadena[cadena.length - 1]);

resultadoTabla(argv.b, argv.l, argv.h)
  .then((data) => console.log(`${data} correctamente`))
  .catch((err) => console.log("Erro al procesar el archivo", err));
