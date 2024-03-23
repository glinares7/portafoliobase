export default function carritoPedido() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

  //*carrito-compra

  const postCarritoCompraReq = async () => {
    const postCarritoCompra = await fetch(`${server}/carritocompra`, {
      method: "POST",
      credentials: "include",
    });

    return postCarritoCompra.json();
  };

  const getCarritoCompraReq = async (getSessionCompra: any) => {
    const getCarritoCompra = await fetch(
      `${server}/carritocompra/${getSessionCompra}/session`
    );

    return getCarritoCompra.json();
  };

  const updateCarritoCompraReq = async (
    getCarritoCompraId: any,
    payloadCarritoCompraUpdate: any
  ) => {
    const updateTotalCarritoCompra = await fetch(
      `${server}/carritocompra/${getCarritoCompraId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payloadCarritoCompraUpdate),
      }
    );

    return updateTotalCarritoCompra.json();
  };

  const deleteCarritoCompraReq = async (resCarritoCompraId: any) => {
    const resCarritoCompraDel = await fetch(
      `${server}/carritocompra/${resCarritoCompraId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return resCarritoCompraDel.json();
  };

  //*pedido

  const postPedidoReq = async (
    idCarritoCompra: number,
    getIdSmart: any,
    payloadCarrito: any
  ) => {
    const postPedido = await fetch(
      `${server}/pedidos/${idCarritoCompra}/${getIdSmart}/compra`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadCarrito),
      }
    );

    return postPedido.json();
  };

  const deletePedidosList = async (idPedidos: number) => {
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
    postCarritoCompraReq,
    getCarritoCompraReq,
    updateCarritoCompraReq,
    deleteCarritoCompraReq,
    postPedidoReq,
    deletePedidosList,
  };
}
