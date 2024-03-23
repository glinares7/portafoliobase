import React from "react";
import { useLocation, useParams } from "react-router-dom";

const TomatoCrimson = () => {
  const IMAGES = [
    { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
    { id: 1, title: "Lime Green", color: "LimeGreen" },
    { id: 2, title: "Tomato", color: "Tomato" },
    { id: 3, title: "Seven Ate Nine", color: "#789" },
    { id: 4, title: "Crimson", color: "Crimson" },
  ];

  function Image({ color }) {
    return (
      <div
        style={{
          width: "100%",
          height: 400,
          background: color,
        }}
      />
    );
  }

  let location = useLocation();
  console.log(location);
  let { id } = useParams();
  let image = IMAGES[parseInt(id, 10)];

  if (!image) return <div>Image not found</div>;

  // const buscar = (id) => {
  //   return colorPick.find((p) => p.id === id);
  // };

  // const sabores = buscar(parseInt(id));

  // <h1> {sabores.name}</h1>
  //     <div
  //       style={{
  //         width: "100%",
  //         height: "400px",
  //         backgroundColor: `${sabores.fondo}`,
  //         margin: 0,
  //       }}
  //     ></div>
  return (
    <div style={{ padding: " 0px 20px" }}>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
};

export default TomatoCrimson;
