const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneración",
  getNombre() {
    return `${this.nombre} ${this.apellido}  ${this.poder}`;
  },
};

// console.log(deadpool.getNombre());

// const nombre =deadpool.nombre
// const apellido =deadpool.apellido
// const poder =deadpool.poder

// const { poder } = deadpool;

// console.log(poder);
function inprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
  console.log(nombre, apellido, poder, edad);
}

inprimeHeroe(deadpool);

const heroes = ["Deadpool", "Superman", "Batman"];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];

const [, , h3] = heroes;
console.log(h3);
