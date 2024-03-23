// const { writeFile } = require("node:fs");
// const { Buffer } = require("node:buffer");

const colors = require("colors");
const { resultfileSystem } = require("./helpers/multiplicar");
const argv = require("./config/yargs");

let a = "toda";
let b = "la vida";
let c = "lo mismo".trap;
let d = "de siempre".rainbow;

// console.log(`${a.blue} ${b.underline.yellow} ${c.magenta.inverse} ${d.red}`);
//* opcion l -> listar

// console.clear();

// console.log(process.argv);
// console.log(argv);
// console.log(argv.b);
// console.log("base.yargs", argv.base);

// *imprimir por consola
// const valor = 7;

//* Procesos de ejecución en consola
// console.log(process.argv);
// const [, , arg3 = "base=5"] = process.argv;
// const [, base] = arg3.split("=");
// console.log(base);
// console.log(arg3);

//* imprimir desde consola
console.log(argv.h);
resultfileSystem(argv.b, argv.l, argv.h)
  .then((nombreArchivo) => console.log(nombreArchivo.yellow + "enviado".red))
  .catch((err) => console.log(err));
