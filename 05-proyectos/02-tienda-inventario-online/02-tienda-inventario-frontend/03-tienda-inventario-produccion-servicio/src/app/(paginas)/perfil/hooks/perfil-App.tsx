export default function perfilApp() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

  const perfilPostUser = async (idUser: any, payloadPerfil: any) => {
    const perfilPost = await fetch(`${server}/perfil/${idUser}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadPerfil),
    })
      .then((response) => {
        if (response.ok) {
          console.log("la URL tiene el acceso - POST");
        } else {
          console.log("No se puede conectar a la URL - POST");
        }
      })
      .catch((error) => {
        console.log("fallo la conexion con el servidor - POST", error);
      });

    return perfilPost;
  };
  const authGetSessionDelete = async (session: any) => {
    const userGetEncrypt = await fetch(`${server}/sesion/${session}/delete`, {
      method: "GET",
      credentials: "include",
    });

    return userGetEncrypt.json();
  };

  return {
    server,
    perfilPostUser,
    authGetSessionDelete,
  };
}
