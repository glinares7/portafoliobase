import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseContext } from "../contexts/AuthContext";

const Sidebarc5 = () => {
  let { typeStr } = useParams();
  const { setSliderc } = useContext(UseContext);

  useEffect(() => {
    setSliderc(typeStr);
  });

  return (
    <div>
      <h2>effect & context</h2>
      <h2>{typeStr}</h2>
    </div>
  );
};

export default Sidebarc5;
