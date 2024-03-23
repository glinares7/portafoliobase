const { Router } = require("express");

const { check } = require("express-validator");

const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio ").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id de mongo no es valido ").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
