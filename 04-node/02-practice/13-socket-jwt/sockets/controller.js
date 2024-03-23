const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {
  //   console.log("cliente conectado", socket.id);

  const usuario = await comprobarJWT(socket.handshake.headers["x-token"]);
  if (!usuario) {
    return socket.disconnect();
  }

  // console.log('Se conecto', usuario.nombre);

  //Agregar el ususario conectado
  chatMensajes.conectarUsuario(usuario);
  chatMensajes.desconectarUsuario(usuario);
  io.emit("usuarios-activos", chatMensajes.usuariosArr);
  socket.emit("recibir-mensajes", chatMensajes.ultimos10);

  socket.join(usuario.id);

  socket.on("disconnect", () => {
    chatMensajes.desconectarUsuario(usuario.id);
    io.emit("usuarios-activos", chatMensajes.usuariosArr);
  });

  socket.on("enviar-mensaje", ({ uid, mensaje }) => {
    if (uid) {
      //mensajes privados

      socket.to(uid).emit("mensaje-privado", { de: usuario.nombre, mensaje });
    } else {
      chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);

      io.emit("recibir-mensajes", chatMensajes.ultimos10);
    }
  });
};

module.exports = {
  socketController,
};
