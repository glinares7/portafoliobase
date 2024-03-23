"use client";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ListSmartphone from "./components/list-smartphone";
import data from "./db/data.json";
import Paginacion from "./components/paginacion";
import Paginacion2 from "./components/paginacion2";
import smartphoneApp from "./hooks/smartphone-App";
import { UseContext } from "./contexts/authContext";

// import cron from "node-cron";

// import axios from "axios";

export default function Page() {
  // <div className="grid grid-cols-[250px,1fr] justify-center	border-purple-700 border-2 py-7  px-5 w-11/12">

  const { smartphoneGet, server, smartphoneGetPagination } = smartphoneApp();

  const [idx, setIdx] = useState(0);
  const [smart, setSmart]: any = useState([]);
  const [smartPagination, setSmartPagination]: any = useState([]);
  const [display, setDisplay]: any = useState(false);
  const raiz: any = useContext(UseContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search: any = searchParams.get("page");

  const itemGroup = 12;
  const currentSelected = idx;

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
      setIdx(search - 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search])
  }, [search]);

  // useEffect(() => {

  //   (async () => {
  //     // const smartphoneGet = await fetch('http://localhost:3000/smartphone')
  //     // const dataSmartGet = await smartphoneGet.json()

  //     const dataSmartGet = await smartphoneGet()

  //     setSmart(dataSmartGet)

  //   })()

  // }, [search, smartphoneGet])

  useEffect(() => {
    (async () => {
      const dataSmartGetPagination = await smartphoneGetPagination(idx);

      setSmartPagination(dataSmartGetPagination);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);
  // }, [idx, smartphoneGetPagination])

  // console.log("valores", smart.map((item: any) => item.picture));

  const newPagination = data.filter((item, indice) => {
    const totalGroup = Math.floor(indice / itemGroup);
    return totalGroup === currentSelected;
  });
  const newPagination2 = smart.filter((item: any, indice: number) => {
    const totalGroup = Math.floor(indice / itemGroup);
    return totalGroup === currentSelected;
  });

  const cadena = [];

  const enumPaginas = Math.ceil(data.length / itemGroup);

  for (let i = 1; i <= enumPaginas; i++) {
    cadena.push(i);
  }

  const enumPaginas2 = Math.ceil(smart.length / itemGroup);
  const cadena2 = Array.from({ length: enumPaginas2 }, (_v, i) => i + 1);

  // console.log("cadena2", cadena2);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    //* eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  );

  const handlePaginacion = (pa: string, ge: string) => {
    router.push(pathname + "?" + createQueryString(pa, ge));
  };

  const handleSection = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };

  return (
    <>
      <main>
        <div className="flex flex-col  items-center ">
          <div className="flex item-center w-11/12  border-green-500 border-2 max-sm:flex-col  ">
            {/* <div className="grid grid-cols-[250px,1fr]   justify-center	  w-11/12  "> */}

            <div className=" flex  flex-col justify-start   border-red-700 border-2  w-1/3 max-sm:w-full">
              <button
                onClick={handleSection}
                className=" pr-3 py-3 hidden cursor-pointer  max-sm:block max-sm:flex max-sm:justify-end max-sm:transition max-sm:duration-300 max-sm:ease-linear   "
              >
                {display ? (
                  <svg
                    x-show="open"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    x-show="!open"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              <div
                className={
                  display
                    ? " block max-sm:ransition-transform max-sm:duration-300  max-sm:linear  max-sm:h-[400px] overflow-hidden  "
                    : "  block max-sm:ransition-transform max-sm:duration-300 max-sm:linear max-sm:h-[0px] overflow-hidden	"
                }
              >
                <ul
                  className={`flex flex-col items-center justify-center w-full`}
                >
                  <li className="py-3 w-11/12  ">
                    <a href="#">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rem excepturi blanditiis, aperiam quibusdam, esse expedita
                      en ab nosbis vel numquam laborum quam assumenda. Itaque
                      adipisci veniam, vitae similique possimus sed.
                    </a>
                    {raiz.authState ? (
                      <h1>valor true 1</h1>
                    ) : (
                      <h1>valor false 2</h1>
                    )}{" "}
                  </li>
                  <li className="py-3 ">
                    <a href="#">Smartphone</a>
                  </li>
                  <li className="py-3 ">
                    <a href="#">Tv</a>
                  </li>
                  <li className="py-3 ">
                    <a href="#">Computo</a>
                  </li>
                  <li className="py-3 ">
                    <a href="#">Impresora</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3  grid-rows-[repeat(3,1fr)]  w-full h-full max-sm:grid-cols-2	">
              {/* {
                  newPagination.map((item, i) => (

                    <ListSmartphone key={i} picture={item.picture} title={item.title} from={item.from} offer1={item.offer1} offer2={item.offer2} current={item.current} />

                  ))

                } */}
              {smartPagination.map((item: any, i: number) => (
                <ListSmartphone
                  key={i}
                  id={item.id}
                  picture={item.picture}
                  title={item.title}
                  from={item.from}
                  offer1={item.offer1}
                  offer2={item.offer2}
                  current={item.current}
                />
              ))}
            </div>

            {/* </div> */}
          </div>

          <div className="flex  items-center justify-end  my-3 col-span-2 w-11/12 ">
            <h1 className="flex justify-center  text-lg mr-3">
              Estás en la pagina
            </h1>

            <div className="flex gap-x-2  flex justify-end items-center text-sm underline border-green-500 border-2">
              {/* {
                  cadena.map((item, i) => (

                    <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                      className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                    >{item}</button>

                  ))


                } */}
              {/* {
                cadena2.map((item, i) => (

                  <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                    className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
                  >{item}</button>

                ))


              } */}

              {/* <button onClick={() => handlePaginacion("page", "2")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">2</button>
                <button onClick={() => handlePaginacion("page", "3")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">3</button>
                <button onClick={() => handlePaginacion("page", "4")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">4</button>
                <button onClick={() => handlePaginacion("page", "5")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">...</button>
                <button onClick={() => handlePaginacion("page", "6")} className="flex justify-center  items-center   text-sm underline w-9 h-8 hover:bg-black hover:text-white">6</button> */}
            </div>
          </div>

          <div className="flex justify-end col-span-2 gap-x-2  py-3 border-blue-800 border-2 w-11/12">
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

          <div className=" border-blue-800 border-2 w-11/12">
            <h1 className="text-2xl">imprimir los datos</h1>
            <h1 className="text-sm">imprimir los datos</h1>
          </div>

          <div className=" grid  grid-cols-4 border-blue-800 border-2 w-11/12">
            <h1 className="col-span-2 text-2xl border-blue-800 border-2">
              imprimir los datos
            </h1>
            <h1 className="text-sm border-blue-800 border-2">
              imprimir los datos
            </h1>
            <h1 className="text-3xl border-blue-800 border-2">
              imprimir los datos
            </h1>
          </div>

          <div className="col-span-2 text-2xl border-blue-800 border-2 w-11/12">
            todos estan aqui {search && <h1>{search}</h1>}
          </div>

          {/* {
              smart.map((item: any, i: number) => (

                <button className="col-span-2 text-2xl border-blue-800 border-2" key={i}
                >{item.offer1}</button>

              ))


            } */}
        </div>
      </main>
    </>
  );
}

// ESTILOS CSS BASE

// flex min-h-screen flex-col items-center justify-between p-24

// <h1 className="text-3xl font-bold underline">hello word</h1>
