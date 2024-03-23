import React, { useState } from "react";
import PropTypes from "prop-types";

import Resultado from "./Resultado";
import { operaciones } from "../helpers/operaciones";

const NumberInput = () => {
  const [numeros, setNumeros] = useState({
    numero1: 10,
    numero2: 5,
  });

  const {
    handleChange,
    suma,
    resta,
    multiplicacion,
    division,
    numero1,
    numero2,
  } = operaciones(numeros, setNumeros);
  //* DESESTRUCTURA EL ESTADO
  // const [suma, setSuma] = useState(numero1 + numero2);

  //! export helpers/operaciones.js handlerChange()
  // const handleChange2 = (e) => {
  //   //* CONVERSION DE NUMERO
  //   // setNumeros(parseInt(e.target.value));
  //   setNumeros({
  //     //* LO QUE RECIBA
  //     numero2: parseFloat(e.target.value),
  //     //* LO QUE ALMACENE
  //     numero1: numero1,
  //   });
  // };

  // console.log(data);
  //! export helpers/operaciones.js -> funciones + - * /
  return (
    <>
      <label className="mx-2">
        Numero 1 :{" "}
        <input
          name="numero1"
          value={numero1}
          onChange={handleChange}
          type="number"
        />
      </label>
      <label className="mx-2">
        Numero 2 :{" "}
        <input
          name="numero2"
          value={numero2}
          onChange={handleChange}
          type="number"
        />
      </label>

      <Resultado operacion="Suma" calculo={suma()} />
      <Resultado operacion="Resta" calculo={resta()} />
      <Resultado operacion="Multiplicacion" calculo={multiplicacion()} />
      <Resultado operacion="Division" calculo={division()} />
    </>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string,
};

export default NumberInput;
