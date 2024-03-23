import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { crearRegistro } from "../actions/nomina";

const FormAdd = () => {
  const dispatch = useDispatch();

  const [viewForm, setViewForm] = useState(false);

  // const [horas, setHoras] = useState(0)

  const [cantidadPago, setCantidadPago] = useState({
    precioHora: 0,
    horas: 0,
  });

  const { precioHora, horas } = cantidadPago;

  const handleAdd = () => {
    setViewForm(!viewForm);
    // dispatch(crearRegistro());
  };

  const handleChange = (e) => {
    // setHoras(parseFloat(e.target.value));
    // setPrecioHora(parseFloat(e.target.value));
    setCantidadPago({
      ...cantidadPago,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const cantidadFinal = horas * precioHora;

    dispatch(crearRegistro(cantidadFinal));

    setCantidadPago({
      precioHora: 0,
      horas: 0,
    });
  };

  // placeholder="ingresa cantidad  de pago por hora"
  // placeholder="ingresa cantidad de Horas"
  return (
    <div>
      <button onClick={handleAdd} className="btn green">
        {!viewForm ? "Agregar" : "Cerrar"}
      </button>
      {viewForm && (
        <div className="animate__animated animate__fadeIn">
          <div className="input-field col s12">
            <label htmlFor="icon_prefix1">Pago por hora</label>
            <input
              id="con_prefix1"
              type="text"
              value={precioHora}
              onChange={handleChange}
              name="precioHora"
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="icon_prefix2">Horas laboradas</label>
            <input
              id="con_prefix2"
              type="text"
              value={horas}
              onChange={handleChange}
              name="horas"
            />
          </div>

          <button onClick={handleSave} className="btn purple">
            Calcular y Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default FormAdd;
