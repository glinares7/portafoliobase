"use client";

import { UseContext } from "@/app/contexts/authContext";
import smartphoneApp from "@/app/hooks/smartphone-App";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useContext, useEffect } from "react";
import { useRef } from "react";

import { useState } from "react";
import carritoPedido from "./hooks/carrito-Pedido";

// export default function Page() {
//   return(
//     <>
//        <div>¡Bienvenido a mi perfil!</div>
//        <Link href="/">volver</Link>
//        </>
//    );
//   }

type postSessionCarrito = {
  id: string;
  total: string;
  sessioncarrito: string;
};

const Page: React.FC = () => {
  const dynamicParagRef = useRef<HTMLParagraphElement | null>(null);
  const titleSmartRef = useRef<HTMLParagraphElement | null>(null);

  const params = useSearchParams();
  const router = useRouter();

  const { server, smartphoneGetOne } = smartphoneApp();

  const {
    postCarritoCompraReq,
    getCarritoCompraReq,
    updateCarritoCompraReq,
    postPedidoReq,
    deletePedidosList,
    deleteCarritoCompraReq,
  } = carritoPedido();

  const [dataGet, setDataGet]: any = useState({});

  const [cargaImg, setCargaImg] = useState(false);

  const [especificaciones, setEspecificaciones] = useState(true);
  const [descripcion, setDescripcion] = useState(false);

  // const [sessionExitsEstado, setSessionExitsEstado] = useState(true);

  const [sesionGlobalVerify, setSesionGlobalVerify] = useState("");

  const { userAuth }: any = useContext(UseContext);

  const getIdSmart = params.get("id") || 1;

  useEffect(() => {
    (async () => {
      const smartGetOneRes = await smartphoneGetOne(getIdSmart);

      const newData = smartGetOneRes[0].title.replace("<br/>", "");
      smartGetOneRes[0].title = newData;

      setDataGet(smartGetOneRes[0]);

      setSesionGlobalVerify(`${localStorage.getItem("sessioncarrito")}`);

      setCargaImg(true);
    })();

    //*reemplazar datos
    // if (dynamicParagRef.current) {
    //   const idValue = dynamicParagRef.current;
    //   const secondLine = idValue.innerHTML.split(".")[1];

    //   const newElement = ` continuara Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quibusdam veniam consequatur, quo nesciunt quasi quas  <br/> corrupti architecto consequuntur consectetur neque veritatis magnam eligendi ducimus excepturi sunt sed dolorem alias.
    //    laceat illum?`;
    //   idValue.innerHTML = idValue.innerHTML.replace(secondLine, newElement);

    //   // idValue.innerHTML += newElement;
    // } else {
    //   console.log("El elemento es nulo");
    // }

    //   function adjustSecondLineSize() {
    //   const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("width"));
    //   const newSize = fontSize * 2; // Ajusta el tamaño como desees
    //   idValue.innerHTML = idValue.innerHTML.replace(secondLine, `todo achorado`);
    // }

    //   // `<small className="bg-red-500">${secondLine}</small>
    //   // adjustSecondLineSize();

    //   window.addEventListener("resize", adjustSecondLineSize);
    // }, [getIdSmart, smartphoneGetOne]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getIdSmart]);

  //* paginación legacy

  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);

  // const data = Array.from({ length: 1200 }, (_, index) => index + 1); // Datos simulados.

  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const pageRange = 3; // Cantidad de páginas a mostrar alrededor de la página actual.

  // const getPageNumbers = () => {
  //   if (currentPage <= pageRange + 1) {
  //     return Array.from({ length: Math.min(pageRange * 2 + 1, totalPages) }, (_, index) => index + 1);
  //   }
  //   if (currentPage >= totalPages - pageRange) {
  //     return Array.from({ length: pageRange * 2 + 1 }, (_, index) => totalPages - pageRange * 2 + index);
  //   }
  //   return Array.from({ length: pageRange * 2 + 1 }, (_, index) => currentPage - pageRange + index);
  // };

  // const renderPage = (page: number) => {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pageData = data.slice(startIndex, endIndex);

  //   return (
  //     <div>
  //       {pageData.map(item => (
  //         <div key={item}>Item {item}</div>
  //       ))}
  //     </div>
  //   );
  // };

  // const renderPagination = () => (
  //   <div>

  //     {currentPage > 1 && (
  //       <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
  //     )}
  //     {currentPage > pageRange + 1 && (
  //       <button onClick={() => setCurrentPage(1)}>1</button>
  //     )}
  //     {currentPage > pageRange + 2 && (
  //       <span>...</span>
  //     )}

  //     {getPageNumbers().map(page => (
  //       <button
  //         key={page}
  //         onClick={() => setCurrentPage(page)}
  //         style={{
  //           margin: '0px 3px',
  //           padding: '0px 5px',
  //           fontWeight: currentPage === page ? 'bold' : 'normal',
  //           backgroundColor: currentPage === page ? "black" : "transparent",
  //           color: currentPage === page ? "white" : "black"
  //         }}
  //       >
  //         {page}
  //       </button>
  //     ))}
  //     {currentPage < totalPages - pageRange && (
  //       <span>...</span>
  //     )}

  //     {currentPage < totalPages - pageRange && (
  //       <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
  //     )}
  //     {currentPage < totalPages && (
  //       <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
  //     )}
  //   </div>
  // );

  useEffect(() => {
    (async () => {
      const smartGetOneRes = await smartphoneGetOne(getIdSmart);
      console.log("que hay de nuevo ", smartGetOneRes[0]);
    })();
    console.log(" la vida es mejor", userAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCarritoCompra = async () => {
    const sesionCarritoCompra = localStorage.getItem("sessioncarrito");

    if (!sesionCarritoCompra) {
      const resCarritoCompra = await postCarritoCompraReq();
      console.log("sessionCarritoCompraPost", resCarritoCompra);

      localStorage.setItem("sessioncarrito", resCarritoCompra.sessioncarrito);

      localStorage.setItem("localcarritobase", resCarritoCompra.sessioncarrito);
      setSesionGlobalVerify(resCarritoCompra.sessioncarrito);
      // newSessionGlobal = `${resCarritoCompra.sessioncarrito}`;
      // setSessionExitsEstado(true);

      //* agrega al pedido

      const getSessionCompra = localStorage.getItem("sessioncarrito");

      const resGetCarritoCompra = await getCarritoCompraReq(getSessionCompra);
      // console.log(
      //   "datos des server session getOne jueves 04",
      //   resGetCarritoCompra.id
      // );

      const resGetIdCarritoCompra = resGetCarritoCompra.id;

      const payloadCarrito = {
        cantidad: 1,
      };

      const resPostPedido = await postPedidoReq(
        resGetIdCarritoCompra,
        getIdSmart,
        payloadCarrito
      );

      console.log("resPedidosYa", resPostPedido);
      console.log("se crea y agrega");

      //*actualizar total carritoCompra

      const resGetNewCarritoCompra = await getCarritoCompraReq(
        getSessionCompra
      );
      console.log("datos desde server session getOne", resGetNewCarritoCompra);

      const dataResCarritoTotal = resGetNewCarritoCompra.pedidos.map(
        (item: { subtotal: any }) => {
          return Number(item.subtotal);
        }
      );

      let sumaListCarritoUpdate = dataResCarritoTotal.reduce(
        (total: any, num: any) => total + num,
        0
      );

      console.log("arr-carrito", dataResCarritoTotal);
      console.log("arr-carrito suma", sumaListCarritoUpdate.toFixed(2));

      const payloadCarritoCompraUpdate = {
        total: sumaListCarritoUpdate.toFixed(2),
      };

      const resUpdateCarritoCompra = await updateCarritoCompraReq(
        resGetNewCarritoCompra.id,
        payloadCarritoCompraUpdate
      );

      console.log("se actualizo el total carrito", resUpdateCarritoCompra);
    } else {
      // console.log("log data", sessionExitsEstado);

      console.log("sesion a verificar 1", sesionGlobalVerify);

      const sesionCarritoCompraBase = localStorage.getItem("localcarritobase");
      const sesionCarritoCompra = localStorage.getItem("sessioncarrito");

      const resCarritoBaseOut = await getCarritoCompraReq(
        sesionCarritoCompraBase
      );

      if (resCarritoBaseOut.msg === "sesion no encontrada") {
        const resPt = await getCarritoCompraReq(sesionCarritoCompra);

        resPt.pedidos.map(async (item: { id: number }) => {
          await deletePedidosList(item.id);
        });

        setTimeout(async () => {
          await deleteCarritoCompraReq(resPt.id);
          console.log("SE ELIMINAN LAS SESIONES OUT", sesionCarritoCompra);
          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
        }, 3000);
        return console.log("se elimino la sesion carrito-out");
      }
      // console.log("dame el valor out", resCarritoBaseOut);
      // console.log("dame el valor 1", sesionCarritoCompraBase);
      // console.log("dame el valor 2", sesionCarritoCompra);

      // if (!sessionExitsEstado) {

      //     console.log("se manupulo el estado");

      //     localStorage.removeItem("sessioncarrito");
      //     localStorage.removeItem("localcarritobase");
      //     return console.log("SE ELIMINAN  LAS SESIONES");

      // }

      // if (sessionExitsEstado) {
      //*cuando existe la session cariito

      // const getSessionCompra = localStorage.getItem("sessioncarrito");

      // newSessionGlobal = getSessionCompra;
      // setSessionExits(`${getSessionCompra}`);

      const resGetCarritoCompra = await getCarritoCompraReq(
        sesionCarritoCompra
      );

      // console.log("datos des server session getOne", resGetCarritoCompra[0].id);

      //*condicion de la session

      console.log(
        "resultados de la solicitud semi-completa",
        resGetCarritoCompra
      );

      if (resGetCarritoCompra.msg === "sesion no encontrada") {
        console.log("recopilado", sesionCarritoCompraBase);

        const resGetCarritoCompra = await getCarritoCompraReq(
          sesionCarritoCompraBase
        );

        if (resGetCarritoCompra.pedidos) {
          resGetCarritoCompra.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            // const resPedidosDel = await fetch(
            //   `${server}/pedidos/${item.id}`,
            //   {
            //     method: "DELETE",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );

            // await resPedidosDel.json();

            await deletePedidosList(item.id);
          });
          console.log("se elimino la LISTA DE PEDIDOS");
        }
        //  //*eliminando el carrito compra
        // console.log("id de CARRITO DE COMPRAS", resGetCarritoCompra.id);

        setTimeout(async () => {
          await deleteCarritoCompraReq(resGetCarritoCompra.id);

          console.log("ELIMINANDO LA SESION", sesionGlobalVerify);
          // setSessionExitsEstado(false);
          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
        }, 3000);
        return console.log("eliminar carrito existente ");
      }

      // console.log("dato de pedidos", resGetCarritoCompra.pedidos.length);

      //*verificar que me trae el servidor al enviar la sesion
      const resGetIdCarritoCompra = resGetCarritoCompra.id;

      const payloadCarrito = {
        cantidad: 1,
      };

      const resPostPedido = await postPedidoReq(
        resGetIdCarritoCompra,
        getIdSmart,
        payloadCarrito
      );

      console.log("se actualiza");
      console.log("resPedidosYa +++", resPostPedido);

      //*actualizar total carritoCompra - session-existe server

      const resGetNewCarritoCompra = await getCarritoCompraReq(
        sesionCarritoCompra
      );
      console.log("datos des server session getOne", resGetNewCarritoCompra);

      const dataResCarritoTotal = resGetNewCarritoCompra.pedidos.map(
        (item: { subtotal: any }) => {
          return Number(item.subtotal);
        }
      );

      let sumaListCarrito = dataResCarritoTotal.reduce(
        (total: any, num: any) => total + num,
        0
      );
      console.log("arr-carrito - session exite", dataResCarritoTotal);
      console.log(
        "arr suma list-carrito - session exite",
        sumaListCarrito.toFixed(2)
      );

      const payloadCarritoCompraUpdate = {
        total: sumaListCarrito.toFixed(2),
      };

      const resUpdateCarritoCompra = await updateCarritoCompraReq(
        resGetNewCarritoCompra.id,
        payloadCarritoCompraUpdate
      );

      console.log(
        "se actualizo el total carrito - sesion existe",
        resUpdateCarritoCompra
      );

      // console.log("log data", sessionExitsEstado);
      // }
    }
  };

  return (
    <>
      {/*  {//*Reeemplazar datos} */}
      {/* <div className=" p-4 w-full border-gray-500 border-2">
        <p
          ref={dynamicParagRef}
          id="dynamicparag"
          className="w-full line-clamp-2"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum
          dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit
          Fugiat praesentium delectus nam eaque quis animi at, totam v
        </p>
      </div> */}

      {/* paginación legacy */}
      {/* <div className="px-5">
        <h1>Paginación</h1>
        {renderPage(currentPage)}
        {renderPagination()}
      </div> */}
      {/* <br /> */}

      <div className="flex  my-3 mx-5 max-sm:flex-col">
        <div className="flex flex-col justify-center w-[40%] border-red-500 border-2  max-sm:w-full">
          <div className="flex justify-center  ">
            {cargaImg &&
              (dataGet.picture.includes(".webp") ||
                dataGet.picture.includes(".jpeg") ||
                dataGet.picture.includes(".png") ||
                dataGet.picture.includes(".jpg") ||
                dataGet.picture.includes(".svg")) && (
                <Image
                  // onClick={handleResizeImg}
                  src={dataGet.picture}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Picture of the author2"
                  className="w-[270px] h-[300px]"
                />
              )}

            {(cargaImg && dataGet.picture.includes(".mp4")) ||
            (cargaImg && dataGet.picture.includes(".mp3")) ? (
              <div className="w-[270px] h-[300px]">
                <video
                  className="w-full h-full object-cover"
                  src={dataGet.picture}
                  controls
                >
                  {dataGet.title}
                </video>
              </div>
            ) : (
              ""
            )}
          </div>

          {cargaImg && (
            <div>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
              nemo. Delectus, consectetur? Maiores, accusamus. Neque veniam
              ratione quia ipsam voluptates ea assumenda omnis officiis. Aliquam
              asperiores ipsam corrupti ab vitae.
            </div>
          )}
        </div>

        <div className="w-full border-red-500 border-2 pt-8">
          {cargaImg && (
            <div ref={titleSmartRef} className="text-1xl">
              {dataGet.title}
            </div>
          )}
          {cargaImg && (
            <div className="flex max-sm:flex-col">
              <div className="flex flex-col w-full ">
                <div className="flex flex-col  w-full pt-6">
                  {dataGet.offer1 != 0 && (
                    <div className="flex border-red-500 border-2  ">
                      {
                        <div className="w-1/3 max-sm:w-1/2">
                          Precio de lista:{" "}
                        </div>
                      }
                      {
                        <div className="w-2/3 max-sm:w-1/2">
                          {" "}
                          $/.{dataGet.offer1}
                        </div>
                      }
                    </div>
                  )}

                  {dataGet.offer2 != 0 && (
                    <div className="flex  border-red-500 border-2 ">
                      <div className="w-1/3 max-sm:w-1/2">Precio Online: </div>
                      <div className="w-2/3 max-sm:w-1/2">
                        {" "}
                        $/.{dataGet.offer2}
                      </div>
                    </div>
                  )}

                  {dataGet.current != 0 && (
                    <div className="flex border-red-500 border-2  ">
                      <div className="w-1/3 max-sm:w-1/2">Tarjeta:</div>
                      <div className="w-2/3 max-sm:w-1/2">
                        $/.{dataGet.current}
                      </div>
                    </div>
                  )}
                </div>
                {dataGet.detallesmartphone ? (
                  <div className=" border-red-500 border-2 pt-6 ">
                    <h2 className="text-1xl">Caracteristicas Destacadas</h2>
                    {dataGet.detallesmartphone.pantalla != 0 && (
                      <h3 className="text-lg">
                        Pantalla : {dataGet.detallesmartphone.pantalla}
                        {'"'}
                      </h3>
                    )}

                    {dataGet.detallesmartphone.memoriaram != 0 && (
                      <h3 className="text-lg">
                        Memoria Ram : {dataGet.detallesmartphone.memoriaram} GB
                      </h3>
                    )}
                    {dataGet.detallesmartphone.memoriainterna != 0 && (
                      <h3 className="text-lg">
                        Memoria Interna :{" "}
                        {dataGet.detallesmartphone.memoriainterna} GB
                      </h3>
                    )}
                  </div>
                ) : (
                  <p></p>
                )}
                <div className="flex w-full my-2  justify-center   cursor-pointer h-[40px]">
                  <input
                    className=" w-[20%] min-w-[100px] text-white bg-red-500 cursor-pointer max-sm:w-[30%]"
                    onClick={handleCarritoCompra}
                    type="button"
                    value="Agregar"
                  />
                </div>
              </div>
              <div className="w-full border-red-500 border-2 px-3 py-2">
                <p>
                  Vendido y despachado por :
                  <br />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
                  dignissimos cupiditate accusantium possimus aspernatur
                  incidunt eveniet dolorum vitae alias consequatur quam, est
                  ipsa numquam, obcaecati deserunt recusandae quasi dolores
                  optio. Est, ipsam autem laboriosam ducimus, sint totam placeat
                  dolorem quo delectus optio officia ut, sequi eaque sapiente
                  necessitatibus velit. Ut magni ratione, nisi cum aut odit
                  error ipsam id numquam?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex  flex-col my-3 mx-5 border-blue-500 border-2">
        <div className="w-full flex justify-center  ">
          <h1 className="text-2xl w-[90%] flex justify-center border-orange-500 border-2 py-2">
            Información Adicional
          </h1>
        </div>
        <div className="w-full flex  justify-center  ">
          <div
            className={`w-[20%] flex justify-center  py-1  max-sm:w-full cursor-pointer ${
              especificaciones ? "border-b-4 border-red-500" : "border-b-4"
            } `}
            onClick={() => {
              setDescripcion(false);
              setEspecificaciones(true);
              console.log("especificaciones");
            }}
          >
            <div className="text-lg ">Especificaciones</div>
          </div>
          <div
            className={`w-[20%] flex justify-center   py-1 max-sm:w-full cursor-pointer ${
              descripcion ? "border-b-4 border-red-500" : "border-b-4"
            }  `}
            onClick={() => {
              setDescripcion(true);
              setEspecificaciones(false);
              console.log("descripcion");
            }}
          >
            <div className="text-lg ">Descripción</div>
          </div>
        </div>
        {dataGet.detallesmartphone && especificaciones && (
          <div className="w-full flex flex-col justify-center  py-2 px-1 ">
            <div className="flex w-full justify-center ">
              <div className="w-[40%] flex justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">Largo</h1>
              </div>

              <div className="w-[40%] flex  justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">{dataGet.detallesmartphone.largo}</h1>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <div className="w-[40%] flex justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">Ancho</h1>
              </div>

              <div className="w-[40%] flex  justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">{dataGet.detallesmartphone.ancho}</h1>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <div className="w-[40%] flex justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">Garantia</h1>
              </div>

              <div className="w-[40%] flex  justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">
                  {dataGet.detallesmartphone.garantia}
                </h1>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <div className="w-[40%] flex justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">Modelo</h1>
              </div>

              <div className="w-[40%] flex  justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">{dataGet.detallesmartphone.modelo}</h1>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <div className="w-[40%] flex justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">Color</h1>
              </div>

              <div className="w-[40%] flex  justify-start   border-gray-300 border-b-2 max-sm:w-full py-1">
                <h1 className="text-lg ">{dataGet.detallesmartphone.color}</h1>
              </div>
            </div>
          </div>
        )}
        {dataGet.detallesmartphone && descripcion && (
          <div className="w-full flex justify-center py-2 px-1 ">
            <div className="w-[80%] flex flex-col justify-start  max-sm:w-full py-1">
              <h1 className="text-lg ">
                {dataGet.detallesmartphone.descripcion}
              </h1>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center w-full my-2 px-5    cursor-pointer h-[40px]">
        <div className="w-full  flex justify-start    ">
          <button
            className=" w-[12%] max-w-[100px]  text-white bg-red-500 cursor-pointer max-sm:w-[30%] max-sm:max-w-[100px]"
            onClick={() => router.back()}
          >
            volver
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;

//*orimer borrador

// import { useEffect, useRef, useState } from 'react';

// const ParagraphComponent: React.FC = () => {
//   const dynamicParagraphRef = useRef<HTMLParagraphElement>(null);
//   const [secondLine, setSecondLine] = useState<string>('');

//   useEffect(() => {
//     const dynamicParagraph = dynamicParagraphRef.current;
//     const initialContent = dynamicParagraph.innerHTML;
//     const secondLineContent = initialContent.split("<br>")[1];

//     setSecondLine(secondLineContent);

//     function adjustSecondLineSize() {
//       const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("font-size"));
//       const newSize = fontSize * 0.7; // Ajusta el tamaño como desees
//       setSecondLine(`<span style="font-size: ${newSize}px">${secondLineContent}</span>`);
//     }

//     adjustSecondLineSize();

//     window.addEventListener("resize", adjustSecondLineSize);
//   }, []);

//   return (
//     <div className="container mx-auto p-4 max-w-screen-md border border-gray-300">
//       <p ref={dynamicParagraphRef} className="resize-text text-base max-w-full overflow-hidden overflow-ellipsis" dangerouslySetInnerHTML={{ __html: `Este es un ejemplo de un párrafo más largo que se mostrará en dos líneas ...<br />${secondLine}` }} />
//     </div>
//   );
// };

// export default ParagraphComponent;

//*segundo borrador

// 'use client'

// import Link from "next/link";
// import { useEffect } from 'react';
// import { useRef } from 'react';

// import { useState } from 'react';
// import Image from "next/image";

// export default function Page() {
//   return(
//     <>
//        <div>¡Bienvenido a mi perfil!</div>
//        <Link href="/">volver</Link>
//        </>
//    );
//   }

// const Page: React.FC = () => {
//   const dynamicParagRef = useRef<HTMLParagraphElement | null>(null);

//   useEffect(() => {

//     if (dynamicParagRef.current) {
//       const idValue = dynamicParagRef.current;
//       const secondLine = idValue.innerHTML.split(".")[1];

//       const newElement = ` continuara Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quibusdam veniam consequatur, quo nesciunt quasi quas  <br/> corrupti architecto consequuntur consectetur neque veritatis magnam eligendi ducimus excepturi sunt sed dolorem alias.
//        laceat illum?`;
//       idValue.innerHTML = idValue.innerHTML.replace(secondLine, newElement);

//       // idValue.innerHTML += newElement;

//     } else {
//       console.log('El elemento es nulo');
//     }

//     //   function adjustSecondLineSize() {
//     //   const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("width"));
//     //   const newSize = fontSize * 2; // Ajusta el tamaño como desees
//     //   idValue.innerHTML = idValue.innerHTML.replace(secondLine, `todo achorado`);
//     // }

//     //   // `<small className="bg-red-500">${secondLine}</small>
//     //   // adjustSecondLineSize();

//     //   window.addEventListener("resize", adjustSecondLineSize);
//   }, []);

//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);

//   const data = Array.from({ length: 299 }, (_, index) => index + 1); // Datos simulados.

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const pageRange = 3; // Cantidad de páginas a mostrar alrededor de la página actual.

//   const getPageNumbers = () => {
//     let startPage = Math.max(currentPage - pageRange, 1);
//     let endPage = Math.min(currentPage + pageRange, totalPages);

//     // Asegurarse de que haya suficientes páginas antes y después de la página actual.
//     if (currentPage - startPage < pageRange) {
//       endPage = startPage + pageRange * 2;
//     }
//     if (endPage - currentPage < pageRange) {
//       startPage = endPage - pageRange * 2;
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
//   };

//   const renderPage = (page: number) => {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageData = data.slice(startIndex, endIndex);

//     return (
//       <div>
//         {pageData.map(item => (
//           <div key={item}>Item {item}</div>
//         ))}
//       </div>
//     );
//   };

//   const renderPagination = () => (
//     <div>
//       {currentPage > pageRange + 1 && (
//         <button onClick={() => setCurrentPage(1)}>Inicio</button>
//       )}
//       {getPageNumbers().map(page => (
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           style={{ margin: '5px' }}
//         >
//           {page}
//         </button>
//       ))}
//       {currentPage < totalPages - pageRange && (
//         <button onClick={() => setCurrentPage(totalPages)}>Fin</button>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <div className=" p-4 w-full border-gray-500 border-2">
//         <p ref={dynamicParagRef} id="dynamicparag" className="w-full line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit.  Lorem ipsum dolor sit amet consectetur adipisicing  elit Fugiat praesentium delectus nam eaque quis animi at, totam v</p>
//       </div>

//       <div>
//         <h1>Paginación</h1>
//         {renderPage(currentPage)}
//         {renderPagination()}
//       </div>

//     </>
//   );
// };

// export default Page;
