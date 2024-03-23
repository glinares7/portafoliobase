'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import smartphoneFetch from "../../hooks/smartphone-fetch";

type TypeDel = {
    id: string

}
export default function Page() {


    const { smartphoneGetOne, smartphoneDeleteFile, smartphoneDelete } = smartphoneFetch();
    const searchDelete = useSearchParams()
    const idSearch = searchDelete.get('id') || 108


    const [delId, setDelId] = useState<TypeDel>({
        id: `${idSearch}`,

    })

    const router = useRouter()



    // useEffect(() => {

    //     if (searchDelete) {


    //         const delId = searchDelete.get('id')

    //         if (delId) {

    //             const payload = {
    //                 id: delId
    //             }


    //             fetch(`http://localhost:3000/smartphone/${delId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(payload)
    //             })
    //                 .then(res => {
    //                     if (res.ok) {
    //                         console.log('La url es valida');
    //                     } else {
    //                         console.log('la url fallo ');

    //                     }
    //                 }).catch(error => {
    //                     console.log('error al conectarse al servidor', error);

    //                 });



    //         }

    //     }

    // }, [searchDelete])


    const handleDeleteSmart = async (e: { preventDefault: any; }) => {

        e.preventDefault();
        if (delId.id) {

            // const getDatSnart = await fetch(`http://localhost:3000/smartphone/${delId.id}`)

            // const resSmart = await getDatSnart.json();


            const resSmart = await smartphoneGetOne(delId.id)

            const pathPicture = resSmart[0].picture


            const payload = {
                id: delId.id,
                picture: pathPicture
            }


            // await fetch(`http://localhost:3000/smartphone/${delId.id}/file`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(payload)
            // })
            //     .then(res => {
            //         if (res.ok) {
            //             console.log('La url es valida - DELETE');

            //         } else {
            //             console.log('la url fallo - DELETE ');

            //         }
            //     }).catch(error => {
            //         console.log('error al conectarse al servidor - DELETE', error);

            //     });


            await smartphoneDeleteFile(delId.id, payload)

            setDelId({ id: '' })

            //*codigo base fetch delete
            // await fetch(`http://localhost:3000/smartphone/${delId.id}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(delId)
            // })
            //     .then(res => {
            //         if (res.ok) {
            //             console.log('La url es valida - DELETE');

            //         } else {
            //             console.log('la url fallo - DELETE ');

            //         }
            //     }).catch(error => {
            //         console.log('error al conectarse al servidor - DELETE', error);

            //     });


            await smartphoneDelete(delId.id, delId)
            setDelId({ id: '' })



        }





    }





    return (
        <>
            <div className="flex  justify-center text-2xl">Eliminar los datos de la tabla smartphone </div>
            <form onSubmit={handleDeleteSmart}
                className="flex flex-col w-full    items-center gap-2 " >
                <div className="flex w-2/4 items-center justify-between max-sm:w-[90%]">
                    <label htmlFor="id">Id:</label>
                    <input className="w-[88%] border-gray-500 border-2 border-dashed  h-[40px] max-sm:w-[80%]" type="text" name="id" value={delId.id} id="id" placeholder="Id" required autoComplete="off" onChange={(e) => setDelId({ ...delId, id: e.target.value })} />
                </div>


                <div className="flex  gap-2 w-1/3 max-sm:w-[90%]">
                    <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px] max-sm:w-[80%]">
                        <input type="submit" className=" w-full text-white bg-red-500 cursor-pointer" value="Enviar" />
                    </div>
                    <div className="flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px] max-sm:w-[80%]">
                        <input type="button" className=" w-full text-white bg-red-500 cursor-pointer" onClick={() => router.back()} value="Volver" />
                    </div>
                </div>
            </form>
        </>
    )
}