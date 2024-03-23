// rafce

import React, { useRef } from "react";

//* quiertamos el id= "area de la etiqueta textarea"
const Ref = () => {
  const ref = useRef(null);

  const handleRef = () => {
    // const ref = document.getElementById("area");

    ref.current.value = "Hola Mundo desde react";

    ref.current.select();
    // console.log(ref);
  };
  return (
    <div>
      <h1 onClick={handleRef}>useRef</h1>
      <hr />
      <textarea ref={ref} placeholder="Escribe un mensaje ..."></textarea>
    </div>
  );
};

export default Ref;
