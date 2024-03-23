export default function carritoApp() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

  //*CARRITO

  const getCarritoReq = async (sessionCarrito: any) => {
    const getCarritoPedidoP = await fetch(
      `${server}/carritocompra/${sessionCarrito}/session`
    );

    return getCarritoPedidoP.json();
  };

  const getCarritoOneReq = async (idCarrito: number) => {
    const resCarritoGet = await fetch(`${server}/carritocompra/${idCarrito}`);

    return resCarritoGet.json();
  };
  const updateCarritoCompra = async (
    idCarrito: number,
    payloadCarrito: any
  ) => {
    const resCarritoUpdateReq = await fetch(
      `${server}/carritocompra/${idCarrito}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadCarrito),
      }
    );

    return resCarritoUpdateReq.json();
  };

  const deleteCarritoCompra = async (idCarrito: number) => {
    const resCarritoCompraDel = await fetch(
      `${server}/carritocompra/${idCarrito}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return resCarritoCompraDel.json();
  };

  //*PEDIDOS

  const updatePedidosReq = async (
    idPedidos: number,
    idSmart: number,
    payloadMenos: any
  ) => {
    const resPedidosUpdate = await fetch(
      `${server}/pedidos/${idPedidos}/${idSmart}/compra`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadMenos),
      }
    );

    return resPedidosUpdate.json();
  };

  const deletePedidosReq = async (idPedidos: number) => {
    const resPedidosDel = await fetch(`${server}/pedidos/${idPedidos}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return resPedidosDel.json();
  };

  return {
    server,
    getCarritoReq,
    getCarritoOneReq,
    updateCarritoCompra,
    deleteCarritoCompra,

    updatePedidosReq,
    deletePedidosReq,
  };
}
