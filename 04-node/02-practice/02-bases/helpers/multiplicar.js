const fs = require("fs");
const colors = require("colors");

const promisePrueba = (base, listar, hasta) => {
  return new Promise((resolve, reject) => {
    let titulo = "";
    let mostrador = "";
    let operador = "";

    let j = base;

    for (let i = 1; i <= hasta; i++) {
      mostrador += `${colors.cyan(`${j}`)} x ${colors.yellow(
        `${i}`
      )} = ${colors.bgBlue(`${j * i}`.brightRed)}\n`;
      operador += `${j} x ${i} = ${j * i}\n`;
    }

    if (listar) {
      titulo = `
      ${colors.rainbow("<!-------------------------------------------!>")}  
               ${colors.green(`Tabla de multiplicar del`)} ${colors.cyan(
        `${base}`
      )} 
      ${colors.rainbow("<!-------------------------------------------!>")} \n  
      `;
    }
    operador;
    console.log(titulo);
    console.log(mostrador);

    fs.writeFileSync(`./salida/dato-entrada-${base}.txt`, operador);

    if (operador) {
      resolve("title.txt enviado");
    } else {
      reject(`file no enviado`);
    }
  });
};

const resultadoTabla = async (base, hasta, limite) => {
  try {
    const result = await promisePrueba(base, hasta, limite);

    return result;
  } catch (error) {
    throw new Error(error, "no enviado");
  }
};

module.exports = resultadoTabla;
