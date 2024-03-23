const { Router, response } = require("express");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const {
  validarJWT,
  validarCampos,
  esAdminRole,
  // tieneRole,
} = require("../middlewares");
const { check } = require("express-validator");
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

//*obtener producto  publico
router.get("/", obtenerProductos);

//*obtener producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//* Crear productos - privado - cualquier persona con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//*actualizar producto - privado - contiene token
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id valido de mongo ").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//* Eliminar producto - privado - contiene token
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido de mongo ").isMongoId(),
    check("id").custom(existeProductoPorId),
    // tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
