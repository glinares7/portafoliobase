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
  const empleado = empleados.find((e) => e.id === id);

  if (empleado) {
    return callback(null, empleado.nombre);
  } else {
    return callback(`Empleado con id ${id} no existe`);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((e) => e.id === id)?.salario;

  if (salario) {
    return callback(null, salario);
  } else {
    return callback(`El salario con id ${id} no existe`);
  }
};

const id = 10;
getEmpleado(id, (err, empleado) => {
  if (err) {
    console.log("ERROR");
    return console.log(err);
  }

  // console.log("Empleado existe");
  // console.log(empleado.nombre);

  getSalario(id, (err, salario) => {
    if (err) {
      console.log("ERROR");
      return console.log(err);
    }

    // console.log("salario existe");
    // console.log(salario);
    console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
  });
});
