import React, { useState, useLayoutEffect, useEffect } from "react";

const LayoutEffect = () => {
  const [data, setData] = useState([]);

  const [length, setLength] = useState(0);
  const efecto = data.length;
  const newData = [
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
    {
      name: "yrsis",
      email: "yirsis@gmail.com",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLength(newData.length);
    }, 5000);
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      setData(newData);
    }, 5000);
  }, []);

  return (
    <>
      <h1>useLayoutEffect</h1>
      <hr />
      <p>Valores: {length}</p>
    </>
  );
};

export default LayoutEffect;
