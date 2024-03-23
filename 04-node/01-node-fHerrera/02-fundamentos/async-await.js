const empleados = [
  {
    id: 1,
    nombre: "Fernando",
  },
  {
    id: 2,
    nombre: "Linda",
  },
  {
    id: 3,
    nombre: "Karen",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id, callback) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario ? resolve(salario) : reject(`no hay salario con el id ${id}`);
  });
};

const getInfoUsuario = async () => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El salario del empleado ${empleado} es de ${salario}`;
  } catch (error) {
    throw error;
  }
};

const id = 10;
getInfoUsuario(id)
  .then((msg) => {
    console.log("TODO BIEN");
    console.log(msg);
  })
  .catch((err) => {
    console.log("TODO MAL");
    console.log(err);
  });
