import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import queryString from "query-string";
import { Characters } from "../models/Characters";
import Card from "../components/Card";

const SearchScreen = ({ history }) => {
  const location = useLocation();

  // console.log(location.search);

  //* pinta el query en la ruta*
  const { q = "" } = queryString.parse(location.search);
  // console.log(q);

  const [inputValue, setInputValue] = useState(q);
  const [characters, setCharacters] = useState([]);

  //* Detecta cambios en el input
  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  //* busqueda por input en la ruta
  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`?q=${inputValue}`);
    // console.log(inputValue);
  };

  //* conecta al modelo de los datos y los filtra
  const getCharacters = () => {
    if (inputValue.trim() !== "") {
      const value = inputValue.toLocaleLowerCase();
      const newValue = Characters.filter((character) =>
        character.name.toLocaleLowerCase().includes(value)
      );

      setCharacters(newValue);
      // console.log(characters);
    } else {
      setCharacters([]);
    }
  };

  //* se ejecuta los registros  una sola vez al inicio
  useEffect(() => {
    getCharacters();
  }, [q]);

  //* pinta los caracteres
  return (
    <div className="container">
      <h1>Search Screen </h1>
      <hr />

      <div className="row">
        <div className="col-6">
          <h2>Search</h2>
          <form onSubmit={handleSubmit}>
            <label className="form-label w-100">
              Character :{" "}
              <input
                placeholder="Name Character"
                type="text"
                className="form-control"
                autoComplete="off"
                value={inputValue}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-info w-100">
              Search
            </button>
          </form>
        </div>
        <div className="col-6">
          <h2>Results :{characters.length}</h2>
          {characters.length === 0 && (
            <div className="alert alert-warning text-center">
              Please Search a Character
            </div>
          )}

          {characters.map((character) => (
            <Card key={character.id} {...character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
