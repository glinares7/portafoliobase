//*Referencias HTML

const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;
// console.log(escritorio);

//todo tarea por rehacer

divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // console.log("Conectado");
  // lblOffline.style.display = "none";

  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  // console.log("Desconectado del servidor");
  // lblOnline.style.display = "none";

  btnAtender.disabled = true;
});

// socket.on("ultimo-ticket", (ultimo) => {
//   lblNuevoTicket.innerText = "Ticket" + ultimo;
// });

socket.on("tickets-pendientes", (pendientes) => {
  if (pendientes === 0) {
    lblPendientes.style.display = "none";
    divAlerta.style.display = "";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendientes;
  }
});

btnAtender.addEventListener("click", () => {
  // socket.emit("siguiente-ticket",null,(ticket) =>{
  //   lblNuevoTicket.innerText=ticket
  // })

  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    // console.log(payload);

    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlerta.style.display = "");
    }

    if (!ticket) {
      return;
    } else {
      lblTicket.innerText = "Ticket " + ticket.numero;
    }
  });
});
