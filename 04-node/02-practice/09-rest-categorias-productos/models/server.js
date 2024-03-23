const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.auth = "/api/auth";
    this.buscar = "/api/buscar";
    this.categorias = "/api/categorias";
    this.productos = "/api/productos";
    this.usuarios = "/api/usuarios";

    this.conectarDB();
    this.midlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.auth, require("../routes/auth"));
    this.app.use(this.buscar, require("../routes/buscar"));
    this.app.use(this.categorias, require("../routes/categorias"));
    this.app.use(this.productos, require("../routes/productos"));
    this.app.use(this.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("conectado desde el puerto ", this.port)
    );
  }
}

module.exports = Server;
