var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";

  throw new Error("El nombre y sala son necesarios");
}

var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, function (resp) {
    //console.log("Usuarios conectados",resp)

    //todo renderizar los usuarios ~ socket-chat-jquery.js

    renderizarUsuarios(resp);
  });
});

//escuchar

socket.on("disconnect", function () {
  console.log("Perdimos conexion con el servidor ");
});

//enviar información

// socket.emit("crearMensaje",{
//     nombre:"Fernando",
//     mensaje:"Hola Mundo",
// },function(resp){
//     console.log("respuesta server:",resp);
// })

//*Escuchar cambios de usuarios
socket.on("crearMensaje", function (mensaje) {
  // console.log("Servidor",mensaje);
  renderizarMensajes(mensaje, false);
  scrollBottom();
});

//*cuando un usuario entra a sala del chat
socket.on("listaPersona", function (personas) {
  console.log(personas);
  renderizarUsuarios(personas);
});

//*Mensajes privados

// socket.on("mensajePrivado", function (mensaje) {
//   console.log("mensaje Privado", mensaje);
// });
