//referencias HTML

const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');

  // lblOffline.style.display = 'none';
  btnCrear.disabled = false;
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');

  // lblOnline.style.display  = 'none';
  btnCrear.disabled = true;
});

socket.on("ultimo-ticket", (ultimo) => {
  lblNuevoTicket.innerText = "Ticket" + ultimo;
});

btnCrear.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
