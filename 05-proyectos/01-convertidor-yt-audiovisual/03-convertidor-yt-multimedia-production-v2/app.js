/* eslint-disable no-undef */
import express from "express";
import request from "request";

import cors from "cors";
// import path from "path";
import youtubedl from "youtube-dl-exec";

import fs from "fs";
import axios from "axios";
import "dotenv/config";

import ffmpeg from "ffmpeg-static";
import childProcess from "child_process";

import contDis from "content-disposition";

//* soporta video -> 720p ,360
//* soporta audio -> mp3 ,m4a
//* las url y los accesos estan en el archivo  .env (.example.env)
//* la api key yt -> la deben descargar desde el mismo  https://developers.google.com/youtube/v3/docs/videos/list?hl=es-419

const port = process.env.PORT || 3000;
const servidor = process.env.SERVIDOR || "http://localhost:3000";
const urlTesting =
  process.env.YOUTUBE || "https://www.youtube.com/watch?v=Kq2EaBJOsQ8";

const apiKeyYt = process.env.API_KEY_YT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.post("/mp4", (req, res) => {
  const body = req.body;
  let lpInput;

  lpInput = body.urlEx.trim();
  let v3 = lpInput.includes("list=");
  if (v3) {
    let dat1 = lpInput.split("=")[0];
    let dat2 = lpInput.split("=")[1].slice(0, 11);

    lpInput = dat1.concat("=", dat2).trim();
  }
  console.log("enviado del cliente -  mp4", body.urlEx, body.format);

  youtubedl(lpInput, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      // const mp4Url = output.formats.find(
      //   (format) =>
      //     format.vcodec === "avc1.64001F" || format.vcodec === "avc1.42001E"
      // ).url;

      let mp4Url;

      output.formats.some((format) => {
        if (format.vcodec === "avc1.64001F") {
          mp4Url = format.url;
          return true; // Detener la iteración
        }
      });

      if (!mp4Url) {
        output.formats.some((format) => {
          if (format.vcodec === "avc1.42001E") {
            mp4Url = format.url;
            return true; // Detener la iteración
          }
        });
      }

      //* console.log("Ruta del archivo MP4:", mp4Url);

      console.log("titulo", output.title);

      const url = mp4Url;

      //* Establecer las cabeceras para la descarga automática

      res.setHeader(
        "Content-Disposition",
        //* conDis(libreria content-disposition) => permite los caracteres especiales en el llamado al archivo
        contDis(`${output.title}.mp4`)
        // `attachment; filename="${output.title}".mp4`
      );
      res.setHeader("Content-Type", "video/mp4");

      // Realizar la solicitud GET al archivo de audio
      request
        .get(url)
        .on("error", (err) => {
          console.error(err);
          res.status(500).send("Error al descargar el archivo");
        })
        .pipe(res); // Piping la respuesta al cliente

      console.log("descarga da video exitoso - mp4");
    })
    .catch((error) => {
      console.error("Ocurrió un error:", error);
    });
});

app.post("/mp3", (req, res) => {
  // const videoId = req.query.id;

  const body = req.body;

  let lpInput;
  lpInput = body.urlEx.trim();

  let v3 = lpInput.includes("list=");
  if (v3) {
    let dat1 = lpInput.split("=")[0];
    let dat2 = lpInput.split("=")[1].slice(0, 11);

    lpInput = dat1.concat("=", dat2).trim();
  }

  //* body.urlEx y body.format se extraen del cliente por el metodo fetch
  console.log("enviado del cliente -  mp3", body.urlEx, body.format);

  if (fs.existsSync(`./public/uploads/temp.mp3`)) {
    fs.unlinkSync(`./public/uploads/temp.mp3`);
  } else {
    console.log("El archivo NO EXISTE!");
  }

  console.log("limpiar temporales");

  youtubedl(lpInput, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      // const mp3Url = output.formats.find(
      //   (format) => format.audio_ext === "webm"
      // ).url;
      // const mp4Url = output.formats.find(
      //   (format) =>
      //     format.vcodec === "avc1.64001F" || format.vcodec === "avc1.42001E"
      // ).url;

      //* valida si exite uno de los codec y retorna su valor
      let mp4Url;

      output.formats.some((format) => {
        if (format.vcodec === "avc1.64001F") {
          mp4Url = format.url;
          return true; // Detener la iteración
        }
      });

      if (!mp4Url) {
        output.formats.some((format) => {
          if (format.vcodec === "avc1.42001E") {
            mp4Url = format.url;
            return true; // Detener la iteración
          }
        });
      }

      //console.log("Ruta del archivo MP3:", mp3Url);
      // console.log("Ruta del archivo MP4:", mp4Url);

      console.log("titulo", output.title);

      //*archivo guardado en nuestro servidor

      const urlPath = mp4Url;

      const outputFilePath = `./public/uploads/temp.mp4`;
      axios({
        method: "get",
        url: urlPath,
        responseType: "stream",
      })
        .then((response) => {
          response.data
            .pipe(fs.createWriteStream(outputFilePath))
            .on("finish", () => {
              console.log("Archivo descargado con éxito");

              //*convertimos el archivo a mp3 de forma local

              const inputFilePath = `./public/uploads/temp.mp4`;
              const outputFilePath = `./public/uploads/temp.mp3`;

              const command = `${ffmpeg} -i "${inputFilePath}" -vn -b:a 512k -acodec libmp3lame "${outputFilePath}"`;

              const { exec } = childProcess;

              exec(command, (error) => {
                if (error) {
                  console.error(
                    `Error al convertir el archivo: ${error.message}`
                  );
                  return;
                }
                console.log("Archivo convertido con éxito - mp3 ");

                //*envio del archivo al cliente

                const url = `${servidor}/uploads/temp.mp3`;

                // Establecer las cabeceras para la descarga automática

                res.setHeader(
                  "Content-Disposition",
                  contDis(`${output.title}.mp3`)
                  // `attachment; filename="${output.title}".mp3`
                );
                res.setHeader("Content-Type", "audio/mp3");

                // Realizar la solicitud GET al archivo de audio

                request
                  .get(url)
                  .on("error", (err) => {
                    console.error(err);
                    res.status(500).send("Error al descargar el archivo");
                  })
                  .pipe(res); // Piping la respuesta al cliente

                //*eliminar archivo mp4
                fs.unlinkSync(`./public/uploads/temp.mp4`);
                console.log("Archivo eliminado con éxito - mp4 ");
              });
            });
        })
        .catch((error) => {
          console.error(`Error al descargar el archivo: ${error.message}`);
        });
    })
    .catch((error) => {
      console.error("Ocurrió un error:", error);
    });
});

app.post("/m4a", (req, res) => {
  const body = req.body;

  let lpInput;
  lpInput = body.urlEx.trim();
  let v3 = lpInput.includes("list=");
  if (v3) {
    let dat1 = lpInput.split("=")[0];
    let dat2 = lpInput.split("=")[1].slice(0, 11);

    lpInput = dat1.concat("=", dat2).trim();
  }

  console.log("enviado del cliente -  m4a", body.urlEx, body.format);
  youtubedl(lpInput, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      // const mp3Url = output.formats.find(
      //   (format) => format.acodec === "mp4a.40.2"
      // ).url;

      //* valida si existe uno de los  codec y retorna su valor
      let mp3Url;
      let ext;

      output.formats.some((format) => {
        if (format.acodec === "mp4a.40.2" && format.format_note === "medium") {
          mp3Url = format.url;
          ext = "m4a";
          return true; // Detener la iteración
        }
      });

      if (!mp3Url) {
        output.formats.some((format) => {
          if (format.acodec === "opus" && format.format_note === "medium") {
            mp3Url = format.url;
            ext = "mp3";
            return true; // Detener la iteración
          }
        });
      }

      if (!mp3Url) {
        output.formats.some((format) => {
          if (
            format.acodec === "mp4a.40.2" &&
            format.format_note === "English original (default), medium"
          ) {
            mp3Url = format.url;
            ext = "m4a";
            return true; // Detener la iteración
          }
        });
      }

      console.log("salida de la extension", ext);
      // const mp4Url = output.formats.find(
      //   (format) => format.vcodec === "avc1.64001F"
      // ).url;

      // *console.log("Ruta del archivo MP3:", mp3Url);
      // console.log("Ruta del archivo MP4:", mp4Url);

      console.log("titulo", output.title);
      // const mp3Url = info.formats.find((format) => format.ext === "mp3").url;
      // const mp4Url = info.formats.find((format) => format.ext === "mp4").url;

      //*prepara la descarga desde el  servidor

      const urlPk = mp3Url;

      // Establecer las cabeceras para la descarga automática

      res.setHeader(
        "Content-Disposition",
        contDis(`${output.title}.${ext}`)
        // `attachment; filename="${output.title}".mp4`
      );
      res.setHeader("Content-Type", `audio/${ext}`);

      // Realizar la solicitud GET al archivo de audio
      request
        .get(urlPk)
        .on("error", (err) => {
          console.error(err);
          res.status(500).send("Error al descargar el archivo");
        })
        .pipe(res); // Piping la respuesta al cliente

      console.log(`descarga de audio ${ext} exitoso`);
    })
    .catch((error) => {
      console.error("Ocurrió un error:", error);
    });
});

app.post("/data", async (req, res) => {
  const body = req.body;

  console.log("enviado del cliente -  data", body.urlEx, body.format);

  //todo usando la api publica de youtube

  let idUrl;
  let lpInput;

  let errorCliente;
  let errApiYt;
  let errTercero;

  lpInput = body.urlEx.trim();

  let v1 = lpInput.includes("v=");
  let v2 = lpInput.includes("shorts/");
  let v3 = lpInput.includes("live/");

  let v4 = lpInput.includes("list=");

  try {
    if (v1) {
      idUrl = lpInput.split("=")[1].slice(0, 11);
    } else if (v2) {
      // idUrl = lpInput.split("/")[4].slice(0, 11);
      idUrl = lpInput.split("shorts/")[1].slice(0, 11);
    } else if (v3) {
      idUrl = lpInput.split("live/")[1].slice(0, 11);
    } else {
      idUrl = lpInput.split("/")[3].slice(0, 11);
      // idUrl = lpInput.substr(-11);
    }

    if (v4) {
      let dat1 = lpInput.split("=")[0];
      let dat2 = lpInput.split("=")[1].slice(0, 11);

      lpInput = dat1.concat("=", dat2).trim();
    } else {
      if (v2) {
        let dat3 = lpInput.split("shorts/")[0];
        let dat4 = lpInput.split("shorts/")[1].slice(0, 11);
        lpInput = dat3.concat("shorts/", dat4).trim();
      }
    }
  } catch (error) {
    console.log("error en la busqueda - res cliente", error);
    errorCliente = "ERRCLIENT";
  }

  console.log("link ya formateado", idUrl);
  console.log("link concatenado", lpInput);

  let uriTitulo;
  let uriDescripcion;
  let uriImg;

  let infoLink;
  let data;

  //*envio de el titulo ,descripcion,img de la api de youtube
  await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${idUrl}&key=${apiKeyYt}&part=snippet`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      //*En caso no se visualize los objetos probar desde  el navegador la url
      uriTitulo = data.items[0].snippet.title;
      uriDescripcion = data.items[0].snippet.description;
      uriImg = data.items[0].snippet.thumbnails.high.url;
    })
    .catch((error) => {
      console.error("Ocurrió un error - api youtube :", error);
      errApiYt = "APIYT";
    });

  switch (body.format) {
    case "mp3":
      // infoLink = "mp3 -switch";

      //todo usando la api de youtube-dl-exec
      await youtubedl(lpInput, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      })
        .then((output) => {
          data = output;
          output.formats.some((format) => {
            if (
              format.acodec === "mp4a.40.2" &&
              format.format_note === "medium"
            ) {
              infoLink = format.url;
              return true; // Detener la iteración
            }
          });

          if (!infoLink) {
            output.formats.some((format) => {
              if (format.acodec === "opus" && format.format_note === "medium") {
                infoLink = format.url;
                return true; // Detener la iteración
              }
            });
          }

          if (!infoLink) {
            output.formats.some((format) => {
              if (
                format.acodec === "mp4a.40.2" &&
                format.format_note === "English original (default), medium"
              ) {
                infoLink = format.url;
                return true; // Detener la iteración
              }
            });
          }
          console.log("Ruta del archivo mp3 enviado -switch");
        })
        .catch((error) => {
          console.error("Ocurrió un error: -fetch api terceros", error);
          errTercero = "ERRAPITERCEROS-MP3";
        });

      //todo archivo guardado en nuestro servidor

      break;
    case "mp4":
      // infoLink = "mp4 -switch";

      //todo usando la api de youtube-dl-exec
      await youtubedl(lpInput, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      })
        .then((output) => {
          output.formats.some((format) => {
            if (format.vcodec === "avc1.64001F") {
              infoLink = format.url;
              return true; // Detener la iteración
            }
          });

          if (!infoLink) {
            output.formats.some((format) => {
              if (format.vcodec === "avc1.42001E") {
                infoLink = format.url;
                return true; // Detener la iteración
              }
            });
          }

          console.log("Ruta del archivo mp4 enviado -switch");
        })
        .catch((error) => {
          console.error("Ocurrió un error: api-terceros", error);
          errTercero = "ERRAPITERCEROS-MP4";
        });

      break;
    case "m4a":
      // infoLink = "ma4 -switch";

      //todo usando la api de youtube-dl-exec
      await youtubedl(lpInput, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      })
        .then((output) => {
          // console.log(output);

          output.formats.some((format) => {
            if (
              format.acodec === "mp4a.40.2" &&
              format.format_note === "medium"
            ) {
              infoLink = format.url;
              return true; // Detener la iteración
            }
          });

          if (!infoLink) {
            output.formats.some((format) => {
              if (format.acodec === "opus" && format.format_note === "medium") {
                infoLink = format.url;
                return true; // Detener la iteración
              }
            });
          }
          if (!infoLink) {
            output.formats.some((format) => {
              if (
                format.acodec === "mp4a.40.2" &&
                format.format_note === "English original (default), medium"
              ) {
                infoLink = format.url;
                return true; // Detener la iteración
              }
            });
          }

          console.log("Ruta del archivo m4a enviado -switch");
        })
        .catch((error) => {
          console.error("Ocurrió un error:  api -tercero", error);
          errTercero = "ERRAPITERCEROS-M4A";
        });

      break;

    default:
      break;
  }

  // *se va enviar al cliente los datos solicitados

  if (!infoLink) {
    res.json({
      titulo: uriTitulo,
      img: uriImg,
      descripcion: uriDescripcion,
      uri: "ERROR",
      errYt: errApiYt,
      errClient: errorCliente,
      errTercero,
      data,
    });
  } else {
    //* validar que la url del archivo exista

    res.json({
      titulo: uriTitulo,
      img: uriImg,
      descripcion: uriDescripcion,
      uri: infoLink,
      data,
    });
  }

  //todo usando la api de youtube-dl-exec
  // youtubedl(body.urlEx, {
  //   dumpSingleJson: true,
  //   noCheckCertificates: true,
  //   noWarnings: true,
  //   preferFreeFormats: true,
  //   addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  // })
  //   .then((output) => {
  //     // let mp4Url;

  //     // output.formats.some((format) => {
  //     //   if (format.vcodec === "avc1.64001F") {
  //     //     mp4Url = format.url;
  //     //     return true; // Detener la iteración
  //     //   }
  //     // });

  //     // if (!mp4Url) {
  //     //   output.formats.some((format) => {
  //     //     if (format.vcodec === "avc1.42001E") {
  //     //       mp4Url = format.url;
  //     //       return true; // Detener la iteración
  //     //     }
  //     //   });
  //     // }

  //     //* console.log("Ruta del archivo MP4:", mp4Url);

  //     console.log("titulo", output.title);
  //     // console.log("DATA", output);

  //     // const url = mp4Url;

  //     console.log("envio de data exitoso - mp4");
  //     res.json({
  //       titulo: output.title,
  //       img: output.thumbnails[37].url,
  //       descripcion: output.description,
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Ocurrió un error:", error);
  //   });
});

//* test
app.get("/verificar", (req, res) => {
  youtubedl(urlTesting, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      console.log(output);
      // const mp4Url = output.formats.find(
      //   (format) =>
      //     format.vcodec === "avc1.64001F" || format.vcodec === "avc1.42001E"
      // ).url;
      let mp4Url;

      output.formats.some((format) => {
        if (format.vcodec === "avc1.64001F") {
          mp4Url = format.url;
          return true; // Detener la iteración
        }
      });

      if (!mp4Url) {
        output.formats.some((format) => {
          if (format.vcodec === "avc1.42001E") {
            mp4Url = format.url;
            return true; // Detener la iteración
          }
        });
      }

      // *console.log("Ruta del archivo MP3:", mp3Url);
      // console.log("Ruta del archivo MP4:", mp4Url);

      console.log("titulo", output.title);
      // const mp3Url = info.formats.find((format) => format.ext === "mp3").url;
      // const mp4Url = info.formats.find((format) => format.ext === "mp4").url;

      // console.log("Ruta del archivo MP3:", mp3Url);
      // console.log("Ruta del archivo MP4:", mp4Url);

      //*ruta alterna

      const url = mp4Url;

      // Establecer las cabeceras para la descarga automática

      res.setHeader(
        "Content-Disposition",
        contDis(`${output.title}.mp4`)
        // `attachment; filename="${output.title}".mp4`
      );
      res.setHeader("Content-Type", "video/mp4");

      // Realizar la solicitud GET al archivo de audio
      request
        .get(url)
        .on("error", (err) => {
          console.error(err);
          res.status(500).send("Error al descargar el archivo");
        })
        .pipe(res); // Piping la respuesta al cliente

      console.log("descarga da video exitoso");
    })
    .catch((error) => {
      console.error("Ocurrió un error:", error);
    });
});

// *usando una url externa para servirnos de su data (out context)
app.get("/descargar", (req, res) => {
  const archivo = "./public/uploads/temp.mp3";

  if (fs.existsSync(archivo)) {
    //* El archivo existe, puedes ver su contenido

    const urlAk = `${servidor}/uploads/temp.mp3`;
    request
      .get(urlAk)
      .on("error", (err) => {
        console.error(err);
        res.status(500).send("Error al descargar el archivo");
      })
      .pipe(res);

    //*El archivo existe, puedes realizar la descarga
    // res.download(archivo);
  } else {
    // El archivo no existe, envía un mensaje de error al cliente
    const mensaje = `El archivo no existe en la ruta ${servidor}/uploads/temp.mp3`;
    res.status(404).json({ error: mensaje });
  }
});

//* pruebas unitarias
app.get("/mix", (req, res) => {
  //* Ejecuta youtube-dl-exec para obtener la URL de descarga del video (api de terceros)

  //todo el api solo admite   video -> 720p,360  ~ audio -> formato m4a ,mp3 [mp4a,opus]
  youtubedl(urlTesting, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      // const mp3Url = output.formats.find(
      //   (format) => format.acodec === "mp4a.40.2"
      // ).url;
      // const mp4Url = output.formats.find(
      //   (format) => format.vcodec === "avc1.64001F"
      // ).url;

      let mp3Url;
      let ext;

      output.formats.some((format) => {
        if (format.acodec === "mp4a.40.2") {
          mp3Url = format.url;
          ext = "m4a";
          return true; // Detener la iteración
        }
      });

      if (!mp3Url) {
        output.formats.some((format) => {
          if (format.acodec === "opus") {
            mp3Url = format.url;
            ext = "mp3";
            return true; // Detener la iteración
          }
        });
      }

      //* console.log("Ruta del archivo MP3:", mp3Url);

      console.log("titulo", output.title);
      // const mp3Url = info.formats.find((format) => format.ext === "mp3").url;
      // const mp4Url = info.formats.find((format) => format.ext === "mp4").url;

      console.log("Ruta del archivo MP3:", mp3Url);
      // console.log("Ruta del archivo MP4:", mp4Url);

      //*archivo guardado en nuestro servidor

      // const urlPath = mp3Url;

      // const outputFilePath = `./public/uploads/${output.title}.webm`;
      // axios({
      //   method: "get",
      //   url: urlPath,
      //   responseType: "stream",
      // })
      //   .then((response) => {
      //     response.data
      //       .pipe(fs.createWriteStream(outputFilePath))
      //       .on("finish", () => {
      //         console.log("Archivo descargado con éxito");
      //       })
      //       .on("error", (error) => {
      //         console.error(`Error al descargar el archivo: ${error.message}`);
      //       });
      //   })
      //   .catch((error) => {
      //     console.error(`Error al descargar el archivo: ${error.message}`);
      //   });

      //*ruta alterna node-fetch(libreria)(envio del archivo al cliente)

      // const url = `http://localhost:3000/uploads/${output.title}.webm`;

      // const urlPa = mp3Url;

      // Establecer las cabeceras para la descarga automática

      // Realizar la solicitud GET al archivo de audio

      // fetchUrl(urlPa)
      //   .then((response) => {
      //     response.body.pipe(res);
      //     console.log("Descarga webm exitosa");
      //   })
      //   .catch((error) => {
      //     console.error("Ocurrió un error al descargar el archivo:", error);
      //     res.status(500).send("Error al descargar el archivo");
      //   });

      //* descarga el archivo desde el cliente al servidor
      const urlAti = mp3Url;

      res.setHeader(
        "Content-Disposition",
        contDis(`${output.title}.${ext}`)
        // `attachment; filename="${output.title}".webm`
      );
      res.setHeader("Content-Type", `video/${ext}`);

      // Realizar la solicitud GET al archivo de audio
      request
        .get(urlAti)
        .on("error", (err) => {
          console.error(err);
          res.status(500).send("Error al descargar el archivo");
        })
        .pipe(res); // Piping la respuesta al cliente

      console.log(`descarga da audio ${ext} exitoso`);

      //*envio del archivo al cliente
      // const downloadStream = request.get(mp3Url);

      // downloadStream.on("response", (response) =>

      //   res.setHeader(
      //     "Content-Disposition",
      //     `attachment; filename="${output.title}.webm"`
      //   );
      //   res.setHeader("Content-Type", "audio/webm");

      //   response.pipe(res);
      // });

      // downloadStream.on("error", (err) => {
      //   console.error(err);
      //   res.status(500).send("Error al descargar el archivo");
      // });
    })
    .catch((error) => {
      console.error("Ocurrió un error:", error);
    });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
