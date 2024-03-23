const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //*validar Extension
    //* const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida ,${extensionesValidas} `
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    //* const uploadPath=path.join(__dirname,"../uploads/",archivo.name)

    //* nombre Temporal
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

const subirArchivoClient = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //*validar Extension
    //* const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida ,${extensionesValidas} `
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    //* const uploadPath=path.join(__dirname,"../uploads/",archivo.name)

    //* nombre Temporal
    // const uploadPath = path.join(
    //   __dirname,
    //   "../uploads/",
    //   carpeta,
    //   nombreTemp
    // );

    const uploadPath = path.join(
      __dirname,
      "../public/",
      carpeta,
      archivo.name
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(archivo.name);
      // resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
  subirArchivoClient,
};
