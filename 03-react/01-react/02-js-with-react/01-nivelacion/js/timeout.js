const evaluar = () => {
  const edad = prompt("Cual es tu edad?");

  if (edad < 18) {
    alert("menor de edad");
    return;
  }

  alert("mayor de edad");
};

//* lanzar la funcion (inicializar - invocar)

// evaluar();

setTimeout(evaluar, 2000);
