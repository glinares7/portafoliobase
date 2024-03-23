import React from "react";
import PropTypes from "prop-types";

const FromImg = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="w-75">
          {" "}
          Buscar :
          <input className="w-100" type="text" name="inputText" id="" />
        </label>
        <button type="submit" className="btn btn-warning m-2">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </>
  );
};

FromImg.propTypes = {
  handleSubmit: PropTypes.func,
};

export default FromImg;
