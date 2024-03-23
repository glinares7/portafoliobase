import React, { useEffect, useState } from "react"
import { useRef } from 'react';
import ReactPlayer from 'react-player';


import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import path from "path";
interface Props {
    id: number
    picture: string
    title: string
    from: string
    offer1: any
    offer2: number
    current: any


}



const ListSmartphoneRp: React.FC<Props> = ({ id, picture, title, from, offer1, offer2, current }) => {



    const parseData = useRef<HTMLParagraphElement | null>(null);


    const [discover, setdiscover]: any = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch(`${picture}`, {

                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },

            });

            if (response.ok) {
                // Si la respuesta es exitosa, obtener el cuerpo de la imagen como un blob
                const imageBlob = await response.blob();

                // Convertir el blob en una URL de objeto
                const imageURLObject = URL.createObjectURL(imageBlob);

                // Pasar la URL de la imagen como prop

                setdiscover(imageURLObject)
                // return {
                //     props: { imageURL: imageURLObject },
                // };
            } else {
                throw new Error('Error al obtener la imagen');
            }
        })()
    }, [picture])





    useEffect(() => {
        if (parseData.current) {

            const idValue = parseData.current;

            // const div = document.createElement('div');
            // div.innerHTML = title

            // const parsedContent = div.innerHTML;
            // idValue.innerHTML = parsedContent;
            idValue.innerHTML = title;
        }
    })


    const searchIdSmart = useSearchParams()
    const router = useRouter();

    const handleUd = (dt: string, id: string) => {
        const params = new URLSearchParams(searchIdSmart.toString())

        params.set('id', id)
        router.push(`/crud/${dt}` + '?' + params.toString())
    }


    // console.log('picture de este elemento', picture);
    // const pictureConvert = picture.split('/')
    // const picture1 = pictureConvert.at(-2)
    // const picture2 = pictureConvert.at(-1)

    // //* ruta del tunnel localhost:5000
    // const newPicture = `https://nest-online-build.onrender.com/public/img/${picture1}/${picture2}`


    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_200px_50px] border-purple-700 border-2">
            <div className="flex justify-center pt-3 ">
                {(picture.includes('.webp') || picture.includes('.jpeg') || picture.includes('.png')) ||
                    picture.includes('.jpg') ||
                    picture.includes('.svg') ? <Image
                    className="w-auto h-auto px-9 "
                    src={picture}
                    width="250"
                    height="300"
                    alt="Picture of the author"
                /> : ''}
                {(picture.includes('.mp4') || picture.includes('.mp3')) ? <video src={discover} controls>{title}</video> : ''}
                {/* {(picture.includes('.mp4') || picture.includes('.mp3')) ? <ReactPlayer url={newPicture} controls={true}>{title}</ReactPlayer> : ''} */}
            </div>
            <div className="px-2 py-2  ">

                <div className="w-full  h-12 text-1xl font-bold   ">
                    {/* <p className=" text-ellipsis overflow-hidden whitespace-pre	">{title} </p> */}
                    <p ref={parseData} className="  line-clamp-2" ></p>
                </div>

                <p className="text-base">{from}</p>
                {offer1 ? <p className="text-sm">S/{offer1} un</p> : <p className="h-5">{""}</p>}
                <p className="text-2xl font-bold text-red-500">S/{offer2} un</p>
                {current ? <p className="text-2xl font-bold text-blue-500">S/{current} un</p> : <p className="h-8">{""}</p>}

            </div  >
            <div className="w-full flex justify-center items-start" >
                <input
                    type="button"
                    onClick={() => handleUd('aw', `${id}`)}
                    className="w-4/5 font-bold text-white h-10 bg-red-600 rounded-3xl cursor-pointer"
                    value="ACTUALIZAR"
                />
            </div>
            <div className="w-full flex justify-center items-start pb-2" >
                <input
                    type="button"
                    onClick={() => handleUd('az', `${id}`)}
                    className="w-4/5 font-bold text-white h-10 bg-red-600 rounded-3xl cursor-pointer"
                    value="ELIMINAR"
                />
            </div>

        </div >

    )
}

export default ListSmartphoneRp