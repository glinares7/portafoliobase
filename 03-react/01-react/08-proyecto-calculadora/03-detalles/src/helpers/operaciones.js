export const operaciones = (numeros, setNumeros) => {
  const { numero1, numero2 } = numeros;

  const handleChange = (e) => {
    //* CONVERSION DE NUMERO
    // setNumeros(parseInt(e.target.value));
    setNumeros({
      //* CREA COPIA DEL ONJETO INICIAL (SPREAD-OPERATOR)
      ...numeros,
      //* LO QUE RECIBA ~ ACCEDE AL JSON
      [e.target.name]: parseFloat(e.target.value),
      //* LO QUE ALMACENE
      // numero2: numero2,
    });
    //* USAR EL VALOR ACTUAL Y SUMAR
    // setSuma((actual) => numero1 + numero2);
  };

  //* CREAMOS LOS ARROW-FUNCTION PARA LAS OPERACIONES Y EL USE STATE PARA INICIALIZAR LOS DATOS
  const suma = () => numero1 + numero2;

  const resta = () => numero1 - numero2;

  const multiplicacion = () => numero1 * numero2;

  const division = () => numero1 / numero2;

  return {
    handleChange,
    suma,
    resta,
    multiplicacion,
    division,
    numero1,
    numero2,
  };
};
