const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("colors");
// console.log("el verano se oculto");

require("dotenv").config();

//todo VARIABLES DE ENTORNO
//* console.log(process.env.MAPBOX_KEY);

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();
    // console.log(opt);

    switch (opt) {
      case 1:
        // *mostrar mensaje
        const termino = await leerInput("Ciudad");

        //* buscar el lugar
        const lugares = await busquedas.Ciudad(termino);
        // console.log(lugarSel);

        //* seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id == "0") continue;
        const lugarSel = lugares.find((l) => l.id === id);

        //* guardar en db
        busquedas.agregarHistorial(lugarSel.nombre);

        // console.log(lugarSel);
        // *Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        // console.log("clima", clima);
        //* mostrar resultados

        console.log(`Información de la ciudad`.green);
        console.log("ciudad", lugarSel.nombre.green);
        console.log("lat", lugarSel.lat);
        console.log("lng", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("minina", clima.min);
        console.log("maxima", clima.max);
        console.log("Como esta el clima", clima.desc.green);

        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          // busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;

          console.log(`${idx} ${lugar}`);
        });
        break;
      case 0:
        console.log("Salir");
        break;

      default:
        break;
    }

    if (opt != 0) {
      await pausa();
    }
  } while (opt != 0);
};

main();
