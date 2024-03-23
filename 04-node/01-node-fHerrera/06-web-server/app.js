require("dotenv").config();
const express = require("express");
const hbs = require("hbs");

const app = express();

const port = process.env.PORT;

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

//TODO require('hbs')
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static("public"));

//* using partials
app.get("/", (req, res) => {
  res.render("home", {
    nombre: "fernando herrera",
    titulo: "Curso de node",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    nombre: "fernando herrera",
    titulo: "Curso de node",
  });
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "fernando herrera",
    titulo: "Curso de node",
  });
});
//* using express rutas

// app.get("/hola-mundo", (req, res) => {
//   res.send("Hola mundo en su respectiva ruta");
// });

// app.get("/generic", (req, res) => {
//   res.sendFile(__dirname + "/public/generic.html");
// });
// app.get("/elements", (req, res) => {
//   res.sendFile(__dirname + "/public/elements.html");
// });

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

// app.listen(8080);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
