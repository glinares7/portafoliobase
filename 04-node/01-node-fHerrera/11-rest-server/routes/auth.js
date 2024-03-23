const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("correo", " el correo es obligatorio").isEmail(),
    check("password", " la contraseña es  obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", " el ID token es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;
