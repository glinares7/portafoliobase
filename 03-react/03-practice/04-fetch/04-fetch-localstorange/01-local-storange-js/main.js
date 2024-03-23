const form = document.getElementById("form");
const valor = document.getElementById("valor");
const salida = document.getElementById("salida");
const caja = document.getElementById("caja");

const valor1 = document.getElementById("valor1");
const formato = document.getElementById("formato");
const removestorage = document.getElementById("removestorage");
const clearstorage = document.getElementById("clearstorage");

let contador = localStorage.length;
console.log(localStorage.length);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  contador++;

  localStorage.setItem(`valor${contador}`, valor.value);
  const list = document.createElement("P");
  list.setAttribute("id", `valor${contador}`);
  list.setAttribute("class", `valor`);
  salida.append(list);

  list.textContent = valor.value;
  valor.value = "";
});

caja.addEventListener("input", () => {
  localStorage.setItem("texto", caja.value);

  console.log(caja.value);
});

window.addEventListener("load", () => {
  caja.value = localStorage.getItem("texto");
  const arr = [];
  let initial = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);

    // console.log(clave);
    arr.push(clave);
  }

  if (arr.sort().includes("texto")) {
    console.log("existe texto");
    arr.sort().shift();
  } else {
    console.log("no existe texto");
  }

  // let ing = arr.sort().indexOf("texto");
  //     if (ing !== -1) {
  //         console.log("existe texto");
  //         arr.sort().shift();
  //   } else {
  //     console.log("no existe texto");
  //   }

  //   console.log(arr.sort());
  for (let element of arr.sort()) {
    initial++;
    const list = document.createElement("P");
    list.setAttribute("id", `valor${initial}`);
    list.setAttribute("class", `valor`);
    salida.append(list);

    list.textContent = localStorage.getItem(element);
  }
});

removestorage.addEventListener("click", () => {
  // *elimina un item del local storage

  localStorage.removeItem("valor2");
  const valor2 = document.querySelector("#valor2");
  salida.removeChild(valor2);

  //* elimina todos los registros del local storage
  //   localStorage.clear();
});
clearstorage.addEventListener("click", () => {
  let tel = document.getElementsByClassName("valor");
  localStorage.clear();
  let del = Array.prototype.slice.call(tel, 0);

  for (const ele of del) {
    console.log(ele);

    ele.remove();
  }

  contador = 0;
});
