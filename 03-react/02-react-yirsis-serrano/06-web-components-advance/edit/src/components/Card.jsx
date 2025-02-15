import React from "react";

import PropTypes from "prop-types";
import "./Card.css";
const Card = ({ lang, img, fcolor, scolor }) => {
  //* DECLARANDO PROPtYPES (FILTRO DE DATOS POR TIPOS)
  // console.log(PropTypes);
  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(to left,${fcolor} , ${scolor})`,
      }}
    >
      <img src={img} alt="lang.svg" />
      <h3>{lang}</h3>
    </div>
  );
};

//* FILTRAMOS EL TIPO DE TEXTO
Card.propTypes = {
  lang: PropTypes.string,
  img: PropTypes.string,
  fcolor: PropTypes.string,
  scolor: PropTypes.string,
};
export default Card;

// import React from "react";
// import PropTypes from "prop-types";

// import "./Card.css";

// const Card = ({ lang, img, fcolor, scolor }) => {
//   return (
//     <div
//       className="card"
//       style={{
//         background: `linear-gradient(to left, ${fcolor}, ${scolor})`,
//       }}
//     >
//       <img src={img} alt="lang.svg" />
//       <h3>{lang}</h3>
//     </div>
//   );
// };

// Card.propTypes = {
//   lang: PropTypes.string,
//   img: PropTypes.string,
//   fcolor: PropTypes.string,
//   scolor: PropTypes.string,
// };

// export default Card;
