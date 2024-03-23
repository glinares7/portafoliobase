import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

import {
  menu,
  leerInput,
  pausa,
  mostrarListadoCheckList,
  listarTareasBorrar,
  confirmar,
} from "./helpers/inquirer.js";

import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();

  //* enviar los datos del json a mi modelo
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await menu();
    // console.log({ opt });
    switch (opt) {
      case "1":
        // * agregamos el input
        const desc = await leerInput("Descripcion:");

        tareas.crearTarea(desc);
        console.log("elemento agregado");
        break;

      case "2":
        console.log(tareas.listadoCompleto());

        break;

      case "3":
        tareas.listarPendientesCompletados(true);
        break;

      case "4":
        tareas.listarPendientesCompletados(false);
        break;

      case "5":
        const idx = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.togleCompletadas(idx);

        break;

      case "6":
        const id = await listarTareasBorrar(tareas.listadoArr);
        if (id != 0) {
          const ok = await confirmar("¿Estas seguro?");

          if (ok) {
            tareas.borrarTareas(id);
            console.log("se borro");
          }
        }
        break;

      default:
        break;
    }

    //* el objeto lo pasamos dentro de un array para hacer el forEach
    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
