const dbValidator = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const subirArchivos = require("./subir-archivo");

module.exports = {
  ...dbValidator,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivos,
};
