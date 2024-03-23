const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  const { correo, nombre, img } = await googleVerify(id_token);

  let usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    const data = {
      nombre,
      correo,
      password: ":P",
      img,
      google: true,
    };

    usuario = new Usuario(data);

    await usuario.save();
  }

  if (!usuario.estado) {
    return res.status(401).json({
      msg: "Hable con el administrador - usuario bloqueado ",
    });
  }

  const token = await generarJWT(usuario.id);

  res.json({
    usuario,
    token,
  });
};

module.exports = { login, googleSignIn };
