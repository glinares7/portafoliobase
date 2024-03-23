const numeros = [1, 2, 3, 4];

//*  posicion (for in)
// document.write("<ul>");
// for (numero in numeros) {
//   document.write("<li>");
//   document.write(numeros[numero]);
//   document.write("</li>");
// }
// document.write("</ul>");

//* map
// document.write("<ul>");
// const nuevo = numeros.map((numero) => numero + 1);
// document.write("</ul>");
// document.write(numeros);
// document.write(nuevo);

//* destructuring arrays
const [, usuario2, , usuario4] = ["Pepe", "Juan", "Lucia", "Maria"];

document.write(usuario2, usuario4);
