"use client";
import Link from "next/link";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UseContext } from "@/app/contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import perfilApp from "./hooks/perfil-App";

type perfilUser = {
  firstName: string;
  surName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
  photo: any;
};

export default function Page() {
  const { authState, userAuth }: any = useContext(UseContext);

  // const { firstname, surname, lastname, email, address, gender, phone } = userAuth.perfil

  const resPerfilAuth = userAuth.perfil;

  const [resText, setResText] = useState("");

  const [reqPerfil, setReqPerfil]: any = useState();

  const { server, perfilPostUser } = perfilApp();

  const [dataPerfil, setDataPerfil] = useState<perfilUser>({
    firstName: "",
    surName: "",
    lastName: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    photo: "",
  });

  const route = useRouter();

  useEffect(() => {
    if (userAuth.username) {
      const restext = userAuth.username.slice(0, 1, "todo");
      setResText(userAuth.username.replace(restext, restext.toUpperCase()));
    }

    async function getPerfilUser() {
      const getUserPerfil = await fetch(`${server}/users/${userAuth.id}`);

      const res = await getUserPerfil.json();

      setReqPerfil(res[0].perfil);
      console.log("user respuesta ", res[0].perfil);

      if (res[0].perfil) {
        setDataPerfil({
          firstName: res[0].perfil.firstname || "",
          surName: res[0].perfil.surname || "",
          lastName: res[0].perfil.lastname || "",
          email: res[0].perfil.email || "",
          gender: res[0].perfil.gender || "",
          address: res[0].perfil.address || "",
          phone: res[0].perfil.phone || "",
          photo: "",
        });
      }
    }

    getPerfilUser();

    // console.log('local inicial', da (async () => {taPerfil);

    console.log("user hoy", userAuth);
  }, [server, userAuth, userAuth.username]);

  useEffect(() => {
    (async () => {
      if (dataPerfil) {
        const getUserPerfilSubmit = await fetch(
          `${server}/users/${userAuth.id}`
        );

        const resSubmit = await getUserPerfilSubmit.json();

        setReqPerfil(resSubmit[0].perfil);
      }
    })();
  }, [dataPerfil, server, userAuth.id]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevenir la recarga de la página

    console.log("test dato", dataPerfil.photo);
    console.log("test dato firstname", dataPerfil.firstName);

    // console.log('local inicial evento submit', dataPerfil)

    //!paso 0
    // const payload = new FormData();
    // payload.append('file', dataPerfil.photo)

    try {
      // const dataPictureServer = await fetch('http://localhost:3000/smartphone/file', {
      //     method: 'POST',
      //     // headers: {
      //     //     // 'Content-Type': 'multipart/form-data;'
      //     // },
      //     body: payload,

      // })

      // const resDataServer = await dataPictureServer.json()

      //!primero enviamos el archivo al servidor;
      // const resDataServer = await smartphonePostFile(payload);

      //*  respnse.ok solo  verificar si llegan los datos al server
      // if (response.ok) {
      //     console.log('Se envio el archivo - POST');

      // } else {
      //     console.log('No se envio el archivo - POST');

      // }

      // console.log("datos del servidro1", resDataServer);

      //* respuesta data
      // .then(data => {
      //     console.log("envio del backend", data);

      //     console.log('Se hizo la descarga - POST');
      // }).catch(error => {
      //     console.log('error al descargar el archivo - POST', error);
      // })

      //    formData.file.name, //nombre del archivo

      // const getUserPerfilSubmit = await fetch(`${server}/users/${userAuth.id}`)

      // const resSubmit = await getUserPerfilSubmit.json()

      // setReqPerfil(resSubmit[0].perfil)

      //!paso 2
      const payloadPerfil = {
        firstname: dataPerfil.firstName,
        surname: dataPerfil.surName,
        lastname: dataPerfil.lastName,
        email: dataPerfil.email,
        gender: dataPerfil.gender,
        address: dataPerfil.address,
        phone: dataPerfil.phone,
        // photo: dataPerfil.photo
      };

      //!paso electo
      // await fetch(`${server}/perfil/${userAuth.id}/user`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(payloadPerfil)
      // }).then(response => {
      //   if (response.ok) {
      //     console.log('la URL tiene el acceso - POST');

      //   } else {
      //     console.log('No se puede conectar a la URL - POST');

      //   }
      // }).catch(error => {
      //   console.log('fallo la conexion con el servidor - POST', error);
      // })

      if (reqPerfil) {
        console.log("se actualiza el perfil");

        await fetch(`${server}/perfil/${reqPerfil.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadPerfil),
        })
          .then((response) => {
            if (response.ok) {
              console.log("la URL tiene el acceso - UPDATE");
            } else {
              console.log("No se puede conectar a la URL - UPDATE");
            }
          })
          .catch((error) => {
            console.log("fallo la conexion con el servidor - UPDATE", error);
          });

        // console.log('user-auth-update', userAuth);

        //*update perfilOneToOne
        // const getUserPerfil = await fetch(`${server}/perfil/${resPerfilAuth.id}`)

        // const res = await getUserPerfil.json()

        // const resPerfilGet = {
        //   firstName: res[0].firstname,
        //   surName: res[0].surname,
        //   lastName: res[0].lastname,
        //   email: res[0].email,
        //   gender: res[0].gender,
        //   address: res[0].address,
        //   phone: res[0].phone,
        //   photo: '',
        // }
        // setDataPerfil(resPerfilGet)

        // userAuth.perfil = dataPerfil
        // setUserAuth(userAuth)
      } else {
        console.log("se crea el perfil");
        await perfilPostUser(userAuth.id, payloadPerfil);
      }

      //todo eso si va resPerfilAuth
      // console.log('newDataPerfil', dataPerfil);

      // await smartphonePost(payloadFile)
      //!limpiador
      // setDataPerfil({
      //   firstName: '',
      //   surName: '',
      //   lastName: '',
      //   email: '',
      //   gender: '',
      //   address: '',
      //   phone: '',
      //   photo: '',
      // })

      // fetch('http://localhost:3000/smartphone/2/res', {
      //     method: 'POST'
      // }).then((res) => res.json()).then(data => console.log('servidor obj ', data)
      // )

      //* METODO DESCARGA AL CLIENTE
      // fetch('http://localhost:3000/smartphone/file', {
      //     method: 'POST',
      //     // headers: {
      //     //     // 'Content-Type': 'multipart/form-data;'
      //     // },
      //     body: payload,

      // }).then(response => {
      //     if (response.ok) {
      //         console.log('Se envio el archivo - POST');

      //         return response.blob()
      //     } else {
      //         console.log('No se envio el archivo - POST');

      //     }
      // }).then((blob) => {
      //     if (blob) {

      //         console.log(blob);
      //         // Crea una URL local para el Blob
      //         const url = window.URL.createObjectURL(blob);

      //         // Crea un enlace en el DOM y simula un clic para descargar el archivo
      //         const a = document.createElement('a');
      //         a.href = url;
      //         a.download = `${formData.file.name}`; // Cambia el nombre del archivo según lo que envió el servidor
      //         a.click();

      //         // Limpia la URL creada
      //         window.URL.revokeObjectURL(url);

      //     } else {
      //         console.log('demora al revibir el archivo');

      //     }

      // }).catch(error => {
      //     console.log('error al descargar el archivo - POST', error);
      // })
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <div>¡Bienvenido al perfil: {resText || userAuth.username}</div>
      <br />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full    items-center gap-2 "
        encType="multipart/form-data"
      >
        {/* <div className="flex w-2/4 items-center justify-between" >
                    <label htmlFor="picture">Picture:</label>
                    <input className="w-[88%] border-gray-500 border-2 border-dashed  h-[40px]" type="text" name="picture" value={formData.picture} id="picture" placeholder="picture" required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, picture: e.target.value })
                    } />
                </div> */}
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="firstName">FirstName: </label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="title"
            value={dataPerfil.firstName}
            id="firstName"
            placeholder="firstName"
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, firstName: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="surName">SurName:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="surName"
            id="surName"
            value={dataPerfil.surName}
            placeholder="surName"
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, surName: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="lastName">LastName:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="lastName"
            id="lastName"
            value={dataPerfil.lastName}
            placeholder="lastName"
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, lastName: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="email">Email:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="email"
            name="email"
            id="email"
            value={dataPerfil.email}
            placeholder="email"
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, email: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="gender">Gender:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="gender"
            id="gender"
            placeholder="gender"
            value={dataPerfil.gender}
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, gender: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="address">Address:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="address"
            id="address"
            value={dataPerfil.address}
            placeholder="address"
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, address: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="phone">Phone:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[75%]"
            type="text"
            name="phone"
            id="phone"
            placeholder="phone"
            value={dataPerfil.phone}
            autoComplete="off"
            onChange={(e) =>
              setDataPerfil({ ...dataPerfil, phone: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-end max-sm:w-[75%]">
          <input
            className="w-[88%] max-sm:w-[80%] "
            type="file"
            name="filePhoto"
            id="filePhoto"
            onChange={(e) => {
              if (!e.target.files) return;
              setDataPerfil({ ...dataPerfil, photo: e.target.files[0] });
            }}
          />
        </div>

        <div className="flex w-1/3  gap-2 border-gray-500 border-2 max-sm:w-[90%]">
          <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
            <input
              type="submit"
              className=" w-full text-white bg-red-500  cursor-pointer"
              value="Enviar"
            />
          </div>
          <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
            <input
              type="button"
              className=" w-full text-white bg-red-500 cursor-pointer"
              onClick={() => route.back()}
              value="Volver"
            />
          </div>
          {/* <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
                        <input type="button" className=" w-full text-white bg-red-500 cursor-pointer" onClick={handleFile} value="FIle" />
                    </div> */}
        </div>
      </form>
      <br />
      {authState ? <h1>datos true 1</h1> : <h1>datos false 2</h1>}

      <div className="flex  my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
        <button
          className=" w-full text-white bg-red-500 cursor-pointer"
          onClick={() => route.back()}
        >
          volver
        </button>
      </div>
    </>
  );
}
