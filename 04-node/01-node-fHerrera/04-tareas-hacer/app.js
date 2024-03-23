require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
// const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
//* opciones personalizadas
// const { mostrarMenu, pausa } = require("./helpers/message");

// console.clear();

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  //*ver lo que se imprime antes de terminar la ejecución
  // await pausa();

  do {
    // opt = await mostrarMenu();

    opt = await inquirerMenu();
    console.log({ opt });

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");

        tareas.crearTarea(desc);
        break;

      case "2":
        console.log(tareas.listadoCompleto());
        // console.log(tareas.listadoArr);
        break;
      case "3":
        console.log(tareas.listarPendientesCompletados(true));
        break;
      case "4":
        console.log(tareas.listarPendientesCompletados(false));
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.togleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id != 0) {
          const ok = await confirmar("¿Esta seguro?");
          //* preguntar si esta seguro para hacer la confirmación

          if (ok) {
            tareas.borrarTareas(id);
            console.log("tarea borrada");
          }
        }
        break;
      default:
        break;
    }
    //*models tarea pending
    // const tareas = new Tareas();
    // const tarea = new Tarea("Comprar comida");
    // // console.log(tarea);
    // tareas._listado[tarea.id] = tarea;
    // console.log(tareas);

    //* guardar en el json
    guardarDB(tareas.listadoArr);

    await pausa();

    // if (opt !== "0") await pausa();
  } while (opt !== "0");
};
main();
