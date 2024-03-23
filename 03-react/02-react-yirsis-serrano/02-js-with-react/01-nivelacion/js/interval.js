const saludo = () => {
  document.write("<li>hola mundo</li>");
};
document.write("<ol>");
setInterval(saludo, 2000);
document.write("</ol>");
