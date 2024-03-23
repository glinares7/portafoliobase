const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: " se quiere verificar el role sin validar  el token primero ",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol != "ADMIN_ROLE") {
    return res.status(400).json({
      msg: ` ${nombre} no es administrador - no puede hacer esto `,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    // console.log(roles);
    if (!req.usuario) {
      return res.status(500).json({
        msg: " se quiere verificar el role sin validar  el token primero ",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `EL servicio requiere uno de estos  roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
