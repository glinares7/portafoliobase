"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as path from "path";
import { MouseEvent, use, useCallback, useEffect, useState } from "react";
import smartphoneFetch from "../../hooks/smartphone-fetch";

type DatosType = {
  id: string;
  picture: string;
  title: string;
  from: string;
  offer1: string;
  offer2: string;
  current: string;
  file: any;
  estado: boolean;
};

export default function Page() {
  // const server = 'https://p9jbwwh0-5000.brs.devtunnels.ms'
  // const server = 'https://nest-online-build.onrender.com'
  const {
    smartphoneGetOne,
    smartphoneUpdateFile,
    smartphoneUpdate,
    smartphoneUpdateVerify,
    server,
  } = smartphoneFetch();
  const [newPage, setNewPage] = useState("");
  const [datos, setDatos] = useState<DatosType>({
    id: "",
    picture: "",
    title: "",
    from: "",
    offer1: "",
    offer2: "",
    current: "",
    file: "",
    estado: false,
  });
  // const [datos2, setDatos2] = useState(false);
  const searchSmart = useSearchParams();

  const route = useRouter();
  const pathSet = usePathname();

  const updateIdSmart = searchSmart.get("id");

  let numId = updateIdSmart || 1;
  // let arrSmart: any = []
  useEffect(() => {
    async function fetchData() {
      // const res = await fetch(`http://localhost:3000/smartphone/${numId}`);
      // const data = await res.json();

      const data = await smartphoneGetOne(numId);
      // arrSmart.push(...data)
      setDatos({ ...data[0], id: numId, estado: false });

      // setDatos2(true)
    }

    fetchData();

    // console.log("que daño te hace", arrSmart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //     if (!datos.file) return
  //     datos.picture = `http://localhost:3000/public/img/03-mix/${datos.file.name}`
  //     setDatos(datos)

  // }, [datos])

  // useEffect(() => {

  //     if (searchSmart) {

  //         const idSmart = searchSmart.get('id')

  //         const pictureSmart = searchSmart.get('picture')
  //         const titleSmart = searchSmart.get('title')
  //         const fileSmartphoneSmart = searchSmart.get('fileSmartphone')
  //         const fromSmart = searchSmart.get('from')
  //         const offer1Smart = searchSmart.get('offer1')
  //         const offer2Smart = searchSmart.get('offer2')
  //         const currentSmart = searchSmart.get('current')

  //         if (idSmart) {
  //             const bodySmartPhone = {
  //                 picture: pictureSmart,
  //                 title: titleSmart,
  //                 from: fromSmart,
  //                 offer1: offer1Smart,
  //                 offer2: offer2Smart,
  //                 current: currentSmart

  //             }

  //             fetch(`http://localhost:3000/smartphone/${idSmart}`, {
  //                 method: 'PATCH',
  //                 headers: {
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(bodySmartPhone)
  //             }).then(response => {
  //                 if (response.ok) {
  //                     console.log('la URL tiene el acceso - PATCH');

  //                 } else {
  //                     console.log('No se puede conectar a la URL - PATCH');

  //                 }
  //             }).catch(error => {
  //                 console.log('fallo la conexion con el servidor -PATCH', error);

  //             }

  //             )

  //         }
  //     }

  // }, [searchSmart])

  // console.log("datos ahora ", datos[0].picture);

  // useEffect(() => {
  //     console.log("datos del primero", datos);

  // }, [datos])

  const handleSmart = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    if (numId) {
      console.log("datos a verrificar file", datos.estado);

      console.log("mensaje por dentro", newPage);

      //* Al darle click a  descargar(input file) cambia su estado a true
      if (datos.estado) {
        // console.log('que valor tiene  picture luego de los cambios', datos.file.name);

        //* me devuelve el randoFilename
        const blobPayload1 = new FormData();
        blobPayload1.append("file", datos.file);
        // blobPayload1.append('picture', datos.picture)

        // const dataPictureServer1 = await fetch(`http://localhost:3000/smartphone/${numId}/filetest`, {
        //     method: 'PATCH',

        //     body: blobPayload1
        // })

        // const resPictureServer = await dataPictureServer1.json()

        const resPictureServer = await smartphoneUpdateFile(
          numId,
          blobPayload1
        );

        let payload1 = {
          id: datos.id,
          picture: `${server}/public/img/03-mix/${resPictureServer.randonPicture}`,
          title: datos.title,
          from: datos.from,
          offer1: datos.offer1,
          offer2: datos.offer2,
          current: datos.current,
        };

        // await fetch(`http://localhost:3000/smartphone/${numId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload1)
        // }).then(response => {
        //     if (response.ok) {
        //         console.log('la URL tiene el acceso desde adentro- PATCH');

        //     } else {
        //         console.log('No se puede conectar a la URL desde adentro - PATCH');

        //     }
        // }).catch(error => {
        //     console.log('fallo la conexion con el servidor desde adentro -PATCH', error);

        // }

        // )

        await smartphoneUpdate(numId, payload1);

        // console.log('datos del backend update!!!  ', resPictureServer);

        // const res = await fetch(`http://localhost:3000/smartphone/${numId}`);
        // const data = await res.json();

        const data = await smartphoneGetOne(numId);
        // arrSmart.push(...data)
        setDatos({ ...data[0], id: numId, estado: false });
        setNewPage("inside");
        console.log("data actualizada!!! ");

        //* verifico si el archivo igual al que tengo almacenado

        // if (datos.picture != `http://localhost:3000/public/img/03-mix/${datos.file.name}`)

        // console.log('el nombre de los archivos son diferentes ');
        const payloadVerify = {
          picture: datos.picture,
        };

        // await fetch(`http://localhost:3000/smartphone/${numId}/fileVerify`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payloadVerify)
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             console.log('Se elimino o actualizo verify - PATCH');

        //         } else {
        //             console.log('No hizo cambios verify - PATCH');

        //         }
        //     }).catch(error => {
        //         console.log('fallo la conexion con el servidor verify -PATCH', error);

        //     }

        //     )

        await smartphoneUpdateVerify(numId, payloadVerify);

        //* console.log(' el nombre de los archivos son igules');
      }

      if (newPage != "ok") {
        let payload = {
          id: datos.id,
          picture: datos.picture,
          title: datos.title,
          from: datos.from,
          offer1: datos.offer1,
          offer2: datos.offer2,
          current: datos.current,
        };

        // await fetch(`http://localhost:3000/smartphone/${numId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        // }).then(response => {
        //     if (response.ok) {
        //         console.log('la URL tiene el acceso - PATCH');

        //     } else {
        //         console.log('No se puede conectar a la URL - PATCH');

        //     }
        // }).catch(error => {
        //     console.log('fallo la conexion con el servidor -PATCH', error);

        // }

        // )

        await smartphoneUpdate(numId, payload);
      }

      // datos.picture = `http://localhost:3000/public/img/03-mix/${datos.file.name}`
      // setDatos(datos)
      // console.log('datos recien enviados', datos.picture);

      // const blobPayload = new FormData();
      // blobPayload.append('file', datos.file)
      // blobPayload.append('picture', datos.picture)

      // await fetch(`http://localhost:3000/smartphone/${numId}/filetest`, {
      //     method: 'PATCH',

      //     body: blobPayload
      // }).then(response => {
      //     if (response.ok) {
      //         console.log('se realizo la subida o actualización del archivo - PATCH');

      //     } else {
      //         console.log('No se realizo accion de subida o descarga archivo - PATCH');

      //     }
      // }).catch(error => {
      //     console.log('fallo la conexion con el servidor -PATCH', error);

      // }

      // )
    }
  };

  // const handleSmart = async (e: {
  //     target: any; preventDefault: () => void;
  // }) => {

  //     e.preventDefault()
  //     if (numId) {

  //         console.log("datos a verrificar file", datos.estado);

  //         console.log('mensaje por dentro', newPage);

  //         //* Al darle click a  descargar(input file) cambia su estado a true
  //         if (datos.estado) {
  //             // console.log('que valor tiene  picture luego de los cambios', datos.file.name);

  //             let payload = {
  //                 id: datos.id,
  //                 picture: `http://localhost:3000/public/img/03-mix/${datos.file.name}`,
  //                 title: datos.title,
  //                 from: datos.from,
  //                 offer1: datos.offer1,
  //                 offer2: datos.offer2,
  //                 current: datos.current,

  //             }

  //             await fetch(`http://localhost:3000/smartphone/${numId}`, {
  //                 method: 'PATCH',
  //                 headers: {
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(payload)
  //             }).then(response => {
  //                 if (response.ok) {
  //                     console.log('la URL tiene el acceso desde adentro- PATCH');

  //                 } else {
  //                     console.log('No se puede conectar a la URL desde adentro - PATCH');

  //                 }
  //             }).catch(error => {
  //                 console.log('fallo la conexion con el servidor desde adentro -PATCH', error);

  //             }

  //             )

  //             const res = await fetch(`http://localhost:3000/smartphone/${numId}`);
  //             const data = await res.json();
  //             // arrSmart.push(...data)
  //             setDatos({ ...data[0], id: numId, estado: false })
  //             setNewPage('inside')
  //             console.log('data actualizada!!! ');

  //             //* en el caso del picture toma su valor original por que la condicion solo  actualiza el input  file

  //             if (datos.picture != `http://localhost:3000/public/img/03-mix/${datos.file.name}`) {

  //                 console.log('el nombre de los archivos son diferentes ');
  //                 const blobPayload = new FormData();
  //                 blobPayload.append('file', datos.file)
  //                 blobPayload.append('picture', datos.picture)

  //                 await fetch(`http://localhost:3000/smartphone/${numId}/filetest`, {
  //                     method: 'PATCH',

  //                     body: blobPayload
  //                 }).then(response => {
  //                     if (response.ok) {
  //                         console.log('se realizo la subida o actualización del archivo - PATCH');

  //                     } else {
  //                         console.log('No se realizo accion de subida o descarga archivo - PATCH');

  //                     }
  //                 }).catch(error => {
  //                     console.log('fallo la conexion con el servidor -PATCH', error);

  //                 }

  //                 )

  //             }

  //             console.log(' el nombre de los archivos son igules');

  //         }

  //         if (newPage != 'ok') {
  //             let payload = {
  //                 id: datos.id,
  //                 picture: datos.picture,
  //                 title: datos.title,
  //                 from: datos.from,
  //                 offer1: datos.offer1,
  //                 offer2: datos.offer2,
  //                 current: datos.current,

  //             }

  //             await fetch(`http://localhost:3000/smartphone/${numId}`, {
  //                 method: 'PATCH',
  //                 headers: {
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(payload)
  //             }).then(response => {
  //                 if (response.ok) {
  //                     console.log('la URL tiene el acceso - PATCH');

  //                 } else {
  //                     console.log('No se puede conectar a la URL - PATCH');

  //                 }
  //             }).catch(error => {
  //                 console.log('fallo la conexion con el servidor -PATCH', error);

  //             }

  //             )

  //         }

  //         // datos.picture = `http://localhost:3000/public/img/03-mix/${datos.file.name}`
  //         // setDatos(datos)
  //         // console.log('datos recien enviados', datos.picture);

  //         // const blobPayload = new FormData();
  //         // blobPayload.append('file', datos.file)
  //         // blobPayload.append('picture', datos.picture)

  //         // await fetch(`http://localhost:3000/smartphone/${numId}/filetest`, {
  //         //     method: 'PATCH',

  //         //     body: blobPayload
  //         // }).then(response => {
  //         //     if (response.ok) {
  //         //         console.log('se realizo la subida o actualización del archivo - PATCH');

  //         //     } else {
  //         //         console.log('No se realizo accion de subida o descarga archivo - PATCH');

  //         //     }
  //         // }).catch(error => {
  //         //     console.log('fallo la conexion con el servidor -PATCH', error);

  //         // }

  //         // )

  //     }
  // }

  //*nuevo dato

  // useEffect(() => {

  //     async function fetchData() {

  //         if (datos2) {
  //             const res = await fetch(`http://localhost:3000/smartphone/${numId}`);
  //             const data = await res.json();
  //             // arrSmart.push(...data)

  //             console.log("datos segundo", datos2);
  //             setDatos2(true)
  //             setDatos({ ...data[0], id: numId })

  //         }

  //     }

  //     fetchData();

  // }, [datos2, numId])

  const handleDetalles = (e: any) => {
    e.preventDefault();
    const newUrl = new URLSearchParams(searchSmart.toString());

    //*previamente ya tenia un id
    // newUrl.set("id", `${datos.id}`);

    // const arrPathSet = pathSet.split("/");

    route.push(`/crud/dt` + "?" + newUrl.toString());
  };

  return (
    <>
      {/* {datos ? datos[0].picture : <h1>no hay nada</h1>} */}
      <div className="flex  justify-center text-2xl">
        Actualizar los datos de la tabla smartphone{" "}
      </div>
      <form
        onSubmit={handleSmart}
        className="flex flex-col w-full    items-center gap-2 "
      >
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%] ">
          <label htmlFor="id">Id:</label>
          <input
            className="w-[88%] border-gray-500 border-2 border-dashed  h-[40px] max-sm:w-[80%]"
            type="text"
            name="id"
            id="id"
            value={datos.id}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, id: e.target.value })}
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="picture">Picture:</label>
          <input
            className="w-[88%] border-gray-500 border-2   h-[40px] max-sm:w-[80%]"
            type="text"
            name="picture"
            id="picture"
            value={datos.picture}
            required
            autoComplete="off"
            onChange={
              (e) => {
                setDatos({ ...datos, picture: e.target.value });
              }

              // `http://localhost:3000/public/img/03-mix/${datos.file.name}`
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="title">Title:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="title"
            id="title"
            value={datos.title}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, title: e.target.value })}
          />
        </div>
        <div className="flex w-2/4 items-center justify-end max-sm:w-[90%]">
          <input
            className="w-[88%] max-sm:w-[80%] "
            type="file"
            name="fileSmartphone"
            id="fileSmartphone"
            onChange={(e) => {
              if (!e.target.files) return;
              setDatos({ ...datos, file: e.target.files[0], estado: true });

              console.log("dato actual", e.target.files[0].name);

              setNewPage("ok");
            }}
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="from">from:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="from"
            id="from"
            value={datos.from}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, from: e.target.value })}
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="offer1">Offer1:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="offer1"
            id="offer1"
            value={datos.offer1}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, offer1: e.target.value })}
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="offer2">Offer2:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="offer2"
            id="offer2"
            value={datos.offer2}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, offer2: e.target.value })}
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="current">Current:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="current"
            id="current"
            value={datos.current}
            required
            autoComplete="off"
            onChange={(e) => setDatos({ ...datos, current: e.target.value })}
          />
        </div>

        <div className="flex  gap-2 w-1/3 max-sm:w-[90%] ">
          <div className="flex w-full  my-2  justify-center   cursor-pointer  h-[40px]  max-sm:w-[80%]  ">
            <input
              type="submit"
              className=" w-full min-w-[60px] text-white bg-red-500 cursor-pointer "
              value="Enviar"
            />
          </div>
          <div className="flex w-full  my-2   justify-center   cursor-pointer  h-[40px]    max-sm:w-[80%]  ">
            <input
              type="button"
              className=" w-full  text-back bg-yellow-500 cursor-pointer"
              onClick={(e) => {
                handleDetalles(e);
              }}
              value="Agregar Detalle"
            />
          </div>
          <div className=" my-2 w-full justify-center   cursor-pointer h-[40px]  max-sm:w-[80%] ">
            <input
              type="button"
              className=" w-full h-[40px] min-w-[60px] text-white bg-red-500 cursor-pointer "
              onClick={() => route.back()}
              value="Volver"
            />
          </div>
        </div>
      </form>
      {/* <button onClick={handleClick}> dar</button> */}
    </>
  );
}
