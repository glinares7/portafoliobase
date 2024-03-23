const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      result: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  console.log("usuario regex", regex);
  const total = await Usuario.countDocuments();

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],

    $and: [{ estado: true }],
  });

  res.json({
    total,
    result: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      result: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  console.log("categoria regex", regex);
  const total = await Categoria.count();
  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    total,
    result: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );

    return res.status(201).json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  console.log("producto regex", regex);
  const total = await Producto.countDocuments();

  const producto = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  }).populate("categoria", "nombre");

  res.json({
    total,
    result: producto,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};

module.exports = { buscar };
