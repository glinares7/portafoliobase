import React from "react";
import { Link, useLocation } from "react-router-dom";

const VisitGallery = () => {
  const IMAGES = [
    { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
    { id: 1, title: "Lime Green", color: "LimeGreen" },
    { id: 2, title: "Tomato", color: "Tomato" },
    { id: 3, title: "Seven Ate Nine", color: "#789" },
    { id: 4, title: "Crimson", color: "Crimson" },
  ];

  function Thumbnail({ color }) {
    return (
      <div
        style={{
          width: 50,
          height: 50,
          background: color,
        }}
      />
    );
  }

  let location = useLocation();
  console.log(location);

  return (
    <div style={{ padding: " 15px 20px" }}>
      {IMAGES.map((i, background) => (
        <Link
          key={i.id}
          to={`/img/${i.id}`}
          state={{ background: location }}
          replace
        >
          <Thumbnail color={i.color} />
          <p>{i.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default VisitGallery;
