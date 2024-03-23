import { Tarea } from "./tarea.js";

export class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const data = this._listado[key];
      listado.push(data);
    });

    return listado;
  }

  cargarTareasFromArray(tareas = []) {
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
    return this.listadoArr;
  }

  listarPendientesCompletados(completados) {
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completadas" : "Pendiente";

      if (completados) {
        if (completadoEn) {
          contador += 1;
          console.log(`${contador}. ${desc} :: ${completadoEn}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${contador} ${desc} :: ${estado}`);
        }
      }
    });
  }

  togleCompletadas(idx = []) {
    idx.forEach((id) => {
      const tareas = this._listado[id];
      if (!tareas.completadoEn) {
        tareas.completadoEn = new Date().toISOString();
      }

      this.listadoArr.forEach((tarea) => {
        //* los array de mi modelo asociado al json que no estan incluidos seran asinado null en el valor de la propiedad completadosEn
        if (!idx.includes(tarea.id)) {
          this._listado[tarea.id].completadoEn = null;
        }
      });
    });
  }

  borrarTareas(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
}
