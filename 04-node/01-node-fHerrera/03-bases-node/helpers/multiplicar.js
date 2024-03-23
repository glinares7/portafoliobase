const fs = require("fs");
const colors = require("colors");

const crearArchivo = (valor = 5, listar, hasta) => {
  return new Promise((resolve, reject) => {
    let salida = "";
    let consola = "";
    for (let i = 1; i <= hasta; i++) {
      salida += `${valor} x ${i} =  ${i * valor}\n`;
      consola += `${colors.yellow(valor)} ${" x".green}  ${colors.yellow(i)} ${
        "=".magenta
      } ${colors.cyan(i * valor)}\n`;
    }

    if (listar) {
      console.log("==============================================".rainbow);
      console.log(
        `             ${"Tabla del".yellow} ${colors.blue(
          valor
        )}               `
      );
      console.log("==============================================".rainbow);

      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${valor}.txt`, salida);
    // console.log(`tabla-${valor}.txt creado`);

    if (salida) {
      resolve(`tabla-${valor}.txt `);
    } else {
      reject(`el archivo al que accede no tiene permisos `);
    }
  });
};

const resultfileSystem = async (valor, listar, hasta) => {
  try {
    const vol1 = await crearArchivo(valor, listar, hasta);

    return vol1;
  } catch (err) {
    throw ("mostrarme el error", err);
  }
};
module.exports = {
  resultfileSystem,
};

// *node 16.x
// const data = new Uint8Array(Buffer.from(salida));
// writeFile("message.txt", data, (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });
// console.log(salida);

// *node 14.x
//   fs.writeFile(`tabla-${valor}.txt`, salida, (err) => {
//     if (err) throw err;

//     console.log("envio exitoso 2");
//   });
