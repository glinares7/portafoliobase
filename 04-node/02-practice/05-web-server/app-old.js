const http = require("http");

http
  .createServer((req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=input.html");
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(
      `
      <!DOCTYPE HTML>
        <html>
        <head>
        <body>
        <h1>
        Todo lo que te imaginas se puede lograr si lo haces desde un inicio y no te saltas hasta que tu mismo lo puedas hacer solo sin la necesidad de recurir a la teoria solo con pura logica
        </h1>
        </body>
        
        </head>
        </html>
      
     
      `
    );

    res.end();
  })
  .listen(8090);

console.log("puerto abierto desde 8090");
