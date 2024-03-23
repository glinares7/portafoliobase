import { useCallback, useEffect, useState } from "react";
export const useFetchImages = () => {
  //   const [images, setImages] = useState({
  //     urls: {
  //       regular: "",
  //     },
  //   });

  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);

  const peticion = useCallback(async () => {
    const key = "client_id=7z9AGmq0APUrPC9L7-x7onnHLrYPNFO8Bhk-cQe7NZk";
    let route = `https://api.unsplash.com/photos/?${key}`;

    if (input !== "") {
      route = `https://api.unsplash.com/search/photos/?query=${encodeURI(
        input
      )}&${key}`;
    }

    setLoading(true);
    const res = await fetch(route);
    const data = await res.json();

    if (data.results) {
      setImages(data.results);
    } else {
      setImages(data);
    }
    setLoading(false);
    // console.log(data);
    // setImages(data);
  }, [input]);

  useEffect(() => {
    peticion();
  }, [peticion]);

  //*   envio de todas las imagenes usando map

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    setInput(text);
    e.target[0].value = "";
  };

  return [images, loading, handleSubmit];
};
