import React, { useContext, useMemo, useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { UseContext } from "../contexts/AuthContext";
import { themes } from "../helpers/Pictures";
import MemoComponent from "../memo/MemoComponent";
import MemoContent from "../memo/MemoContent";

const Content = () => {
  const [value, setValue] = useState("");
  const [been, setBeen] = useState("iguales");

  const { appcontext, setAppcontext } = useContext(UseContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //* PARA QUE S EUSE COMO USECALLBACK SE DEBE PASAR POR UN COMPONENTE MEMO
  const handleCalculation = (e) => {
    //* valor infinito para renderizar el useMemo
    // setBeen(e.target.value);

    //* valores diferentes para el useMemo (se renderiza constantemente)
    // if (been === "igulales") {
    //   setBeen("iguales2");
    // } else {
    //   setBeen("igulales");
    // }
    //* valor unico pero diferente para useMemo (se renderiza una vez)
    setBeen("iguales2");
  };

  //* AL NO HABER CAMBIO EN EL STATE(VALOR) NO EJECUTA LA FUNCION
  const calc = (been) => {
    console.log("usando useMemo .son diferentes");
    return been;
  };

  const calculation = useMemo(() => calc(been), [been]);

  //* La funcion enviada como useCallback
  const useMemoString = useCallback(() => {
    console.log("sin useCallback");
    return "primero";
  }, []);
  const callback = useCallback(() => {
    console.log("te dije");
    return "texto de componente hijo";
  }, []);

  const handleAppContext = () => {
    if (appcontext === "") {
      setAppcontext(themes);
    } else {
      setAppcontext("");
    }
  };

  return (
    <div className="content__main">
      <h1>Galeria</h1>
      <div className="galery__content">
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
        <img
          src="https://th.bing.com/th/id/R.cf82fda41cf7bd596ec49fc27c9424b0?rik=yLH2mCziFTvSDA&pid=ImgRaw&r=0"
          alt=""
          className="item__galery"
        />
      </div>
      <h1>Componente principal</h1>
      <h2>imput del componente principal</h2>

      <input type="text" value={been} onChange={handleCalculation} />

      <MemoContent useMemoString={useMemoString} />
      <h1>usando use memo para valor estatico {calculation}</h1>
      <hr />
      <h1>{value}</h1>
      <input type="text" value={value} onChange={handleChange} />
      <MemoComponent callback={callback} />

      <hr />
      <h1>use context</h1>
      <button onClick={handleAppContext}>USE CONTEXT</button>
      {!appcontext ? (
        <div>I am styled by theme context!</div>
      ) : (
        <div
          style={{
            background: appcontext.dark.background,
            color: appcontext.dark.foreground,
          }}
        >
          En simultaneo 1
        </div>
      )}
      <hr />
      <h1>Routes</h1>
      <Link
        to="/info/todo-lo-que-necesitas"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 25px",
          borderRadius: "15px",
        }}
      >
        Más información
      </Link>
    </div>
  );
};

export default Content;
