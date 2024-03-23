export default function detallesFetch() {
  const server = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3000";

  const detalleSmartphonePost = async (id: number, payload: any) => {
    const dataPictureServer = await fetch(`${server}/detallesmartphone/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return dataPictureServer.json();
  };

  const detalleSmartphonePatch = async (id: number, payload: any) => {
    const detalleSmartServer = await fetch(
      `${server}/detallesmartphone/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return detalleSmartServer.json();
  };

  return {
    detalleSmartphonePost,
    detalleSmartphonePatch,
  };
}
