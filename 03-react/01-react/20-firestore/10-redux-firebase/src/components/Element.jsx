import React from "react";
import { useDispatch } from "react-redux";
import { borrarRegistro } from "../actions/nomina";

const Element = ({ data }) => {
  const { fecha, pago, id } = data;

  // console.log(fecha);

  const dispatch = useDispatch();
  let fechaFormato;

  if (fecha.seconds) {
    const date = fecha.toDate();
    fechaFormato = date.toLocaleDateString();
    // console.log(fechaFormato);
  } else {
    fechaFormato = fecha;
    // console.log(fechaFormato);
  }
  const handleDelete = () => {
    //* eliminar en el firestore también

    dispatch(borrarRegistro(id));
  };
  //* descomentar 2 lineas

  // const fechaFormato = `${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`;
  return (
    <>
      <td>{fechaFormato}</td>
      <td>${pago}</td>
      <td>
        <button onClick={handleDelete} className="btn red">
          <i className="material-icons"> delete_forever</i>
        </button>
      </td>
    </>
  );
};

export default Element;
