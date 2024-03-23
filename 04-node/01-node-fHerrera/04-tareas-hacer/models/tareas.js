//* tareas

const Tarea = require("./tarea");
const colors = require("colors");

//*  listado :
//*     {"uuid-123adf32314GDFQ2341WSS": { id: 12, dest: asd, completadoEN: 9215 };
// }

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      //* evaluacdo su id
      // console.log(key);

      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTareas(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  cargarTareasFromArray(tareas = []) {
    // const tarea = new Tarea(tareas);

    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
    return tareas;
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // console.log(this._listado);

    this.listadoArr.forEach((dat, i) => {
      let idx = `${i + 1}`.green;

      const { desc, completadoEn } = dat;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
      // console.log(dat.completadoEn);

      // if (dat.completadoEn != null) {
      //   console.log(`${colors.cyan(dat.desc)} :: ${"Completadas".green}`);
      //   // console.log("completado", dat.completadoEn);
      // } else if (dat.completadoEn == null) {
      //   console.log(`${colors.cyan(dat.desc)} :: ${"Pendiente".red}`);
      //   // console.log("pendiente", dat.completadoEn);
      // }
      // console.log(`${dat.desc}`.red);
    });
    // * completada En verde
    // * Pendiente En verde
    //* 1. Ama :: Completada || pendiente
  }

  listarPendientesCompletados(completadas) {
    let contador = 0;
    this.listadoArr.forEach((dat) => {
      const { desc, completadoEn } = dat;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      //*mostrar completados

      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${contador.toString().green + ".".green} ${desc} :: ${
              completadoEn.green
            } `
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }

      // completadas ?? console.log(`COMPLETADO ${desc} :: ${estado}`);

      // //*mostrar pendientes
      // completadas ?? console.log(`PENDIENTE ${desc} :: ${estado}`);
    });
  }

  togleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
