const http = require("http");

http
  .createServer((req, res) => {
    // console.log(req);
    // res.writeHead(200, { "Content-Type": "text/plain" });

    //* Tipo y nombre del archivo
    // res.setHeader("Content-Disposition", "attachment; filename=lista.csv");
    // res.writeHead(200, { "Content-Type": "application/csv" });

    //*1
    // const persona = {
    //   id: 1,
    //   nombre: "Fernando",
    // };
    // res.write(JSON.stringify(persona));
    //*2
    // res.write("id,nombre\n");
    // res.write("1,Fernando\n");
    // res.write("2,Maria\n");
    // res.write("3,juan\n");
    // res.write("4,pedro\n");
    // res.end();

    res.write("HolaMundo");
    res.end();
  })

  .listen(8080);

console.log("escuchando en el puerto ", 8089);
