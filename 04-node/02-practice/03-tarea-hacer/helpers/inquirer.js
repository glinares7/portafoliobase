import {} from "colors";
import inquirer from "inquirer";

export const menu = async () => {
  const question = [
    {
      type: "list",
      name: "tarea",
      message: "La tarea asignada es  ",
      choices: [
        { value: "1", name: "Crear tareas" },
        { value: "2", name: "Listar tareas" },
        { value: "3", name: "Listar  tareas completadas" },
        { value: "4", name: "Listar tareas pendientes" },
        { value: "5", name: "Completar tara(s)" },
        { value: "6", name: "Borrar tareas" },
        { value: "0", name: "Salir" },
      ],
    },
  ];

  const { tarea } = await inquirer.prompt(question);

  return tarea;
};

export const leerInput = async (message) => {
  const entrada = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "debe proporcionar mas datos";
        } else {
          return true;
        }
      },
    },
  ];
  const { desc } = await inquirer.prompt(entrada);
  return desc;
};

export const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = ` ${i + 1}`;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const check = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(check);
  return ids;
};

export const listarTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    return {
      value: tarea.id,
      name: `${idx + 1} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `0. Cancelar `,
  });
  const entrada = [
    {
      type: "list",
      name: "desc",
      message: "borro el item",
      choices,
    },
  ];

  const { desc } = await inquirer.prompt(entrada);
  return desc;
};

export const confirmar = async (message = "") => {
  const salida = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(salida);
  return ok;
};

export const pausa = async () => {
  const salida = [
    {
      type: "input",
      name: "salida",
      message: "presione enter para continuar",
      choices: [{ value: "0", name: "estado saliente" }],
    },
  ];

  await inquirer.prompt(salida);
};
