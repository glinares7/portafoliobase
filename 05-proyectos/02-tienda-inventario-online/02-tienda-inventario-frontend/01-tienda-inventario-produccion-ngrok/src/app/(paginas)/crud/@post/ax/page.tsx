'use client'

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import smartphoneFetch from "../../hooks/smartphone-fetch";

// import { useRouter } from "next/navigation"


interface Props {

}

type typeSmart = {
    picture: string;
    title: string;
    from: string;
    offer1: string;
    offer2: string;
    current: string;
    file: any;
}

const Page: React.FC<Props> = () => {

    const router = useRouter()
    // const searchSmart = useSearchParams()
    // const server = 'https://p9jbwwh0-3000.brs.devtunnels.ms'
    // const server = 'https://nest-online-build.onrender.com'
    const { smartphonePostFile, smartphonePost, server } = smartphoneFetch();
    const [formData, setFormData] = useState<typeSmart>({
        picture: '',
        title: '',
        from: '',
        offer1: '0',
        offer2: '',
        current: '0',
        file: ''
    });

    // useEffect(() => {

    //     if (searchSmart) {
    //         const pictureSmart = searchSmart.get('picture')
    //         const titleSmart = searchSmart.get('title')
    //         const fileSmartphoneSmart = searchSmart.get('fileSmartphone')
    //         const fromSmart = searchSmart.get('from')
    //         const offer1Smart = searchSmart.get('offer1')
    //         const offer2Smart = searchSmart.get('offer2')
    //         const currentSmart = searchSmart.get('current')


    //         if (pictureSmart) {
    //             const bodySmartPhone = {
    //                 picture: pictureSmart,
    //                 title: titleSmart,
    //                 from: fromSmart,
    //                 offer1: offer1Smart,
    //                 offer2: offer2Smart,
    //                 current: currentSmart

    //             }

    //             fetch('http://localhost:3000/smartphone', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(bodySmartPhone)
    //             }).then(response => {
    //                 if (response.ok) {
    //                     console.log('la URL tiene el acceso - POST');

    //                 } else {
    //                     console.log('No se puede conectar a la URL - POST');

    //                 }
    //             }).catch(error => {
    //                 console.log('fallo la conexion con el servidor - POST', error);

    //             }

    //             )




    //             // .then((response) => response.json())
    //             // .then((data) => {
    //             //   console.log(data);

    //             //   uriTitulo = data.titulo;
    //             // });   


    //             // .then((response) => {
    //             //     if (response.ok) {
    //             //       console.log("La URL tiene acceso válido");
    //             //       // Realizar acciones adicionales si la URL es válida
    //             //     } else {
    //             //       console.log("La URL tiene acceso denegado");
    //             //       // Mostrar un mensaje o realizar acciones adicionales si la URL tiene acceso denegado
    //             //     }
    //             //   })
    //             //   .catch((error) => {
    //             //     console.log("Ocurrió un error al acceder a la URL", error);
    //             //     // Mostrar un mensaje o realizar acciones adicionales en caso de error
    //             //   });


    //             // .catch((error) => {
    //             //     console.error("Error al descargar el archivo:", error);
    //             //   });


    //         }
    //     }
    // }, [searchSmart])




    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevenir la recarga de la página

        console.log("test dato", formData.file);
        console.log("test dato picture", formData.picture);
        const payload = new FormData();
        payload.append('file', formData.file)

        try {




            // const dataPictureServer = await fetch('http://localhost:3000/smartphone/file', {
            //     method: 'POST',
            //     // headers: {
            //     //     // 'Content-Type': 'multipart/form-data;'
            //     // },
            //     body: payload,

            // })

            // const resDataServer = await dataPictureServer.json()


            const resDataServer = await smartphonePostFile(payload);

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
            const payloadFile = {
                picture: `${server}/public/img/03-mix/` + resDataServer.randPicture,
                title: formData.title,
                from: formData.from,
                offer1: formData.offer1,
                offer2: formData.offer2,
                current: formData.current,
            }



            // await fetch('http://localhost:3000/smartphone', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(payloadFile)
            // }).then(response => {
            //     if (response.ok) {
            //         console.log('la URL tiene el acceso - POST');



            //     } else {
            //         console.log('No se puede conectar a la URL - POST');

            //     }
            // }).catch(error => {
            //     console.log('fallo la conexion con el servidor - POST', error);
            // })



            await smartphonePost(payloadFile)

            setFormData({
                picture: '',
                title: '',
                from: '',
                offer1: '0',
                offer2: '',
                current: '0',
                file: ''
            })

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
            console.error('Error al enviar el formulario:', error);
        }
    };






    // const handlePass = () => {
    //     if (searchSmart) {
    //         const pictureSmart = searchSmart.get('picture')
    //         const titleSmart = searchSmart.get('title')
    //         const fileSmartphoneSmart = searchSmart.get('fileSmartphone')
    //         const fromSmart = searchSmart.get('from')
    //         const offer1Smart = searchSmart.get('offer1')
    //         const offer2Smart = searchSmart.get('offer2')
    //         const currentSmart = searchSmart.get('current')


    //         if (pictureSmart) {
    //             const bodySmartPhone = {
    //                 picture: pictureSmart,
    //                 title: titleSmart,
    //                 from: fromSmart,
    //                 offer1: offer1Smart,
    //                 offer2: offer2Smart,
    //                 current: currentSmart

    //             }

    //             fetch('http://localhost:3000/smartphone', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(bodySmartPhone)
    //             }).then(response => {
    //                 if (response.ok) {
    //                     console.log('la URL tiene el acceso - POST');

    //                 } else {
    //                     console.log('No se puede conectar a la URL - POST');

    //                 }
    //             }).catch(error => {
    //                 console.log('fallo la conexion con el servidor - POST', error);

    //             }

    //             )




    //             // .then((response) => response.json())
    //             // .then((data) => {
    //             //   console.log(data);

    //             //   uriTitulo = data.titulo;
    //             // });   


    //             // .then((response) => {
    //             //     if (response.ok) {
    //             //       console.log("La URL tiene acceso válido");
    //             //       // Realizar acciones adicionales si la URL es válida
    //             //     } else {
    //             //       console.log("La URL tiene acceso denegado");
    //             //       // Mostrar un mensaje o realizar acciones adicionales si la URL tiene acceso denegado
    //             //     }
    //             //   })
    //             //   .catch((error) => {
    //             //     console.log("Ocurrió un error al acceder a la URL", error);
    //             //     // Mostrar un mensaje o realizar acciones adicionales en caso de error
    //             //   });


    //             // .catch((error) => {
    //             //     console.error("Error al descargar el archivo:", error);
    //             //   });


    //         }
    //     }

    // }


    // const handleClick = (e: any) => {

    //     let dataSmart = []

    //     for (let i = 0; i < 7; i++) {
    //         dataSmart.push(e.target.parentElement.parentElement[i].value);

    //     }

    //     const objSmart = {
    //         picture: dataSmart[0],
    //         title: dataSmart[1],
    //         fileSmart: dataSmart[2],
    //         from: dataSmart[3],
    //         offer1: dataSmart[4],
    //         offer2: dataSmart[5],
    //         current: dataSmart[6]

    //     }


    //     return console.log(objSmart['picture']);

    //     for (let i = 0; i < 7; i++) {
    //         e.target.parentElement.parentElement[i].value = "";

    //     }


    // }
    const handleFile = async () => {
        console.log("test dato", formData.file);
        console.log("test dato picture", formData.picture);
        const payload = new FormData();
        payload.append('file', formData.file)


        try {

            // fetch('http://localhost:3000/smartphone/file', {
            //     method: 'POST',
            //     // headers: {
            //     //     // 'Content-Type': 'multipart/form-data;'
            //     // },
            //     body: payload,

            // }).then(response => {
            //     if (response.ok) {
            //         console.log('Se envio el archivo - POST');


            //     } else {
            //         console.log('No se envio el archivo - POST');

            //     }
            // }).catch(error => {
            //     console.log('fallo la conexion con el servidor - POST', error);
            // })


            await smartphonePostFile(payload)

            setFormData({
                picture: '',
                title: '',
                from: '',
                offer1: '0',
                offer2: '',
                current: '0',
                file: ''
            })

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }


    }
    return (
        <>
            <div className="flex  justify-center text-2xl">Insertar datos a la tabla smartphone </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full    items-center gap-2 " encType="multipart/form-data" >
                {/* <div className="flex w-2/4 items-center justify-between" >
                    <label htmlFor="picture">Picture:</label>
                    <input className="w-[88%] border-gray-500 border-2 border-dashed  h-[40px]" type="text" name="picture" value={formData.picture} id="picture" placeholder="picture" required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, picture: e.target.value })
                    } />
                </div> */}
                <div className="flex w-2/4 items-center justify-between">
                    <label htmlFor="title">Title:</label>
                    <input className="w-[88%] border-gray-500 border-2 h-[40px]" type="text" name="title" value={formData.title} id="title" placeholder="title" required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    } />
                </div>
                <div className="flex w-2/4 items-center justify-end">
                    <input className="w-[88%] " type="file" name="fileSmartphone" id="fileSmartphone" required onChange={(e) => {
                        if (!e.target.files) return;
                        setFormData({ ...formData, file: e.target.files[0] })
                    }
                    } />

                </div>
                <div className="flex w-2/4 items-center justify-between">
                    <label htmlFor="from">from:</label>
                    <input className="w-[88%] border-gray-500 border-2 h-[40px]" type="text" name="from" id="from" value={formData.from} placeholder="from" required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, from: e.target.value })
                    } />
                </div>

                <div className="flex w-2/4 items-center justify-between">
                    <label htmlFor="offer1">Offer1:</label>
                    <input className="w-[88%] border-gray-500 border-2 h-[40px]" type="text" name="offer1" id="offer1" placeholder="offer1" value={formData.offer1} required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, offer1: e.target.value })
                    } />
                </div>
                <div className="flex w-2/4 items-center justify-between">
                    <label htmlFor="offer2">Offer2:</label>
                    <input className="w-[88%] border-gray-500 border-2 h-[40px]" type="text" name="offer2" id="offer2" value={formData.offer2} placeholder="offer2" required autoComplete="off" onChange={(e) =>
                        setFormData({ ...formData, offer2: e.target.value })
                    } />
                </div>

                <div className="flex w-2/4 items-center justify-between">
                    <label htmlFor="current">Current:</label>
                    <input className="w-[88%] border-gray-500 border-2 h-[40px]" type="text" name="current" id="current" placeholder="current" value={formData.current} autoComplete="off" required onChange={(e) =>
                        setFormData({ ...formData, current: e.target.value })
                    } />
                </div>

                <div className="flex w-1/3  gap-2 border-gray-500 border-2">
                    <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
                        <input type="submit" className=" w-full text-white bg-red-500 cursor-pointer" value="Enviar" />
                    </div>
                    <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
                        <input type="button" className=" w-full text-white bg-red-500 cursor-pointer" onClick={() => router.back()} value="Volver" />
                    </div>
                    <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
                        <input type="button" className=" w-full text-white bg-red-500 cursor-pointer" onClick={handleFile} value="FIle" />
                    </div>
                </div>
            </form>
        </>
    )
}



export default Page;


// anidar useSearch params
// searchParams.set('parametro1', 'valor1');
// searchParams.set('parametro2', 'valor2');
// searchParams.set('parametro3', 'valor3');

// router.push({ search: searchParams.toString() });