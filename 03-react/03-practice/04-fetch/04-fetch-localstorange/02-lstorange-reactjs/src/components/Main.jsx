// import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Main = () => {
  //   const [text, setText] = useState(localStorage.getItem("texto"));

  const [storeValue, setValue] = useLocalStorage("texto", "");

  //   const handleCambios = (value) => {
  //     try {
  //       localStorage.setItem("texto", value);
  //       setText(value);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <div>
      <h1 style={{ paddingLeft: "20px" }}>local storange desde react</h1>
      <textarea
        placeholder="¿que hacer?"
        cols="30"
        rows="5"
        onChange={(e) => setValue(e.target.value)}
        value={storeValue}
      />
    </div>
  );
};

export default Main;
