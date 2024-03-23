const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario/password no son correctos ~ correo ",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario  con estado false",
      });
    }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        msg: `El usuario/password no son correctos ~ password`,
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      msg: "ok",
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
