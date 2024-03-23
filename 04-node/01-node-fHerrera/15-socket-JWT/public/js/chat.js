const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "";

let usuario = null;
let socket = null;

//Refernencias HTML
const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

const validarJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("No hay token en el servidor");
  }

  const resp = await fetch(url, {
    headers: { "x-token": token },
  });

  const { usuario: userDB, token: tokenDB } = await resp.json();
  //   console.log("Este es el usuario", userDB, "\n", "Este es el token ", tokenDB);

  localStorage.setItem("token", tokenDB);
  usuario = userDB;
  document.title = usuario.nombre;

  await conectarSocket();
};

const conectarSocket = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Socket online");
  });
  socket.on("disconnect", () => {
    console.log("Socket offline");
  });

  socket.on("recibir-mensajes", dibujarMensajes);
  socket.on("usuarios-activos", dibujarUsuarios);
  //todo
  // console.log(payload);

  socket.on("mensaje-privado", (payload) => {
    //todo

    console.log("payload", payload);
  });
};

const dibujarMensajes = (mensajes = []) => {
  //todo

  let mensajesHtml = "";
  mensajes.forEach(({ nombre, mensaje }) => {
    mensajesHtml += `
    <li>
      <p>
        <h5 class="text-primay">${nombre}</h5>
        <span >${mensaje}</span>
      </p>
    </li>
    

    `;
  });

  ulMensajes.innerHTML = mensajesHtml;
};

const dibujarUsuarios = (usuarios = []) => {
  //todo

  let usersHtml = "";
  usuarios.forEach(({ nombre, uid }) => {
    usersHtml += `
    <li>
      <p>
        <h5 class="text-success">${nombre}</h5>
        <span class="fs-6 text-muted">${uid}</span>
      </p>
    </li>
    

    `;
  });

  ulUsuarios.innerHTML = usersHtml;
};

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
  const mensaje = txtMensaje.value;
  const uid = txtUid.value;
  if (keyCode !== 13) {
    return;
  }
  if (mensaje.length === 0) {
    return;
  }

  socket.emit("enviar-mensaje", { mensaje, uid });

  txtMensaje.value = "";
});

btnSalir.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location = "index.html";
});

const main = async () => {
  //VALIDAR jwt
  await validarJWT();
};

main();
