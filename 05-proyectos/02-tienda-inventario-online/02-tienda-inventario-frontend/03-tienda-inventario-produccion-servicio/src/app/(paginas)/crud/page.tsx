'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
    const router = useRouter()

    // const [smart, setSmart]: any = useState([])

    // useEffect(() => {

    //     fetch('http://localhost:3000/smartphone').then(response => response.json()).then(data => setSmart(data))

    // }, [])


    // console.log(smart);



    return (
        <>
            <h1>Segmentar el componente de prueva para los metodos  get post put delete</h1>
            <button type="button" onClick={() => router.back()}>
                volver
            </button>
            <br />
            <Link href="/">inicio</Link>
            <div className=' flex  flex-row justify-around  text-center border-blue-500 border-2  '>
                <div className='border-red-500 border-2 cursor-pointer w-[10%] py-2 '>GET</div>
                <div className='border-red-500 border-2 cursor-pointer w-[10%]  py-2'>POST</div>
                <div className='border-red-500 border-2 cursor-pointer w-[10%] py-2'>PUT</div>
                <div className='border-red-500 border-2 cursor-pointer w-[10%] py-2'>DELETE</div>
            </div>



            {/* {
                smart.map((item: any, i: number) => (

                    <h1 className='text-1xl' key={i}>{item.title}</h1>

                ))
            } */}

        </>
    )
}