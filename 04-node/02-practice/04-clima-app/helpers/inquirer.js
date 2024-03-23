import inquirer from "inquirer";

export const inquirerMenu = async () => {
  const question = {
    type: "list",
    name: "menu",
    message: "Eligio el menu",
    choices: [
      { value: "1", name: "1 . Mostrar Lugar" },
      { value: "2", name: "2 . Historial de paises" },
      { value: "0", name: "3 . Salir" },
    ],
  };

  const { menu } = await inquirer.prompt(question);
  return menu;
};

export const leerInput = async (message) => {
  const salida = {
    type: "input",
    name: "ciudad",
    message,
    validate(value) {
      if (value.length === 0) {
        return "debe llenar el campo";
      } else {
        return true;
      }
    },
  };
  const { ciudad } = await inquirer.prompt(salida);
  return ciudad;
};

export const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    return {
      value: lugar.id,
      name: `${i + 1}. ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. cancelar",
  });
  const question = {
    type: "list",
    name: "ciudad",
    message: "los lugares  a visitar son",
    choices,
  };

  const { ciudad } = await inquirer.prompt(question);
  return ciudad;
};
