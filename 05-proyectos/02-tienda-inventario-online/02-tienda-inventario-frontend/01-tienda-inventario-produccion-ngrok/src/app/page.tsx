"use client"
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


import ListSmartphone from "./components/list-smartphone";
import data from "./db/data.json"
import Paginacion from "./components/paginacion";
import Paginacion2 from "./components/paginacion2";
import smartphoneApp from "./hooks/smartphone-App";


// import cron from "node-cron";

// import axios from "axios";


export default function Page() {
  // <div className="grid grid-cols-[250px,1fr] justify-center	border-purple-700 border-2 py-7  px-5 w-11/12">


  const { smartphoneGet, server } = smartphoneApp()

  const [idx, setIdx] = useState(0)
  const [smart, setSmart]: any = useState([])

  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const search: any = searchParams.get('page')

  const itemGroup = 12
  const currentSelected = idx


  // cron.schedule('*/6 * * * *', () => {
  //   axios.get(`${server}/ping`)
  //     .then(response => {
  //       console.log('Ping exitoso a Render:', response.status);
  //     })
  //     .catch(error => {
  //       console.error('Error en el ping a Render:', error.message);
  //     });
  // });



  useEffect(() => {

    if (search) {
      setIdx(search - 1)


    }



  }, [search])


  useEffect(() => {

    (async () => {
      // const smartphoneGet = await fetch('http://localhost:3000/smartphone')
      // const dataSmartGet = await smartphoneGet.json()

      const dataSmartGet = await smartphoneGet()

      setSmart(dataSmartGet)
    })()

  }, [search, smartphoneGet])


  // console.log("valores", smart.map((item: any) => item.picture));



  const newPagination = data.filter((item, indice) => {

    const totalGroup = Math.floor(indice / itemGroup)
    return totalGroup === currentSelected

  })
  const newPagination2 = smart.filter((item: any, indice: number) => {

    const totalGroup = Math.floor(indice / itemGroup)
    return totalGroup === currentSelected

  })




  const cadena = []

  const enumPaginas = Math.ceil(data.length / itemGroup)

  for (let i = 1; i <= enumPaginas; i++) {
    cadena.push(i)

  }

  const enumPaginas2 = Math.ceil(smart.length / itemGroup)
  const cadena2 = Array.from({ length: enumPaginas2 }, (_v, i) => i + 1)

  // console.log("cadena2", cadena2);



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

              {/* {
                newPagination.map((item, i) => (

                  <ListSmartphone key={i} picture={item.picture} title={item.title} from={item.from} offer1={item.offer1} offer2={item.offer2} current={item.current} />

                ))

              } */}
              {
                newPagination2.map((item: any, i: number) => (

                  <ListSmartphone key={i} id={item.id} picture={item.picture} title={item.title} from={item.from} offer1={item.offer1} offer2={item.offer2} current={item.current} />

                ))

              }



            </div>


            <div className="flex  items-center justify-end my-3 col-span-2 ">
              <h1 className="w-full flex justify-center  text-lg mr-3">Estás en la pagina</h1>

              <div className="flex gap-x-2  flex justify-end items-center text-sm underline border-red-700 border-2 ">



                {/* {
                  cadena.map((item, i) => (

                    <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                      className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                    >{item}</button>

                  ))


                } */}
                {
                  cadena2.map((item, i) => (

                    <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                      className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                    >{item}</button>

                  ))


                }





                {/* <button onClick={() => handlePaginacion("page", "2")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">2</button>
                <button onClick={() => handlePaginacion("page", "3")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">3</button>
                <button onClick={() => handlePaginacion("page", "4")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">4</button>
                <button onClick={() => handlePaginacion("page", "5")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">...</button>
                <button onClick={() => handlePaginacion("page", "6")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">6</button> */}
              </div>
            </div>



            <div className="flex justify-end col-span-2 gap-x-2  py-3 border-blue-800 border-2">


              {
                // cadena.map((item, i) => (

                // <Paginacion />
                <Paginacion2 />



                // <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                //   className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                // >{item}</button>

                // ))


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

            {/* {
              smart.map((item: any, i: number) => (

                <button className="col-span-2 text-2xl border-blue-800 border-2" key={i}
                >{item.offer1}</button>

              ))


            } */}

          </div>





        </div>


      </main>


    </>
  );
}

// ESTILOS CSS BASE

// flex min-h-screen flex-col items-center justify-between p-24

// <h1 className="text-3xl font-bold underline">hello word</h1>
