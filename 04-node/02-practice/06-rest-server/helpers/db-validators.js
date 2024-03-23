const Role = require("../models/role");
const Usuario = require("../models/usuario");

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
    throw new Error(`El id ${id} no existe `);
  }
};

module.exports = {
  emailExiste,
  esRoleValido,
  existeUsuarioPorId,
};
