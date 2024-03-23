import React, { useEffect } from "react"
import { useRef } from 'react';


import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
interface Props {
    id: number
    picture: string
    title: string
    from: string
    offer1: any
    offer2: number
    current: any


}



const ListSmartphone: React.FC<Props> = ({ id, picture, title, from, offer1, offer2, current }) => {


    const search = useSearchParams()
    const parseData = useRef<HTMLParagraphElement | null>(null);


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

    const router = useRouter();

    const handleId = (name: string, id: string) => {
        const params = new URLSearchParams(search.toString())

        params.set(name, id)
        router.push('/perfil' + '?' + params.toString())
    }

    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_200px_50px] border-purple-700 border-2">
            <div className="flex justify-center pt-3 ">
                {(picture.includes('.webp') || picture.includes('.jpeg') || picture.includes('.png')) || picture.includes('.jpg') ||
                    picture.includes('.svg') ? <Image
                    className="w-auto h-auto px-9 "
                    src={picture}
                    width="250"
                    height="300"
                    alt="Picture of the author"
                /> : ''}
                {(picture.includes('.mp4') || picture.includes('.mp3')) ? <video src={picture} controls>{title}</video> : ''}
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
                    onClick={() => handleId('id', `${id}`)}
                    className="w-4/5 font-bold text-white h-10 bg-red-600 rounded-3xl cursor-pointer "
                    value="AGREGAR"
                />
            </div>

        </div >

    )
}

export default ListSmartphone