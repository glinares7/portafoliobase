//Referencias HTML

const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escitorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;
// console.log(escritorio);

divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');
  btnAtender.disabled = false;

  // lblOffline.style.display = 'none';
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');

  // lblOnline.style.display  = 'none';
  btnAtender.disabled = true;
});

// socket.on("ultimo-ticket", (ultimo) => {
//   //   lblNuevoTicket.innerText = "Ticket" + ultimo;
// });

socket.on("tickets-pendientes", (pendientes) => {
  // console.log(pendientes);
  if (pendientes === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendientes;
  }
});
btnAtender.addEventListener("click", () => {
  //   socket.emit("siguiente-ticket", null, (ticket) => {
  //     lblNuevoTicket.innerText = ticket;
  //   });

  socket.emit("atender -ticket", { escritorio }, ({ ok, ticket, msg }) => {
    // console.log(payload);

    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlerta.style.display = "");
    }

    lblTicket.innerText = "Ticket" + ticket.numero;
  });
});
