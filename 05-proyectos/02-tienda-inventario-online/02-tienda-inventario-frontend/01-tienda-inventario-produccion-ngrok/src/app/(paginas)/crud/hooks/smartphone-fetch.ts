export default function smartphoneFetch() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";
  const smartphoneGet = async () => {
    const dataSmart = await fetch(`${server}/smartphone`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    return dataSmart.json();
  };

  const smartphoneGetOne = async (numId: any) => {
    const res = await fetch(`${server}/smartphone/${numId}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    return res.json();
  };
  const smartphonePostFile = async (payload: any) => {
    const dataPictureServer = await fetch(`${server}/smartphone/file`, {
      method: "POST",
      // headers: {
      //     // 'Content-Type': 'multipart/form-data;'
      // },
      body: payload,

      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    return dataPictureServer.json();
  };

  const smartphonePost = async (payloadFile: any) => {
    const restulSmartphonePost = await fetch(`${server}/smartphone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(payloadFile),
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

    return restulSmartphonePost;
  };

  const smartphoneUpdateFile = async (numId: any, blobPayload: any) => {
    const dataPictureServer1 = await fetch(
      `${server}/smartphone/${numId}/filetest`,
      {
        method: "PATCH",

        body: blobPayload,

        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );

    return dataPictureServer1.json();
  };

  const smartphoneUpdate = async (numId: any, payload1: any) => {
    const smartphoneUpdateGo = await fetch(`${server}/smartphone/${numId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(payload1),
    })
      .then((response) => {
        if (response.ok) {
          console.log("la URL tiene el acceso desde adentro- PATCH");
        } else {
          console.log("No se puede conectar a la URL desde adentro - PATCH");
        }
      })
      .catch((error) => {
        console.log(
          "fallo la conexion con el servidor desde adentro -PATCH",
          error
        );
      });
    return smartphoneUpdateGo;
  };

  const smartphoneUpdateVerify = async (numId: any, payloadVerify: any) => {
    const smartphoneVerify = await fetch(
      `${server}/smartphone/${numId}/fileVerify`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(payloadVerify),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Se elimino o actualizo verify - PATCH");
        } else {
          console.log("No hizo cambios verify - PATCH");
        }
      })
      .catch((error) => {
        console.log("fallo la conexion con el servidor verify -PATCH", error);
      });
    return smartphoneVerify;
  };

  const smartphoneDeleteFile = async (delId: any, payload: any) => {
    const smartphoneDel = await fetch(`${server}/smartphone/${delId}/file`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          console.log("La url es valida - DELETE");
        } else {
          console.log("la url fallo - DELETE ");
        }
      })
      .catch((error) => {
        console.log("error al conectarse al servidor - DELETE", error);
      });

    return smartphoneDel;
  };

  const smartphoneDelete = async (id: any, payload: any) => {
    const smartphoneDeleteGo = await fetch(`${server}/smartphone/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          console.log("La url es valida - DELETE");
        } else {
          console.log("la url fallo - DELETE ");
        }
      })
      .catch((error) => {
        console.log("error al conectarse al servidor - DELETE", error);
      });

    return smartphoneDeleteGo;
  };
  return {
    smartphoneGet,
    smartphoneGetOne,
    smartphonePostFile,
    smartphonePost,
    smartphoneUpdateFile,
    smartphoneUpdate,
    smartphoneUpdateVerify,
    smartphoneDeleteFile,
    smartphoneDelete,
    server,
  };
}
