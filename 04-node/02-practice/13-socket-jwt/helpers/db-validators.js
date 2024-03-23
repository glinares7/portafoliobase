const Role = require("../models/role");
// const Usuario = require("../models/usuario");

const { Categoria, Producto, Usuario } = require("../models");

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya esta registrado  `);
  }
};

const esRoleValido = async (rol = "") => {
  const existeRole = await Role.findOne({ rol });

  if (!existeRole) {
    throw new Error(`El rol: ${rol} no esta registrado  en la DB `);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe - Usuario`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El id ${id} no existe  - Categoria`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id ${id} no existe - Producto`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones} `
    );
  }
  return true;
};

module.exports = {
  emailExiste,
  esRoleValido,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
};
