// import { useEffect } from "react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
const PlayList = ({ imgUrlYt }) => {
  // useEffect(() => {
  //   fetch(
  //     `https://www.googleapis.com/youtube/v3/videos?id=Ks-_Mh1QhMc&key=AIzaSyDSX0YmIw1jhZskr9j8P7D96cnBfehP3Ac&part=snippet`
  //   )
  //     .then((response) => response.json())
  //     .then((dog) => console.log(dog));
  // }, []);

  const audioUrl = imgUrlYt;
  const audioRef = useRef(null);

  //* descargar archivo desde el frontend via fetch
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:3000/uploads/temp.mp3");
      const blob = await response.blob();

      // Crear un objeto URL para el blob
      const url = URL.createObjectURL(blob);

      // Crear un enlace de descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = "archivo.mp3";

      // Simular clic en el enlace
      link.click();

      // Liberar el objeto URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  return (
    <>
      <h1>lista de reproduccion</h1>
      <div>{imgUrlYt && <video ref={audioRef} controls></video>}</div>
      <div>
        <button onClick={handleDownload}>Descargar archivo</button>
        <br />
      </div>
    </>
  );
};

PlayList.propTypes = {
  imgUrlYt: PropTypes.string,
};
export default PlayList;

//* conectamos el archivo hacia el cliente
// <audio ref={audioRef} controls></audio>

//* redirigimos hacia url de destino
// <div>
// <a href="http://localhost:3000/uploads/amp.mp4"
// rel="noreferrer"
// target="_blank"
// download="abc.mp4">
//   en el frond descarga
// </a>
// </div>
