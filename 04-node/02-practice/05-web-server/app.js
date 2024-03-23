const express = require("express");
const dotenv = require("dotenv").config();
const hbs = require("hbs");

const path = require("path");

const app = express();

const port = process.env.PORT;

hbs.registerPartials(__dirname + "/views/partials/");
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/content", express.static("public"));

app.get("/", (req, res) => {
  res.send("hola estas en la pagina principal");
});

app.get("/jose", (req, res) => {
  // res.send("aqui estan nuestros usuarios");
  res.render("index", {
    nombre: "Jose Faustino Sanches Carrión",
    titulo: "El cambio empieza cuando  comprendes su causa",
  });
});
app.get("/pedro", (req, res) => {
  // res.send("aqui estan nuestros usuarios");
  res.render("somos", {
    nombre: "Pedro Paulet",
    titulo: "La vida es un constante aprendizaje",
  });
});

app.listen(port, console.log(`conectado del el puerto`, port));
