import React, { useEffect, useReducer, useState } from "react";
import { ContactosReducer } from "../reducers/ContactosReducer";
import FormularioAdd from "./FormularioAdd";
import TablaContactos from "./TablaContactos";

//* Se va reemplazar por el local storange
// const contactos = [
//   {
//     id: "hbbs",
//     nombre: "Raul",
//     numero: "66089172",
//   },
//   {
//     id: "hbbadasbs",
//     nombre: "Gerardo",
//     numero: "66089172",
//   },
//   {
//     id: "hbdadasbsdasd",
//     nombre: "Sandra",
//     numero: "66089172",
//   },
// ];
const Contactos = () => {
  const init = () => {
    const contactos = localStorage.getItem("contactos");
    // console.log(contactos);
    return contactos ? JSON.parse(contactos) : [];
  };
  // const [state, dispatch] = useReducer(ContactosReducer, []);

  const [state, dispatch] = useReducer(ContactosReducer, [], init);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  const [formView, setFormView] = useState(false);
  return (
    <div className="container mt-3">
      <button
        onClick={() => setFormView(!formView)}
        className="btn btn-success"
      >
        {!formView ? "+ Agregar Contacto" : " Cerrar Formulario"}
      </button>
      {formView && <FormularioAdd dispatch={dispatch} />}

      <TablaContactos contactos={state} dispatch={dispatch} />
    </div>
  );
};

export default Contactos;
