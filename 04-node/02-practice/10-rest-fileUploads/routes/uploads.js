const { Router } = require("express");
const { check } = require("express-validator");
const { coleccionesPermitidas } = require("../helpers/db-validators");

// const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const {
  cargarArchivo,
  actualizarImagen,
  actualizarImagenCloudinary,
  mostrarImagen,
} = require("../controllers/uploads");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  //   //   //*Archivos en el servidor de forma local
  actualizarImagen
);
//*Archivos desde la nube
//   ],
//   actualizarImagenCloudinary
// );

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
