const fs = require("fs");
const path = require("path");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate(); //*12
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  //* GETTER

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimos4, ultimo } = require("../db/data.json");

    if (hoy === this.hoy) {
      (this.tickets = tickets),
        (this.utimo = ultimo),
        (this.ultimos4 = ultimos4);
    } else {
      //*Es otro dia
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, "../db/data.json");

    //*^writeFileSync almacena el string ,debe parsear el string

    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDB();

    //*return "Ticket",this.ultimo
    return "Ticket" + ticket.numero;
  }

  atenderTicket(escritorio) {
    //*no tenemos tickets

    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift(); //*this.tickets[0]

    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }

    // *console.log(this.ultmos4);

    this.guardarDB();
    return ticket;
  }
}

module.exports = {
  TicketControl,
};
