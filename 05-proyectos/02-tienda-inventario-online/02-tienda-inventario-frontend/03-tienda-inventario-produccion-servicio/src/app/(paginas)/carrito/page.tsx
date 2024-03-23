"use client";
import { useContext, useEffect, useState } from "react";
import carritoApp from "./hooks/carrito-App";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

type top = {
  id: number;
  total: number;
};

export default function Page() {
  const {
    server,
    getCarritoReq,
    getCarritoOneReq,
    updateCarritoCompra,
    deleteCarritoCompra,

    updatePedidosReq,
    deletePedidosReq,
  } = carritoApp();

  const router = useRouter();

  const [listaPedido, setListaPedido]: any = useState([]);
  const [lista, setLista] = useState<top>({
    id: 0,
    total: 0,
  });

  const [cargaImg, setCargaImg] = useState(false);

  const [cestaEmpty, setCestaEmpty] = useState(false);

  // const { refactorizar } = carritoValidation();

  // const refactorizar = async (
  //   localCarritoBaseP: any,
  //   localSessionCarrito: any
  // ) => {
  //   if (localCarritoBaseP) {
  //     const resCarritoPedidoP = await getCarritoReq(localCarritoBaseP);

  //     console.log("dato dado P", resCarritoPedidoP);

  //     if (resCarritoPedidoP.msg === "sesion no encontrada") {
  //       const resGetCarritoCompraK = await getCarritoReq(localSessionCarrito);

  //       console.log("seleccion de editores ", resGetCarritoCompraK);

  //       if (resGetCarritoCompraK.pedidos) {
  //         resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
  //           //*eliminando los pedidos de la sesion

  //           await deletePedidosReq(item.id);
  //         });
  //       }

  //       //  //*eliminando el carrito compra
  //       setTimeout(async () => {
  //         console.log("ELIMINAR CARRITO-COMPRA", localSessionCarrito);

  //         await deleteCarritoCompra(resGetCarritoCompraK.id);

  //         localStorage.removeItem("sessioncarrito");
  //         localStorage.removeItem("localcarritobase");
  //         setCargaImg(false);
  //         setCestaEmpty(true);
  //       }, 3000);

  //       return console.log(
  //         "eliminar localPedidos-existente - error en la peticion v2 - v2"
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    (async () => {
      const localSessionCarrito = localStorage.getItem("sessioncarrito");
      const localCarritoBaseP = localStorage.getItem("localcarritobase");

      if (localCarritoBaseP) {
        const resCarritoPedidoP = await getCarritoReq(localCarritoBaseP);

        console.log("dato dado P", resCarritoPedidoP);

        if (resCarritoPedidoP.msg === "sesion no encontrada") {
          const resGetCarritoCompraK = await getCarritoReq(localSessionCarrito);

          if (resGetCarritoCompraK.pedidos) {
            resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
              //*eliminando los pedidos de la sesion

              await deletePedidosReq(item.id);
            });
          }

          //  //*eliminando el carrito compra
          setTimeout(async () => {
            console.log("PEDIDO EXISTENTE", localSessionCarrito);

            await deleteCarritoCompra(resGetCarritoCompraK.id);

            localStorage.removeItem("sessioncarrito");
            localStorage.removeItem("localcarritobase");
            setCestaEmpty(true);
          }, 3000);

          return console.log(
            "eliminar localPedidos-existente - error en la peticion v2"
          );
        }
      }

      if (localSessionCarrito) {
        const resCarritoPedido = await getCarritoReq(localSessionCarrito);

        console.log("dato dado", resCarritoPedido);

        if (resCarritoPedido.pedidos) {
          setCargaImg(true);
          console.log(
            "los pedidos de esta cuenta cuales son",
            resCarritoPedido.pedidos
          );

          setLista(resCarritoPedido);
          setListaPedido(resCarritoPedido.pedidos);

          console.log(
            "hay  local pedido",
            resCarritoPedido.pedidos.sort(
              (a: { id: number }, b: { id: number }) => b.id - a.id
            )
          );
        } else {
          const resGetCarritoCompra = await getCarritoReq(localCarritoBaseP);

          if (resGetCarritoCompra.pedidos) {
            resGetCarritoCompra.pedidos.map(async (item: { id: any }) => {
              //*eliminando los pedidos de la sesion

              await deletePedidosReq(item.id);
            });
          }

          //  //*eliminando el carrito compra

          setTimeout(async () => {
            console.log("ELIMINAR CARRITO", localCarritoBaseP);

            await deleteCarritoCompra(resGetCarritoCompra.id);
            localStorage.removeItem("sessioncarrito");
            localStorage.removeItem("localcarritobase");
            setCestaEmpty(true);
          }, 3000);

          return console.log(
            "eliminar localPedidos-existente - error en la peticion v1"
          );
        }
      } else {
        setCargaImg(false);
        setCestaEmpty(true);
        return console.log("no hay lista-local-Pedido");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateMenos = async (key: any) => {
    //*si se cambia  el localCarrito

    const localSessionCarrito = localStorage.getItem("sessioncarrito");
    const localCarritoBaseP = localStorage.getItem("localcarritobase");

    if (localCarritoBaseP) {
      const resCarritoPedidoP = await getCarritoReq(localCarritoBaseP);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localSessionCarrito);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra
        setTimeout(async () => {
          console.log("ELIMINAR CARRITO-COMPRA", localSessionCarrito);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }

    if (localSessionCarrito) {
      const resCarritoPedidoP = await getCarritoReq(localSessionCarrito);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localCarritoBaseP);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra

        setTimeout(async () => {
          console.log("ELIMINAR EL CARRITO", localCarritoBaseP);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }

    //*fin de la transmision
    listaPedido[key].cantidad -= 1;

    const payloadMenos = {
      cantidad: listaPedido[key].cantidad,
    };

    const resMasUpdate = await updatePedidosReq(
      listaPedido[key].id,
      listaPedido[key].smartphone.id,
      payloadMenos
    );

    console.log("update cantidad menos", resMasUpdate);

    const localSessionCarritoReq = localStorage.getItem("sessioncarrito");

    const resCarritoPedidoReq = await getCarritoReq(localSessionCarritoReq);

    console.log("carrito req get- SABADO 06", resCarritoPedidoReq);

    setListaPedido(resCarritoPedidoReq.pedidos);

    // console.log("menos", listaPedido[key].cantidad);

    //*invocamos nuevamente a carrito para actualizar el total-carrito

    const getObjetoPedidoNewMenos = resCarritoPedidoReq.pedidos
      .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
      .map((item: { id: any; subtotal: any }) => Number(item.subtotal));

    console.log("traer los datos", getObjetoPedidoNewMenos);

    const newTotalMenos = getObjetoPedidoNewMenos.reduce(
      (total: any, numero: any) => total + numero
    );

    console.log("suma nueva total", newTotalMenos.toFixed(2));

    //* dato a agrear

    const payloadCarritoTotal = {
      total: newTotalMenos.toFixed(2),
    };

    console.log("lista actual- button", lista);

    const resCarritoTotalUpdate = await updateCarritoCompra(
      lista.id,
      payloadCarritoTotal
    );

    console.log("update total-carrito", resCarritoTotalUpdate);

    //*mostramos los nuevos valores en lista  y pedidos

    const resCarritoTotalGet = await getCarritoOneReq(lista.id);

    console.log("get carritoCompra - Origin Mas", resCarritoTotalGet);

    setLista(resCarritoTotalGet);

    // console.log("mas", listaPedido[key].cantidad);
  };

  const handleUpdateMas = async (key: any) => {
    //*si se cambia  el localCarrito

    const localSessionCarrito = localStorage.getItem("sessioncarrito");
    const localCarritoBaseP = localStorage.getItem("localcarritobase");

    if (localCarritoBaseP) {
      const resCarritoPedidoP = await getCarritoReq(localCarritoBaseP);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localSessionCarrito);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra
        setTimeout(async () => {
          console.log("ELIMINAR CARRITO-COMPRA", localSessionCarrito);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }

    if (localSessionCarrito) {
      const resCarritoPedidoP = await getCarritoReq(localSessionCarrito);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localCarritoBaseP);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra

        setTimeout(async () => {
          console.log("ELIMINAR EL CARRITO", localCarritoBaseP);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }

    //*fin de la transmision
    listaPedido[key].cantidad += 1;

    // setCantidadNew((postValor) => postValor + listaPedido);

    const payloadMas = {
      cantidad: listaPedido[key].cantidad,
    };

    const resMasUpdate = await updatePedidosReq(
      listaPedido[key].id,
      listaPedido[key].smartphone.id,
      payloadMas
    );

    console.log("update cantidad mas", resMasUpdate);

    const localSessionCarritoReq = localStorage.getItem("sessioncarrito");

    const resCarritoPedidoReq = await getCarritoReq(localSessionCarritoReq);

    // console.log("carrito req get", resCarritoPedidoReq);

    setListaPedido(resCarritoPedidoReq.pedidos);

    //*invocamos nuevamente a carrito para actualizar el total-carrito

    const getObjetoPedidoNewMas = resCarritoPedidoReq.pedidos
      .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
      .map((item: { id: any; subtotal: any }) => Number(item.subtotal));

    console.log("traer los datos", getObjetoPedidoNewMas);

    const newTotalMas = getObjetoPedidoNewMas.reduce(
      (total: any, numero: any) => total + numero
    );

    console.log("suma nueva total", newTotalMas.toFixed(2));

    //* dato a agrear

    const payloadCarritoTotal = {
      total: newTotalMas.toFixed(2),
    };

    console.log("lista actual- button", lista);

    const resCarritoTotalUpdate = await updateCarritoCompra(
      lista.id,
      payloadCarritoTotal
    );

    console.log("update total-carrito", resCarritoTotalUpdate);

    //*mostramos los nuevos valores en lista  y pedidos

    const resCarritoTotalGet = await getCarritoOneReq(lista.id);

    console.log("get carritoCompra - Origin Mas", resCarritoTotalGet);

    setLista(resCarritoTotalGet);

    // console.log("mas", listaPedido[key].cantidad);
  };

  const handleClearPedido = async (key: any) => {
    //*si se cambia  el localCarrito

    const localSessionCarrito = localStorage.getItem("sessioncarrito");
    const localCarritoBaseP = localStorage.getItem("localcarritobase");

    if (localCarritoBaseP) {
      const resCarritoPedidoP = await getCarritoReq(localCarritoBaseP);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localSessionCarrito);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra
        setTimeout(async () => {
          console.log("ELIMINAR CARRITO-COMPRA", localSessionCarrito);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }

    if (localSessionCarrito) {
      const resCarritoPedidoP = await getCarritoReq(localSessionCarrito);

      console.log("dato dado P", resCarritoPedidoP);

      if (resCarritoPedidoP.msg === "sesion no encontrada") {
        const resGetCarritoCompraK = await getCarritoReq(localCarritoBaseP);

        console.log("seleccion de editores ", resGetCarritoCompraK);

        if (resGetCarritoCompraK.pedidos) {
          resGetCarritoCompraK.pedidos.map(async (item: { id: any }) => {
            //*eliminando los pedidos de la sesion

            await deletePedidosReq(item.id);
          });
        }

        //  //*eliminando el carrito compra

        setTimeout(async () => {
          console.log("ELIMINAR EL CARRITO", localCarritoBaseP);

          await deleteCarritoCompra(resGetCarritoCompraK.id);

          localStorage.removeItem("sessioncarrito");
          localStorage.removeItem("localcarritobase");
          setCargaImg(false);
          setCestaEmpty(true);
        }, 3000);

        return console.log(
          "eliminar localPedidos-existente - error en la peticion v2 - v2"
        );
      }
    }
    // await refactorizar(localCarritoBaseP, localSessionCarrito);
    // await refactorizar(localSessionCarrito, localCarritoBaseP);
    //*fin de la transmision

    console.log("dato del fondo", key);

    const resDeletePedido = await deletePedidosReq(listaPedido[key].id);

    console.log("delete pedido", resDeletePedido);

    //*invocamos nuevamente a carrito

    const localSessionCarritoReq = localStorage.getItem("sessioncarrito");

    const resCarritoPedidoReq = await getCarritoReq(localSessionCarritoReq);

    const getObjetoPedidoNew = resCarritoPedidoReq.pedidos
      .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
      .map((item: { id: any; subtotal: any }) => Number(item.subtotal));

    console.log("traer los datos", getObjetoPedidoNew);

    //*verificar si hay elementos en lista

    if (getObjetoPedidoNew.length > 0) {
      const newSumaPedidos = getObjetoPedidoNew.reduce(
        (total: any, numero: any) => total + numero
      );

      console.log("suma nueva", newSumaPedidos.toFixed(2));

      //* actualizamos el costo total de carrito

      const payloadCarritoTotal = {
        total: newSumaPedidos.toFixed(2),
      };

      console.log("lista actual- button", lista);

      const resCarritoTotalUpdate = await updateCarritoCompra(
        lista.id,
        payloadCarritoTotal
      );

      console.log("update total-carrito", resCarritoTotalUpdate);

      //*mostramos los nuevos valores en lista  y pedidos

      const resCarritoTotalGet = await getCarritoOneReq(lista.id);

      console.log("get carritoCompra - Origin", resCarritoTotalGet);

      setLista(resCarritoTotalGet);
      setListaPedido(resCarritoTotalGet.pedidos);

      console.log("longitud de la muestra", resCarritoTotalGet.pedidos.length);
    }

    if (getObjetoPedidoNew.length === 0) {
      //*eliminar carrito de compra origin

      const resCarritoTotalDelete = await deleteCarritoCompra(lista.id);

      console.log("delete-carrito-global", resCarritoTotalDelete);

      //*mostrar carrito de compra final vacio

      const resCarritoTotalGet = await getCarritoOneReq(lista.id);

      console.log("get carritoCompra - Origin", resCarritoTotalGet);

      if (resCarritoTotalGet.msg === "carrito-compra  no encontrada") {
        // setCestaEmpty(true);
        setCargaImg(true);
        setLista({
          id: 0,
          total: 0,
        });
        setListaPedido([]);
        console.log("longitud de la muestra", 0);
      }

      localStorage.removeItem("sessioncarrito");
      localStorage.removeItem("localcarritobase");
    }
  };
  return (
    <>
      {cargaImg && (
        <>
          <div className="flex items-center w-full h-[50px] pl-3 border-red-500 border-2">
            <h1 className="text-2xl">Lista de los pedidos </h1>
          </div>

          <div className="w-full flex justify-evenly  border-red-500 border-2   max-md:flex-col max-md:items-center max-md:w-full max-lg:justify-between ">
            <div className="w-[45%] grid grid-cols-[130px_1fr_120px_100px_120px]   w-[55%]  border-red-500 border-2 pb-2  max-md:px-1  max-md:grid-cols-[130px_1fr_1fr_1fr_1fr] max-sm:w-full max-md:w-[60%] max-lg:w-[75%] max-xl:w-[60%] ">
              <div className="col-span-1   py-2 border-red-500 border-2 max-md:hidden">
                Producto
              </div>
              <div className="col-span-1   py-2 border-red-500 border-2 max-md:hidden">
                Producto
              </div>
              <div className="flex justify-center col-span-1   py-2 border-red-500 border-2 max-md:hidden">
                Percio
              </div>
              <div className="flex justify-center col-span-1  py-2 border-red-500 border-2 max-md:hidden">
                Cantidad
              </div>
              <div className="flex justify-center col-span-1  py-2 border-red-500 border-2 max-md:hidden">
                Total
              </div>

              {cargaImg &&
                listaPedido
                  .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
                  .map((item: any, key: any) => (
                    <React.Fragment key={key}>
                      {(item.smartphone.picture.includes(".webp") ||
                        item.smartphone.picture.includes(".jpeg") ||
                        item.smartphone.picture.includes(".png") ||
                        item.smartphone.picture.includes(".jpg") ||
                        item.smartphone.picture.includes(".svg")) && (
                        <div className="w-[130px] h-[120px] flex justify-center py-1 max-md:row-span-1 max-md:border-blue-500 max-md:border-t-2 max-md:border-l-2 max-md:mt-2 ">
                          <Image
                            src={item.smartphone.picture}
                            width="100"
                            height="100"
                            alt="Picture of the author2"
                          />
                        </div>
                      )}
                      {item.smartphone.picture.includes(".mp4") ||
                      item.smartphone.picture.includes(".mp3") ? (
                        <div className="w-[130px] h-[130px]  relative  py-1 max-md:row-span-1  max-md:border-blue-500 border-t-2 max-md:border-l-2 max-md:mt-2">
                          <div className="w-[130px] h-[120px]">
                            <video
                              className=" w-full  h-full object-cover "
                              width={0}
                              height={0}
                              src={item.smartphone.picture}
                              controls
                            >
                              {item.smartphone.title}
                            </video>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="relative justify-center py-1 pl-1   max-md:col-span-4  max-md:border-blue-500 max-md:border-t-2 max-md:border-r-2  max-md:mt-2 max-md:pr-5">
                        <button
                          onClick={() => handleClearPedido(key)}
                          className="hidden absolute top-0 right-0 flex justify-center cursor-pointer   max-md:block "
                        >
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 1280.000000 1280.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                              fill="#EF4444"
                              stroke="none"
                            >
                              <path
                                d="M6120 12774 c-674 -44 -1156 -133 -1717 -319 -614 -203 -1146 -474
-1717 -875 -102 -71 -396 -307 -507 -406 -36 -33 -108 -95 -159 -139 -187
-162 -546 -577 -797 -924 -632 -871 -1039 -1932 -1152 -2996 -102 -959 -8
-1859 284 -2740 204 -612 540 -1258 920 -1766 41 -56 81 -111 87 -123 39 -73
370 -446 560 -631 442 -429 946 -801 1463 -1079 694 -374 1439 -612 2220 -711
550 -69 1318 -59 1795 25 459 81 706 142 1065 263 505 171 1028 427 1465 719
91 61 199 136 240 167 41 32 104 77 139 101 212 143 648 550 906 845 141 160
221 265 425 555 229 324 461 733 612 1080 218 497 379 1045 458 1550 11 74 25
162 30 195 5 33 16 148 25 255 8 107 20 234 25 281 13 111 13 491 0 594 -5 44
-17 168 -25 275 -52 657 -234 1371 -510 1995 -55 126 -189 398 -235 480 -185
329 -312 524 -507 783 -69 92 -174 223 -232 291 -58 68 -135 158 -171 201 -94
111 -147 165 -314 322 -150 140 -405 358 -461 394 -16 10 -79 55 -140 100
-621 458 -1349 813 -2080 1012 -556 152 -1037 219 -1630 226 -170 2 -335 2
-365 0z m-1064 -4214 c738 -737 1348 -1340 1355 -1340 8 0 617 603 1354 1340
737 737 1344 1340 1350 1340 15 0 795 -783 795 -799 0 -7 -535 -548 -1188
-1202 -654 -654 -1258 -1262 -1342 -1350 l-153 -161 1341 -1341 c738 -738
1342 -1347 1342 -1353 0 -15 -778 -794 -793 -794 -7 0 -616 604 -1354 1342
l-1342 1342 -113 -108 c-62 -60 -669 -664 -1349 -1343 -679 -678 -1242 -1233
-1250 -1233 -16 0 -799 779 -799 795 0 6 603 613 1340 1350 737 737 1340 1344
1340 1348 0 14 -143 159 -1437 1457 -684 685 -1243 1250 -1243 1255 0 13 782
795 794 795 5 0 614 -603 1352 -1340z"
                              />
                            </g>
                          </svg>
                        </button>
                        <div className="   max-md:text-sm">
                          {item.smartphone.title}
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-center pl-2 py-1    min-w-[100px]  max-md:border-blue-500 max-md:border-b-2   max-md:border-l-2 max-md:col-span-2  max-md:w-full max-md:text-sm max-md:text-sm">
                        <div>Precio</div>
                        <div>
                          {" "}
                          S/ {Number(item.smartphone.offer2).toFixed(2)}
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-center   py-1  max-md:col-span-1 max-md:w-full max-md:min-w-[100px] max-md:border-blue-500 max-md:border-b-2">
                        <div className="max-md:text-sm">Cantidad</div>
                        <div className="w-full flex justify-center">
                          <button
                            onClick={() => handleUpdateMenos(key)}
                            className="relative flex justify-center  items-center bg-gray-700 w-[23px] h-[23px]  text-white text-2xl  font-bold  rounded-full  pb-1  "
                          >
                            -
                          </button>

                          <div className="flex justify-center  w-[40px] max-md:min-w-1/3  max-md:text-sm">
                            {item.cantidad}
                          </div>

                          <button
                            onClick={() => handleUpdateMas(key)}
                            className="flex justify-center  items-center bg-gray-700 w-[23px] h-[23px]  text-white text-2xl font-bold  rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className=" w-full flex flex-col  items-center  py-1    max-md:min-w-[100px]  max-md:border-blue-500   max-md:border-b-2 max-md:border-r-2 max-md:col-span-2  max-md:text-sm   ">
                        <div>Subtotal</div>
                        <div className="flex">
                          <div>S/{Number(item.subtotal).toFixed(2)}</div>
                          <button
                            onClick={() => handleClearPedido(key)}
                            className="flex justify-center cursor-pointer pl-2 max-md:hidden"
                          >
                            <svg
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 1280.000000 1280.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g
                                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                                fill="#EF4444"
                                stroke="none"
                              >
                                <path
                                  d="M6120 12774 c-674 -44 -1156 -133 -1717 -319 -614 -203 -1146 -474
-1717 -875 -102 -71 -396 -307 -507 -406 -36 -33 -108 -95 -159 -139 -187
-162 -546 -577 -797 -924 -632 -871 -1039 -1932 -1152 -2996 -102 -959 -8
-1859 284 -2740 204 -612 540 -1258 920 -1766 41 -56 81 -111 87 -123 39 -73
370 -446 560 -631 442 -429 946 -801 1463 -1079 694 -374 1439 -612 2220 -711
550 -69 1318 -59 1795 25 459 81 706 142 1065 263 505 171 1028 427 1465 719
91 61 199 136 240 167 41 32 104 77 139 101 212 143 648 550 906 845 141 160
221 265 425 555 229 324 461 733 612 1080 218 497 379 1045 458 1550 11 74 25
162 30 195 5 33 16 148 25 255 8 107 20 234 25 281 13 111 13 491 0 594 -5 44
-17 168 -25 275 -52 657 -234 1371 -510 1995 -55 126 -189 398 -235 480 -185
329 -312 524 -507 783 -69 92 -174 223 -232 291 -58 68 -135 158 -171 201 -94
111 -147 165 -314 322 -150 140 -405 358 -461 394 -16 10 -79 55 -140 100
-621 458 -1349 813 -2080 1012 -556 152 -1037 219 -1630 226 -170 2 -335 2
-365 0z m-1064 -4214 c738 -737 1348 -1340 1355 -1340 8 0 617 603 1354 1340
737 737 1344 1340 1350 1340 15 0 795 -783 795 -799 0 -7 -535 -548 -1188
-1202 -654 -654 -1258 -1262 -1342 -1350 l-153 -161 1341 -1341 c738 -738
1342 -1347 1342 -1353 0 -15 -778 -794 -793 -794 -7 0 -616 604 -1354 1342
l-1342 1342 -113 -108 c-62 -60 -669 -664 -1349 -1343 -679 -678 -1242 -1233
-1250 -1233 -16 0 -799 779 -799 795 0 6 603 613 1340 1350 737 737 1340 1344
1340 1348 0 14 -143 159 -1437 1457 -684 685 -1243 1250 -1243 1255 0 13 782
795 794 795 5 0 614 -603 1352 -1340z"
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
            </div>
            <div className="w-[30%] min-h-[200px] border-red-500 border-2 max-sm:w-full max-md:w-[60%] max-lg:w-[30%] max-xl:w-[30%] ">
              <div className="w-full h-[20%] flex justify-center items-center border-red-500 border-2 max-md:min-h-[50px] ">
                <h1 className="max-md:text-sm"> la hora de donde la sacaste</h1>
              </div>

              {cargaImg && (
                <div className="w-full h-[40%] flex justify-end items-center  pr-3 border-red-500 border-2 max-md:min-h-[80px] max-md:text-sm">
                  <h1> Total &nbsp; S/{lista.total}</h1>
                </div>
              )}

              <div className="w-full h-[40%] min-h-[50px] pb-3 flex justify-center items-end  border-blue-500 border-2 max-md:min-h-[100px]">
                <input
                  type="button"
                  // onClick={(e) => handleId("id", `${id}`, e)}
                  className="w-3/5 font-bold text-white h-10 bg-red-600 rounded-3xl cursor-pointer "
                  value="CONTINUAR"
                />
              </div>
            </div>
          </div>

          <div className="w-full  flex justify-start  h-[40px]  my-3 ">
            <button
              className="flex justify-center items-center w-[12%] max-w-[100px]  text-white bg-red-500 cursor-pointer max-sm:w-[30%] max-sm:max-w-[100px]"
              onClick={() => router.back()}
            >
              volver
            </button>
          </div>
        </>
      )}
      {cestaEmpty && (
        <div className="w-full flex flex-col justify-evenly items-center  w-full min-h-[93vh] border-red-500 border-2">
          <h1 className="text-center text-3xl">No hay carrito disponoble</h1>

          <div className="w-full flex justify-center  h-[40px]  my-3 ">
            <button
              className="flex justify-center items-center w-[12%] max-w-[100px]  text-white bg-red-500 cursor-pointer max-sm:w-[30%] max-sm:max-w-[100px]"
              onClick={() => router.back()}
            >
              volver
            </button>
          </div>
        </div>
      )}
    </>
  );
}
