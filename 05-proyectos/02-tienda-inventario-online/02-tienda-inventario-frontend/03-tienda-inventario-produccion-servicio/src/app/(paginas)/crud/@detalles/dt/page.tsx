"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";
import smartphoneFetch from "../../hooks/smartphone-fetch";
import detallesFetch from "../../hooks/detalles-fetch";

// import { useRouter } from "next/navigation"

interface Props {}

type typeSmart = {
  ancho: string;
  largo: string;
  garantia: string;
  modelo: string;
  color: string;
  pantalla: string;
  memoriaram: string;
  memoriainterna: string;
  descripcion: string;
  file: any;
};

const Page: React.FC<Props> = () => {
  const router = useRouter();
  const searchSmart = useSearchParams();
  const getIdSmartphone: any = searchSmart.get("id");
  // const server = 'https://p9jbwwh0-3000.brs.devtunnels.ms'
  // const server = 'https://nest-online-build.onrender.com'
  const { smartphonePostFile, smartphonePost, smartphoneGetOne, server } =
    smartphoneFetch();

  const { detalleSmartphonePost, detalleSmartphonePatch } = detallesFetch();
  const [formData, setFormData] = useState<typeSmart>({
    ancho: "0",
    largo: "0",
    garantia: "",
    modelo: "",
    color: "",
    pantalla: "0",
    memoriaram: "0",
    memoriainterna: "0",
    descripcion: "",
    file: "",
  });

  useEffect(() => {
    async function fetchDetalleSmart() {
      const data = await smartphoneGetOne(getIdSmartphone);

      // console.log("data-server-dt", data[0]);

      const detalleSmart = data[0].detallesmartphone;

      if (detalleSmart) {
        const { id, ...resto } = detalleSmart;
        setFormData(resto);
      }
    }

    fetchDetalleSmart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [getIdSmartphone]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevenir la recarga de la página

    console.log("test dato file", formData.file);
    console.log("test dato ancho", formData.ancho);

    //*archivos en memoria del navegador
    // const payload = new FormData();
    // payload.append("file", formData.file);

    try {
      //*almacenar archivo en el servidor y mostrar el nombre
      // const resDataServer = await smartphonePostFile(payload);

      const payloadDetallesSmartphone = {
        ancho: formData.ancho,
        largo: formData.largo,
        garantia: formData.garantia,
        modelo: formData.modelo,
        color: formData.color,
        pantalla: formData.pantalla,
        memoriaram: formData.memoriaram,
        memoriainterna: formData.memoriainterna,
        descripcion: formData.descripcion,
        // picture: `${server}/public/img/03-mix/` + resDataServer.randPicture,
      };

      console.log("paylo", payloadDetallesSmartphone);

      //*guardado de los datos en el servidor
      // await smartphonePost(payloadFile);

      const data = await smartphoneGetOne(getIdSmartphone);

      // console.log("data-submit-dt", data);

      const detalleSmart = data[0].detallesmartphone;

      try {
        if (!detalleSmart) {
          const resDataDetalles = await detalleSmartphonePost(
            getIdSmartphone,
            payloadDetallesSmartphone
          );

          console.log("del server detalles - POST", resDataDetalles);
        }

        if (detalleSmart) {
          const resDetallesPatch = await detalleSmartphonePatch(
            detalleSmart.id,
            payloadDetallesSmartphone
          );

          console.log("del server detalles - PATH", resDetallesPatch);
        }
      } catch (error) {
        console.log("error de salida servidor", error);
      }

      // const resDataDetalles = await detalleSmartphonePost(
      //   getIdSmartphone,
      //   payloadDetallesSmartphone
      // );

      // console.log("del server detalles", resDataDetalles);

      // setFormData({
      //   ancho: "0",
      //   largo: "0",
      //   garantia: "",
      //   modelo: "",
      //   color: "",
      //   file: "",
      // });

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
      console.error("Error al enviar el formulario - POST", error);
    }
  };

  const handleFile = async () => {
    console.log("test dato", formData.file);
    console.log("test dato picture", formData.ancho);
    const payload = new FormData();
    payload.append("file", formData.file);

    try {
      await smartphonePostFile(payload);

      setFormData({
        ancho: "0",
        largo: "0",
        garantia: "",
        modelo: "",
        color: "",
        pantalla: "0",
        memoriaram: "0",
        memoriainterna: "0",
        descripcion: "",
        file: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <>
      <div className="flex  justify-center text-2xl max-sm:text-center">
        Agregar/Actualizar detalles del producto{" "}
      </div>
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
          <label htmlFor="title">Ancho:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="title"
            value={formData.ancho}
            id="title"
            placeholder="ancho"
            required
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, ancho: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="from">largo:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="from"
            id="from"
            value={formData.largo}
            placeholder="largo"
            required
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, largo: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="offer1">Garantia:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="offer1"
            id="offer1"
            placeholder="garantia"
            value={formData.garantia}
            required
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, garantia: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="offer2">Modelo:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="offer2"
            id="offer2"
            value={formData.modelo}
            placeholder="modelo"
            required
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, modelo: e.target.value })
            }
          />
        </div>

        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="current">Color:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="current"
            id="current"
            placeholder="color"
            value={formData.color}
            autoComplete="off"
            required
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="current">Pantalla:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="pantalla"
            id="pantalla"
            placeholder="pantalla"
            value={formData.pantalla}
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, pantalla: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="current">M.Ram:</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="memoriaram"
            id="memoriaram"
            placeholder="memoriaram"
            value={formData.memoriaram}
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, memoriaram: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="current"> M.Inter</label>
          <input
            className="w-[88%] border-gray-500 border-2 h-[40px] max-sm:w-[80%]"
            type="text"
            name="memoriainterna"
            id="memoriainterna"
            placeholder="memoriainterna"
            value={formData.memoriainterna}
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, memoriainterna: e.target.value })
            }
          />
        </div>
        <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
          <label htmlFor="descripcion">Reseña:</label>

          <textarea
            className="w-[88%] border-gray-500 border-2 h-[120px] max-sm:w-[80%]"
            name="descripcion"
            id="descripcion"
            placeholder="Reseña"
            defaultValue={formData.descripcion}
            autoComplete="off"
            required
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
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
              setFormData({ ...formData, file: e.target.files[0] });
            }}
          />
        </div>
        <div className="flex w-1/3  gap-2 border-gray-500 border-2 max-sm:w-[90%]">
          <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
            <input
              type="submit"
              className=" w-full text-white bg-red-500 cursor-pointer"
              value="Enviar"
            />
          </div>
          <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
            <input
              type="button"
              className=" w-full text-white bg-red-500 cursor-pointer"
              onClick={() => router.back()}
              value="Volver"
            />
          </div>
          {/* <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
                        <input type="button" className=" w-full text-white bg-red-500 cursor-pointer" onClick={handleFile} value="FIle" />
                    </div> */}
        </div>
      </form>
    </>
  );
};

export default Page;

// anidar useSearch params
// searchParams.set('parametro1', 'valor1');
// searchParams.set('parametro2', 'valor2');
// searchParams.set('parametro3', 'valor3');

// router.push({ search: searchParams.toString() });
