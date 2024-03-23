const { Router } = require("express");

const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { check } = require("express-validator");

const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  //   tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "El id de mongo no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
    check("categoria", "El id de mongo no es valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    // tieneRole("ADMIN_ROLE","VENTAS_ROLE","OTRO_ROLE"),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
