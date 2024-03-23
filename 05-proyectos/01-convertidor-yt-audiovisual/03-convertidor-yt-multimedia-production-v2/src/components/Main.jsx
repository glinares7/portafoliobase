import { useContext, useState } from "react";
import { UseContext } from "../contexts/AuthContext";

// import PlayList from "./Playlist";

// import parse from "html-react-parser";

const Main = () => {
  const { urlFinal } = useContext(UseContext);

  const [toggle, setToggle] = useState(false);

  const [input, setInput] = useState("");
  const [linkPh, setLinkPh] = useState("");

  const [formato, setFormato] = useState("mp3");

  const [tituloYt, setTituloYt] = useState("");
  const [descripcionYt, setDescripcionYt] = useState("");
  const [imageYt, setImageYt] = useState("");

  const [uriLinkYt, seturiLinkYt] = useState("");

  // const [count, setCount] = useState(0);

  // const changeContador = () => {
  //   setCount((contador) => contador + 1);
  // };

  const urlServidor = urlFinal;
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //* const abc = self.abc;
  // if (abc) {
  //   console.log("externo", abc.value);
  // }

  const clickFormat1 = (e) => {
    const dropdown = self.dropdown;

    const tmp3 = self.formatmp3;
    const tmp4 = self.formatmp4;
    const tm4a = self.formatm4a;

    const c1 = self.chk1;
    const c2 = self.chk2;
    const c3 = self.chk3;

    const selVal = self.selectboxValue;

    if (toggle) {
      dropdown.style.display = "none";
      setToggle(false);
    } else {
      dropdown.style.display = "flex";
      setToggle(true);
    }

    let activo = e.target.parentElement.className.split(" ")[0];

    console.log(activo);
    switch (activo) {
      case "audio-format":
        // console.log("es el primero");
        tmp3.classList.remove("active");
        tmp4.classList.add("active");
        tm4a.classList.add("active");

        c1.classList.add("check");
        c2.classList.remove("check");
        c3.classList.remove("check");

        selVal.textContent = tmp3.dataset.value;

        setFormato(tmp3.dataset.value);

        break;
      case "video-format":
        // console.log("es el segundo");
        tmp3.classList.add("active");
        tmp4.classList.remove("active");
        tm4a.classList.add("active");

        c1.classList.remove("check");
        c2.classList.add("check");
        c3.classList.remove("check");

        selVal.textContent = tmp4.dataset.value;

        setFormato(tmp4.dataset.value);

        break;
      case "sonido-format":
        // console.log("es el tercero");
        tmp3.classList.add("active");
        tmp4.classList.add("active");
        tm4a.classList.remove("active");

        c1.classList.remove("check");
        c2.classList.remove("check");
        c3.classList.add("check");
        selVal.textContent = tm4a.dataset.value;

        setFormato(tm4a.dataset.value);

        break;

      default:
        break;
    }
  };

  const handleEnlace = async (e) => {
    const abc = self.abc;

    const divConvert = self.divConvert;
    const btnConvert1 = self.btnConvert1;

    if (!abc.value) {
      console.log("esta en blanco descargar");
    } else {
      // setInput(abc.value);

      console.log(e.target.className);
      if (e.target.className.split(" ")[1] === "rosa") {
        btnConvert1.classList.remove("rosa");
      } else {
        btnConvert1.classList.add("rosa");
      }

      setLinkPh(input);

      abc.value = "";

      try {
        console.log("input de la descarga:", input);
        console.log("formato de la descarga :", formato);
        //todo lectura de datos de la API

        //*Solicitud al Api de youtube para obtener el titulo,etc

        let uriTitulo;

        let lpInput = input.trim();

        const payload = {
          urlEx: lpInput,
          format: formato,
        };

        await fetch(`${urlServidor}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            uriTitulo = data.titulo;
          });

        //* solicitud al servidor para tener el archivo de descarga (Api de terceros)

        const startTime = performance.now();

        await fetch(`${urlServidor}/${formato}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Calcular la duración
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // Duración en segundos
            console.log(`Duración de la descarga: ${duration} segundos`);

            // Crear una URL del objeto Blob
            const url = URL.createObjectURL(blob);

            // Crear un enlace de descarga
            const link = document.createElement("a");
            link.href = url;
            link.download = `${uriTitulo}.${formato}`;

            // Simular un clic en el enlace para iniciar la descarga
            link.click();

            // Liberar la URL del objeto Blob
            URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error("Error al descargar el archivo:", error);
          });

        console.log("reseteo al boton convertir");
        divConvert.style.display = "none";
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleConvert = async (e) => {
    let dataError;
    const abc = self.abc;
    const divConvert = self.divConvert;

    const btnConvert2 = self.btnConvert2;
    const btnDanger = self.btnDanger;

    if (!abc.value) {
      return console.log("esta en blanco convert");
    } else {
      setLinkPh(input);

      console.log(e.target.className);
      if (e.target.className.split(" ")[1] === "rosa") {
        btnConvert2.classList.remove("rosa");
      } else {
        btnConvert2.classList.add("rosa");
      }

      //* peticion al servidor para extraer el titulo,  img, descripción,etc

      console.log("input de la conversion:", input);
      console.log("formato de la conversion:", formato);

      let lpInput = input.trim();

      const idUrl = lpInput.split("=")[1];

      const payload = {
        urlEx: lpInput,
        format: formato,
      };

      if (idUrl) {
        console.log(idUrl);
      }
      let uriTitulo;
      let uriDescripcion;
      let uriImg;
      let uriPkYt;

      await fetch(`${urlServidor}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (data.uri == "ERROR") {
            dataError = data.uri;
          }
          uriTitulo = data.titulo;
          uriDescripcion = data.descripcion;
          uriImg = data.img;
          uriPkYt = data.uri;

          // high 360 * 480
        });

      if (dataError) {
        btnDanger.style.display = "flex";
        setTimeout(() => {
          if (e.target.className.split(" ")[0] === "button-item") {
            divConvert.style.display = "none";
          }
        }, 600);
      } else {
        btnDanger.style.display = "none";
        setTituloYt(uriTitulo);
        setDescripcionYt(uriDescripcion);
        setImageYt(uriImg);
        seturiLinkYt(uriPkYt);
        // seturiLinkYt(
        //   "https://rr5---sn-nx57ynss.googlevideo.com/videoplayback?expire=1686951544&ei=GIKMZK6HDPLLkwbGnZBg&ip=35.160.120.126&id=o-AN8Utm6p2ZVQwDFCBohOkj_Yzw8noQNFhkSqVj3dbMSZ&itag=22&source=youtube&requiressl=yes&mh=jj&mm=31%2C29&mn=sn-nx57ynss%2Csn-nx5s7nel&ms=au%2Crdu&mv=m&mvi=5&pl=21&gcr=us&initcwndbps=1206250&spc=qEK7B5u3kYJuSUBKRA3heqtQ3k8PgMU&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=293.802&lmt=1670075666171751&mt=1686929609&fvip=5&fexp=24007246&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgPcRAwCeiokAIshErVxKUUYSXb4pMcx48H3v-H0U19zICIHDJD9PQBt0lC8F9s2V5bROKbg1owkT6GZ0dJTuPaJPi&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAMwL1SFq0382pVU52H3OQJ6QU2pEt_Q3-eaIqwJaKveOAiEAgm1q8UKr6AE8eDQ3HKK2H-aS7k01ruWlRuLGfTs2xM0%3D"
        // );

        fetch(uriPkYt)
          .then((response) => {
            if (response.ok) {
              console.log("La URL tiene acceso válido");
              // Realizar acciones adicionales si la URL es válida
            } else {
              console.log("La URL tiene acceso denegado");
              // Mostrar un mensaje o realizar acciones adicionales si la URL tiene acceso denegado
            }
          })
          .catch((error) => {
            console.log("Ocurrió un error al acceder a la URL", error);
            // Mostrar un mensaje o realizar acciones adicionales en caso de error
          });

        // console.log("este es el link", uriPkYt);

        //*mostrar el pantalla los datos
        // btnDanger.style.display = "none";
        setTimeout(() => {
          if (e.target.className.split(" ")[0] === "button-item") {
            divConvert.style.display = "flex";
          }
        }, 600);
      }
    }
  };

  //* Fetch api youtube - terceros

  const handleContextMenu = (e) => {
    e.preventDefault(); // Evita que aparezca el menú contextual
  };

  // console.log(descripcionYt);
  console.log("input change - formato", ` ${linkPh} : ${formato}`);
  return (
    <>
      <div className="main__home">
        <div className="convertidor">
          <p className="tipico">
            --------------------- CONVERTIDOR MP4 ------------------------
          </p>
        </div>
        <div className="input__div">
          <input
            onChange={handleChange}
            id="abc"
            className="input__link"
            type="text"
            placeholder="Paste link by https//:youtube.com"
            name="link"
            autoComplete="off"
          />
        </div>
        <div id="btnDanger" className="input__div">
          <div className="danger">
            <p className="txt__danger">El video no esta disponible</p>
          </div>
        </div>
        <span className="select__wraper">
          <div
            onClick={clickFormat1}
            id="select__main"
            className="select__main"
          >
            <div>
              <b>Format </b>
              <span id="selectboxValue">.mp3</span>
            </div>
            <div className="angle-down">
              <span>&#8964;</span>
            </div>
          </div>
          <div
            onClick={clickFormat1}
            id="dropdown"
            className="dropdown radiovideo1"
            tabIndex={1}
          >
            <ul className="dropdown2column">
              <li className="dropdown-header">Audio Formats</li>
              <li>
                <a
                  id="formatmp3"
                  className="audio-format"
                  name="ho"
                  data-value="mp3"
                >
                  <span id="chk1" className="check">
                    .mp3
                  </span>
                </a>
              </li>
            </ul>
            <ul className="dropdown2column">
              <li className="dropdown-header">Video Formats</li>
              <li>
                <a
                  id="formatmp4"
                  className="video-format active"
                  data-value="mp4"
                >
                  <span id="chk2">.mp4</span>
                </a>
              </li>
            </ul>
            <ul className="dropdown2column">
              <li className="dropdown-header">Sonido Formats</li>
              <li>
                <a
                  id="formatm4a"
                  className="sonido-format active"
                  data-value="m4a"
                >
                  <span id="chk3">.m4a</span>
                </a>
              </li>
            </ul>
          </div>
        </span>
        <div className="botones">
          <div onClick={handleConvert} className="enlace ">
            <button id="btnConvert2" className="button-item  ">
              CONVERT
            </button>
          </div>

          <div id="divConvert" className="lista__main">
            <div className="informacion__main">
              <div className="titulo__yt">
                <div className="txt__formato">
                  <p>{tituloYt}</p>
                </div>
              </div>
              <div className="info__img">
                <div className="img__head">
                  <div>
                    <img className="img__size" src={imageYt} alt="img__yt" />
                  </div>
                  <div onContextMenu={handleContextMenu}>
                    <video
                      className="img__size tmsize"
                      controls
                      src={uriLinkYt}
                      controlsList="nodownload"
                    >
                      <source type="video/mp4"></source>
                    </video>
                  </div>
                </div>

                <div className="descripcion__yt">
                  <div className="txtDescripcion__yt">
                    <div>
                      <pre>{descripcionYt}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="enlace2">
              <button
                id="btnConvert1"
                onClick={handleEnlace}
                className="button-item"
              >
                DESCARGAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
// <div>{uriLinkYt && <h1>{uriLinkYt}</h1>}</div>

//* https://developers.google.com/youtube/v3/getting-started?hl=es-419
//*https://developers.google.com/youtube/v3/getting-started?hl=es

//*https://github.com/topics/youtube-to-mp3-api

//* testing de datos para verificar si se estan enviando al servidor
// import PlayList from "./Playlist";

// <div>
// {linkPh && (
//   <h1>
//     {linkPh} : {formato}
//   </h1>
// )}
// </div>

// <PlayList imgUrlYt={uriLinkYt} />
