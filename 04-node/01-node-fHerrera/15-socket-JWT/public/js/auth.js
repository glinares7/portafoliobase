const miFormulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "";
//   : "https://restserver-curso-fher.herokuapp.com/api/auth/google";

miFormulario.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const formData = {};

  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }
  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "COntent-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.

  //    google tooken  ID token
  // console.log("id_token", response.credential);

  const body = { id_token: response.credential };

  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .then((resp) => {
      console.log(resp.token);
      localStorage.setItem("email", resp.usuario.correo);
      localStorage.setItem("token", resp.token);
      // location.reload()
      window.location = "chat.html";
    })
    .catch(console.warn);

  // const responsePayload = decodeJwtResponse(response.credential);

  // console.log("ID: " + responsePayload.sub);
  // console.log('Full Name: ' + responsePayload.name);
  // console.log('Given Name: ' + responsePayload.given_name);
  // console.log('Family Name: ' + responsePayload.family_name);
  // console.log("Image URL: " + responsePayload.picture);
  // console.log("Email: " + responsePayload.email);
}

const button = document.getElementById("google_signout");
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
