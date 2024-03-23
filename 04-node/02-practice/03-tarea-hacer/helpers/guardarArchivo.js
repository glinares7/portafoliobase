import fs from "fs";

const path = "./db/data.json";

export const guardarDB = (data) => {
  const plano = JSON.stringify(data);
  const entrada = fs.writeFileSync(path, plano);
  return entrada;
};
export const leerDB = () => {
  const salida = fs.readFileSync(path, { encoding: "utf8" });
  const data = JSON.parse(salida);
  return data;
};
