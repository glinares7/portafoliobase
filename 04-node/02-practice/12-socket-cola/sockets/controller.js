const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  //* console.log("cliente conectado",socket.id)

  // socket.on("disconnect",()=>{
  //     console.log("Cliente desconectado",socket.id);
  // })

  //*cuando el cliente se conecta
  socket.emit("ultimo-ticket", ticketControl.ultimo);
  socket.emit("estado-actual", ticketControl.ultimos4);

  //todo broadcast "ticket-pendientes"
  socket.emit("tickets-pendientes", ticketControl.tickets.length);

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();

    callback(siguiente);

    //* Notificar que hay un nuevo ticket pendiente de asignar

    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    // console.log(escritorio);

    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);

    //todo notificar cambio en los ultimos 4

    socket.broadcast.emit("estado-actual", ticketControl.ultimos4);

    socket.emit("tickets-pendientes", ticketControl.tickets.length);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: true,
        msg: "Ya no hay mas tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
