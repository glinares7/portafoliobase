//* template string
// uso de backtics  `` donde se almacenan variables dinamicas

//* Varibles
const diaSemana = "Martes";
const numero = 22;

const dias = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const nombres = [
  {
    id: 1,
    nombre: "Juan",
  },
  {
    id: 2,
    nombre: "vianca",
  },
];

console.log(`El día es ${diaSemana} ${numero}`);
console.log(`Los dias de la semana son ${dias}`);

console.log(`Mi id es ${nombres[0].id} y mi  nombre es ${nombres[0].nombre}`);
console.log(`Mi id es ${nombres[1].id} y mi  nombre es ${nombres[1].nombre}`);

//* uso delos arreglos

console.log("<!--- uso de areglos ---!>");
nombres.forEach((date) => {
  console.log(`Mi id es ${date.id} y mi nombre es ${date.nombre} `);
});

for (const datos of nombres) {
  console.log(`forof id: ${datos.id} nombre:${datos.nombre}`);
}

for (const key in nombres) {
  console.log(`forin ${nombres[key].nombre}`);
}

//*funciones
const suma = (a, b) => {
  return a + b;
};

console.log(suma(5, 2));

//* Desestructuración

const especies = [
  { raza: "pequines", nombre: "sparky" },
  { raza: "snauser", nombre: "wilor" },
];

for (const { nombre } of especies) {
  console.log(` Mi raza es ${nombre}`);
}

const numeroSemana = [
  { id: 1, dia: "lunes" },
  { id: 2, dia: "martes" },
  { id: 3, dia: "miercoles" },
];

const semana = (y) => {
  numeroSemana.find(({ id, dia }) => {
    if (id === y) {
      return console.log(dia);
    }
  });
  if (y === undefined) console.log("no existe dia ");
  if (y > numeroSemana.length) {
    return console.log(`a excedido el numero a ${y}`);
  }
};

semana(3);

// *callback

const final = (a, b, callback) => {
  callback(a, b);
  return console.log(a + b);
};

final(14, 9, (x, y) =>
  console.log(` los numeros ingresados son ${x} , ${y}  `)
);

// * callback-hell

const empleados = [
  {
    id: 1,
    nombre: "martin",
  },
  {
    id: 2,
    nombre: "edith",
  },
  {
    id: 3,
    nombre: "sandro",
  },
];

const salarios = [
  {
    id: 1,
    salario: 100,
  },
  {
    id: 2,
    salario: 150,
  },
];

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id);

  if (empleado) {
    return callback(null, empleado.nombre);
  } else {
    return callback(`El empleado con id ${id} no existe`);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((e) => e.id === id);

  if (salario) {
    return callback(null, salario.salario);
  } else {
    return console.log(`No hay salario disponible con id ${id}`);
  }
};

const id = 2;

getEmpleado(id, (error, empleado) => {
  if (error) {
    console.log(`El numero que puso a excedido  el id ${id}`);
  }

  getSalario(id, (err, salario) => {
    if (err) {
      console.log(` El salario a exedido nª id ${id}`);
    }

    console.log(`El empleado  ${empleado} tiene un salario de ${salario}`);
  });
});

//* Promise

const getEmpleadoPromise = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id);

    empleado
      ? resolve(empleado.nombre)
      : reject(`No hay empleado con el id ${id} ~ promesa`);
  });
};

const getSalarioPromise = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((e) => e.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`No hay salario con el id ${id} ~ promesa`);
  });
};

getEmpleadoPromise(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalarioPromise(id);
  })
  .then((salario) =>
    console.log(
      `El empleado ${nombre}   de la promesa tiene un salario ${salario}`
    )
  )

  .catch((err) => console.log(`Err ${err}`));

//* async -await

const resultadoAsyncAwait = async () => {
  try {
    const empleadosAA = await getEmpleadoPromise(id);
    const salarioAA = await getSalarioPromise(id);

    return `Empleados ${empleadosAA} tiene un salario  ${salarioAA}`;
  } catch (error) {
    throw error;
  }
};

resultadoAsyncAwait(id)
  .then((data) => {
    console.log(data, " ~ async-await");
  })
  .catch((err) => console.log(`Err ${err} ~ async await`));
