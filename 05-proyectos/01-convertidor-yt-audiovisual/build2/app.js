const express = require("express");
const request = require("request");
const http = require("http");
const cors = require("cors");

const youtubedl = require("youtube-dl-exec");
const contDis = require("content-disposition");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const urlTesting =
  process.env.YOUTUBE || "https://www.youtube.com/watch?v=Kq2EaBJOsQ8";

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/todo", (req, res) => {
  res.json({ hello: "hi!" });
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

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
