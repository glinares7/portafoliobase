"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ListSmartphoneRp from "../../components/list-smartphone-rp";
import PaginacionRp from "../../components/paginacion-Rp";
import smartphoneFetch from "../../hooks/smartphone-fetch";



export default function Page() {


    const { smartphoneGet } = smartphoneFetch();


    const [idx, setIdx] = useState(0)
    const [smart, setSmart]: any = useState([])

    const router = useRouter();
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const search: any = searchParams.get('page')

    const itemGroup = 12
    const currentSelected = idx

    useEffect(() => {

        if (search) {
            setIdx(search - 1)


        }

    }, [search])

    useEffect(() => {


        // // smartphoneGet
        // fetch('http://localhost:3000/smartphone').then(response => response.json()).then(data => {
        //     // console.log(data);

        // })
        // // setSmart(data)


        (async () => {
            setSmart(await smartphoneGet())
        })()


    }, [search, smartphoneGet])




    const newPagination2 = smart.filter((item: any, indice: number) => {

        const totalGroup = Math.floor(indice / itemGroup)
        return totalGroup === currentSelected

    })



    const enumPaginas2 = Math.ceil(smart.length / itemGroup)
    const cadena2 = Array.from({ length: enumPaginas2 }, (_v, i) => i + 1)

    //   console.log("cadena2", cadena2);


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)


            return params.toString()
        },
        //* eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams]
    )


    const handlePaginacion = (pa: string, ge: string) => {
        router.push(pathname + '?' + createQueryString(pa, ge))

    }


    return (
        <>
            <main>
                <h1 className="flex justify-center text-2xl">Extraccion de datos de tabla smartphone  </h1>
                <div className="flex justify-center " >
                    <div className="grid grid-cols-[250px,1fr]   justify-center	  w-11/12 ">
                        <div className="border-red-700 border-2 px-3 py-5">
                            <h1>barra lateral isquierda</h1>
                            <p>todo lo que se te ocurra</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint perferendis quidem voluptatum reiciendis? Explicabo perferendis cumque quo quod, atque, rem neque hic repellendus, non sequi corporis possimus necessitatibus magnam minus.
                                Natus sunt, recusandae molestiae neque, autem aliquid perspiciatis corporis omnis ab libero tenetur nam asperiores fugiat voluptatem maiores facere consectetur. Quas nihil adipisci officiis voluptates obcaecati, animi perspiciatis temporibus laudantium.
                                Sequi beatae ratione dicta dolore pariatur repudiandae corporis fuga perferendis harum eaque. Nam suscipit rem magni quis. Voluptatibus recusandae minus nulla tempora? Illo neque voluptatem odit culpa similique dignissimos laborum.
                                Nisi placeat voluptatibus quam, blanditiis laboriosam corporis enim sed molestiae possimus eligendi commodi soluta maiores tenetur maxime aliquam consectetur error sunt sequi unde nemo incidunt quasi quidem. Adipisci, saepe rem.
                                Itaque, earum repudiandae possimus maiores praesentium minima voluptas, omnis voluptatem asperiores nam, illo explicabo repellat perspiciatis. Pariatur nesciunt porro dolores quae commodi omnis, nulla incidunt qui dolore inventore officiis nobis!
                            </p>
                        </div>

                        <div className="h-full grid grid-cols-3  grid-rows-[repeat(3,1fr)]	">

                            {
                                newPagination2.map((item: any, i: number) => (

                                    <ListSmartphoneRp key={i} id={item.id} picture={item.picture} title={item.title} from={item.from} offer1={item.offer1} offer2={item.offer2} current={item.current} />

                                ))

                            }



                        </div>


                        <div className="flex  items-center justify-end my-3 col-span-2 ">
                            <h1 className="w-full flex justify-center  text-lg mr-3">Estás en la pagina</h1>

                            <div className="flex gap-x-2  flex justify-end items-center text-sm underline border-red-700 border-2 ">




                                {
                                    cadena2.map((item, i) => (

                                        <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                                            className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                                        >{item}</button>

                                    ))


                                }
                            </div>
                        </div>



                        <div className="flex justify-end col-span-2 gap-x-2  py-3 border-blue-800 border-2">


                            {
                                <PaginacionRp />

                            }



                        </div>

                        <div className=" border-blue-800 border-2">
                            <h1 className="text-2xl">imprimir los datos</h1>
                            <h1 className="text-sm">imprimir los datos</h1>
                        </div>

                        <div className=" grid  grid-cols-4 border-blue-800 border-2">
                            <h1 className="col-span-2 text-2xl border-blue-800 border-2">imprimir los datos</h1>
                            <h1 className="text-sm border-blue-800 border-2">imprimir los datos</h1>
                            <h1 className="text-3xl border-blue-800 border-2">imprimir los datos</h1>
                        </div>


                        <div className="col-span-2 text-2xl border-blue-800 border-2">todos estan aqui {search && <h1>{search}</h1>}</div>

                    </div>
                </div>
            </main>

        </>
    )
}