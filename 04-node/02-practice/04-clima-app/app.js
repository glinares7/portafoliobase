import { inquirerMenu, leerInput, listarLugares } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
import * as dotenv from "dotenv";
import {} from "colors";

dotenv.config();

const main = async () => {
  const busqueda = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();
    // console.log(opt);

    switch (opt) {
      case "1":
        const termino = await leerInput("Ciudad:");

        const lugares = await busqueda.Ciudad(termino);

        const id = await listarLugares(lugares);
        if (id == "0") continue;
        const lugarSel = lugares.find((l) => l.id === id);

        busqueda.agregarHistorial(lugarSel.nombre);
        const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);

        console.log("información de la ciudad");
        console.log("ciudad: ", lugarSel.nombre);
        console.log("lat : ", lugarSel.lat);
        console.log("lng : ", lugarSel.lng);
        console.log("Temperatura : ", clima.temp);
        console.log("maximo :", clima.max);
        console.log("min :", clima.min);
        console.log("¿Como esta el clima? :", clima.desc.green);

        break;
      case "2":
        busqueda.historialCapitalizado.forEach((lugar, i) => {
          console.log(`${i + 1} . ${lugar}`);
        });
        break;
      case "0":
        console.log("salir");
        break;
      default:
        break;
    }
  } while (opt != "0");
};

main();
