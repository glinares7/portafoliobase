"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import perfilClienteApp from "./hooks/perfilCliente-App";
import MenuCuenta from "@/app/components/menu-cuenta";
import Image from "next/image";

export default function Page() {
  const [foundLoginValue, setFoundLoginValue] = useState("");

  const [loginCorreoState, setLoginCorreoState] = useState(false);

  const [loginCorreoSuccessState, setLoginCorreoSuccessState] = useState(false);

  //*formuario update pass

  //*1er formulaio

  const [nombrePerfilClienteValue, setNombrePerfilClienteValue] = useState("");
  const [apellido1PerfilClienteValue, setApellido1PerfilClienteValue] =
    useState("");
  const [apellido2PerfilClienteValue, setApellido2PerfilClienteValue] =
    useState("");

  const [direccionPerfilClienteValue, setDireccionPerfilClienteValue] =
    useState("");
  const [telefonoPerfilClienteValue, setTelefonoPerfilClienteValue] =
    useState("");
  const [generoPerfilClienteValue, setGeneroPerfilClienteValue] = useState("");
  const [fechaPerfilClienteValue, setFechaPerfilClienteValue] = useState("");

  const [fotoPerfilClienteValue, setFotoPerfilClienteValue]: any = useState();
  const [fotoBase64PerfilClienteValue, setFotoBase64PerfilClienteValue]: any =
    useState();

  const [urlFotoDecode, setUrlFotoDecode] = useState("");
  const [extFotoBufferState, setExtFotoBufferState] = useState("");
  const [fotoBufferStateBoolean, setFotoBufferStateBoolean] = useState(false);

  const [imgLocalSwitch, setImgLocalSwitch] = useState(true);
  const [multimediaLocalSwitch, setMultimediaLocalSwitch] = useState(true);

  const [urlStreamLabState, setUrlStreamLabState]: any = useState();

  const [generoPerfilState, setGeneroPerfilState] = useState(false);
  //*^alerta de mensaje

  const [
    alertRegisterPerfilCLienteValidate,
    setAlertRegisterPerfilCLienteValidate,
  ] = useState(false);

  const [bgAlertPerfilClienteValidate, setBgAlertPerfilClienteValidate] =
    useState(false);

  const [bgConfirmPerfilClientUpdate, setBgConfirmPerfilClientUpdate] =
    useState(false);

  const [msgPerfiClienteValidate, setMsgPerfiClienteValidate] = useState("");

  //*2do formulario

  const [pass1Value, setPass1Value] = useState("");
  const [pass2Value, setPass2Value] = useState("");

  const [
    alertPassRegisterCLienteValidate,
    setAlertPassRegisterCLienteValidate,
  ] = useState(false);

  const [bgAlertPassClienteValidate, setBgAlertPassClienteValidate] =
    useState(false);

  const [bgConfirmPassClientUpdate, setBgConfirmPassClientUpdate] =
    useState(false);

  const [msgPassRegisterClienteValidate, setMsgPassRegisterClienteValidate] =
    useState("");

  const [bufferFileLoad, setBufferFileLoad] = useState();

  const route = useRouter();

  const { server } = perfilClienteApp();

  useEffect(() => {
    (async () => {
      //*extraemos el archivo de la url
      // const emailClienteBufferUrl =
      //   sessionStorage.getItem("correoLoginCliente");
      // const response = await fetch(
      //   `${server}/perfilcliente/${emailClienteBufferUrl}/buffer`
      // );
      // const data = await response.blob();
      // console.log("datanormal-buffer-team", data);
      //*convertimos el buffer a base 64
      // const base64String1 = Buffer.from(data).toString("base64");
      // console.log("convertido de base 64 haber", data);
      //* desde la url buffer
      // if (data.size > 33) {
      //   setFotoBufferStateBoolean(true);
      //   setUrlStreamLabState(data);
      // } else {
      //   console.log({ msg: "no hay elemento que mostrar" });
      // }
      //*agregamos al renderizado el archivo en forma de url
      //todo  src={URL.createObjectURL(urlStreamLabState)}
    })();
    //* verificar si el usuario a iniciado sesion

    const getCorreoLoginCliente = sessionStorage.getItem("correoLoginCliente");

    const getSessionLoginCliente = sessionStorage.getItem(
      "sessionCorreoLoginCliente"
    );

    setUrlFotoDecode(`${server}/perfilcliente/${getCorreoLoginCliente}/buffer`);

    if (getCorreoLoginCliente && getSessionLoginCliente) {
      //* buscamos si la sesion del cliente es valida

      (async () => {
        const reqCorreoCLienteFindGet = await fetch(
          `${server}/emailcliente/${getCorreoLoginCliente}/sesionemail`
        );

        const resCorreoCLienteFindGet = await reqCorreoCLienteFindGet.json();

        setLoginCorreoState(true);

        if (
          resCorreoCLienteFindGet.msg ===
          "error al buscar por correo en el servidor"
        ) {
          setTimeout(() => {
            route.push("/");
          }, 2500);
          return setFoundLoginValue("Error al buscar el correo en el servidor");
        }

        console.log("resCorreoClienteFind ->", resCorreoCLienteFindGet);

        if (resCorreoCLienteFindGet.length == 1) {
          if (resCorreoCLienteFindGet[0].perfilcliente) {
            //*1er formulario
            setNombrePerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.nombre
            );
            setApellido1PerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.apellido1
            );
            setApellido2PerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.apellido2
            );
            setDireccionPerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.direccion
            );
            setTelefonoPerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.telefono
            );

            setGeneroPerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.genero
            );
            setFechaPerfilClienteValue(
              resCorreoCLienteFindGet[0].perfilcliente.fecha
            );

            //*base 64 a image

            // const base64String: any = btoa(
            //   String.fromCharCode(
            //     ...new Uint8Array(
            //       resCorreoCLienteFindGet[0].perfilcliente.dataimg
            //     )
            //   )
            // );

            if (resCorreoCLienteFindGet[0].perfilcliente.dataimg != null) {
              const buffer = Buffer.from(
                resCorreoCLienteFindGet[0].perfilcliente.dataimg
              );
              const base64String: any = buffer.toString("base64");

              setBufferFileLoad(base64String);
            }

            setFotoBufferStateBoolean(true);
            setExtFotoBufferState(resCorreoCLienteFindGet[0].perfilcliente.ext);
            setGeneroPerfilState(true);
            //* verificamos si la sesion asociada al cliente es la  misma que la sesión aspciada al servidor

            const getNewSessionLoginCliente = sessionStorage.getItem(
              "sessionCorreoLoginCliente"
            );

            if (
              getNewSessionLoginCliente ==
              resCorreoCLienteFindGet[0].sessioncliente
            ) {
              console.log("sesion valida");

              setLoginCorreoState(false);
              setLoginCorreoSuccessState(true);

              return true;
            } else {
              console.log("la sesión a caducado , inicie sesion");

              setTimeout(() => {
                route.push("/");
              }, 2500);
              return setFoundLoginValue("sesion a caducado, inicie sesion");
            }
          }
        }

        //*1er formulario
        setNombrePerfilClienteValue("");
        setApellido1PerfilClienteValue("");
        setApellido2PerfilClienteValue("");
        setDireccionPerfilClienteValue("");
        setTelefonoPerfilClienteValue("");
        setGeneroPerfilClienteValue("");
        setFechaPerfilClienteValue("");

        setGeneroPerfilState(false);

        setLoginCorreoState(false);
        setLoginCorreoSuccessState(true);
      })();
    } else {
      console.log("session no iniciada , vuelva a ingresar");
      setFoundLoginValue("No a iniciado sesión, vuelva a ingresar");
      setLoginCorreoState(true);

      setTimeout(() => {
        route.push("/");
      }, 2500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePassUpdateFormCliente = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("actualizamos la contraseña");

    console.log("valor 1", pass1Value);
    console.log("valor2", pass2Value);

    const correoClienteSession = sessionStorage.getItem("correoLoginCliente");

    console.log("correo del cliente", correoClienteSession);

    //* verificar si la contraseñas coinciden

    if (pass1Value === pass2Value) {
      console.log("las contraseñas agregadas coinciden - verify");

      const sessionStorageCorreoClienteLogin =
        sessionStorage.getItem("correoLoginCliente");

      const payloadPassVerifyRegister = {
        emailcliente: sessionStorageCorreoClienteLogin,
        passcliente: pass2Value.trim(),
      };
      const reqPassRegisterVerify = await fetch(
        `${server}/emailcliente/passverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payloadPassVerifyRegister),
        }
      );

      const resPassRegisterVerify = await reqPassRegisterVerify.json();

      console.log("resPasswordClienteVerify ->", resPassRegisterVerify);

      if (
        resPassRegisterVerify.msg === "la contraseña debe ser mayor a  5 cifras"
      ) {
        setPass1Value("");
        setPass2Value("");
        setAlertPassRegisterCLienteValidate(true); //*muestra la barra de alerta

        setBgAlertPassClienteValidate(true); //* muestra el colo de  fondo

        setMsgPassRegisterClienteValidate(
          `contraseña mayor a 5 cifras no ${pass2Value.length} cifra(s)`
        );
        return true;
      }

      if (
        resPassRegisterVerify.msg ===
        "actualizo la contraseña - registercliente"
      ) {
        setPass1Value("");
        setPass2Value("");
        setAlertPassRegisterCLienteValidate(true); //*muestra la barra de alerta

        setBgAlertPassClienteValidate(false); //* muestra el colo de  fondo

        setMsgPassRegisterClienteValidate(`actualizo la contraseña - cliente`);

        setBgConfirmPassClientUpdate(true);

        setTimeout(() => {
          // setInicioSwitch(false); //* vuelve a la  ventana anterior
          // setRegistroContrasenaClienteSwitch(false); //*cambia la ventana actual

          setAlertPassRegisterCLienteValidate(false); //*local -> quita el alert
        }, 2500);

        return true;
      }

      setPass1Value("");
      setPass2Value("");
    } else {
      setPass1Value("");
      setPass2Value("");
      setAlertPassRegisterCLienteValidate(true); //*muestra la barra de alerta

      setBgAlertPassClienteValidate(false); //* muestra el colo de  fondo

      setBgConfirmPassClientUpdate(false); //* cambiar a red el  fondo alert
      setMsgPassRegisterClienteValidate("las contraseñas no coinciden");
      return console.log("msg", {
        msg: "las contraseñas no coinciden",
      });
    }
  };

  const handlePerfilClienteSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("se pasaron que raro que antes no use eso ");

    console.log("nombre- perfil", nombrePerfilClienteValue);
    console.log("apellido1- perfil", apellido1PerfilClienteValue);

    console.log("apellido2- perfil", apellido2PerfilClienteValue);
    console.log("direccion- perfil", direccionPerfilClienteValue);

    console.log("telefono- perfil", telefonoPerfilClienteValue);
    console.log("genero- perfil", generoPerfilClienteValue);
    console.log("fecha- perfil", fechaPerfilClienteValue);

    //* guardar en la tabla perfilCliente

    const payloadDataPerfilClientePost = {
      nombre: nombrePerfilClienteValue,
      apellido1: apellido1PerfilClienteValue,
      apellido2: apellido2PerfilClienteValue,
      direccion: direccionPerfilClienteValue,
      telefono: telefonoPerfilClienteValue,
      genero: generoPerfilClienteValue,
      fecha: fechaPerfilClienteValue,
      correoLoginCliente: sessionStorage.getItem("correoLoginCliente"),
      sessionCorreoLoginCliente: sessionStorage.getItem(
        "sessionCorreoLoginCliente"
      ),
    };
    const reqDataPerfilClientePost = await fetch(`${server}/perfilcliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadDataPerfilClientePost),
    });

    const resDataPerfilClientePost = await reqDataPerfilClientePost.json();

    console.log("resDataPerfilClientePost ->", resDataPerfilClientePost);
    if (resDataPerfilClientePost.msg === "actualizo el  perfilcliente") {
      //* en caso se requiera actualizar file(foto)

      setFotoBufferStateBoolean(false);
      // const reader = new FileReader();
      // const arrayBuffer = reader.result;

      // console.log("arraybuffer->", arrayBuffer);

      // const respBufferFoto = await fotoPerfilClienteValue.arrayBuffer();
      // const buffer: any = Buffer.from(respBufferFoto, "base64");

      // console.log("bbb", buffer);

      console.log("test dato -update", fotoPerfilClienteValue);

      const payloadFileFoto = new FormData();
      payloadFileFoto.append("file", fotoPerfilClienteValue);

      // const payloadFileFoto = new FormData();
      // payloadFileFoto.append("file", new Blob([buffer]));

      // console.log("respayloadbufferSucess", payloadFileFoto);

      const emailClienteBuffer = sessionStorage.getItem("correoLoginCliente");
      const reqDataPerfilClientePo = await fetch(
        `${server}/perfilcliente/${emailClienteBuffer}/prueba`,
        {
          method: "POST",

          body: payloadFileFoto,
        }
      );

      const resDataPerfilClientePost = await reqDataPerfilClientePo.json();

      console.log("resDataPerfilClientePost -> ", resDataPerfilClientePost);

      //*mostramos en pantalla
      setAlertRegisterPerfilCLienteValidate(true);

      setBgAlertPerfilClienteValidate(true);

      // setBgConfirmPerfilClientUpdate(true);

      setMsgPerfiClienteValidate("actualizo el perfil");

      setTimeout(async () => {
        //todo extraemos el blob de la url
        // const emailClienteBufferUrl =
        //   sessionStorage.getItem("correoLoginCliente");

        // const response = await fetch(
        //   `${server}/perfilcliente/${emailClienteBufferUrl}/buffer`
        // );
        // const data = await response.blob();

        // console.log("datanormal-buffer-team", data);

        //* verificamos la nueva extension

        const reqCorreoCLienteFindUpdate = await fetch(
          `${server}/emailcliente/${sessionStorage.getItem(
            "correoLoginCliente"
          )}/sesionemail`
        );

        const resCorreoCLienteFindUpdate =
          await reqCorreoCLienteFindUpdate.json();

        setExtFotoBufferState(resCorreoCLienteFindUpdate[0].perfilcliente.ext);

        // setUrlStreamLabState(data);

        //* refresca desde la bd
        if (resCorreoCLienteFindUpdate[0].perfilcliente.dataimg != null) {
          const buffer = Buffer.from(
            resCorreoCLienteFindUpdate[0].perfilcliente.dataimg
          );
          const base64String: any = buffer.toString("base64");

          setBufferFileLoad(base64String);
        }

        //*mensaje en pantalla
        setFotoBufferStateBoolean(true);
      }, 1000);

      // location.reload();
    }

    if (resDataPerfilClientePost.msg === "registro el perfilcliente") {
      //*en caso seleccione un file ( foto)

      console.log("test dato -update", fotoPerfilClienteValue);

      const payloadFileFoto = new FormData();
      payloadFileFoto.append("file", fotoPerfilClienteValue);

      // const payloadFileFoto = new FormData();
      // payloadFileFoto.append("file", new Blob([buffer]));

      // console.log("respayloadbufferSucess", payloadFileFoto);

      const emailClienteBuffer = sessionStorage.getItem("correoLoginCliente");
      const reqDataPerfilClientePo = await fetch(
        `${server}/perfilcliente/${emailClienteBuffer}/prueba`,
        {
          method: "POST",

          body: payloadFileFoto,
        }
      );

      const resDataPerfilClientePost = await reqDataPerfilClientePo.json();

      console.log("resDataPerfilClientePost -> ", resDataPerfilClientePost);

      setAlertRegisterPerfilCLienteValidate(true);

      setBgAlertPerfilClienteValidate(false);

      setBgConfirmPerfilClientUpdate(true);
      setMsgPerfiClienteValidate("registro  el perfil");

      // location.reload();

      setTimeout(async () => {
        //todo extraemos el buffer al registrar
        // const emailClienteBufferUrl =
        //   sessionStorage.getItem("correoLoginCliente");
        // const response = await fetch(
        //   `${server}/perfilcliente/${emailClienteBufferUrl}/buffer`
        // );
        // const data = await response.blob();

        // console.log("datanormal-buffer-team", data);

        //* verificamos la nueva extension

        const reqCorreoCLienteFindUpdate = await fetch(
          `${server}/emailcliente/${sessionStorage.getItem(
            "correoLoginCliente"
          )}/sesionemail`
        );

        const resCorreoCLienteFindUpdate =
          await reqCorreoCLienteFindUpdate.json();

        setExtFotoBufferState(resCorreoCLienteFindUpdate[0].perfilcliente.ext);

        // setUrlStreamLabState(data);

        //* refresca desde la bd
        if (resCorreoCLienteFindUpdate[0].perfilcliente.dataimg != null) {
          const buffer = Buffer.from(
            resCorreoCLienteFindUpdate[0].perfilcliente.dataimg
          );
          const base64String: any = buffer.toString("base64");

          setBufferFileLoad(base64String);
        }

        setFotoBufferStateBoolean(true);
      }, 1000);
    }
    if (
      resDataPerfilClientePost.msg ===
      "no esta autorizado a registrar perfilcliente"
    ) {
      setAlertRegisterPerfilCLienteValidate(true);

      setBgAlertPerfilClienteValidate(false);

      setBgConfirmPerfilClientUpdate(false);
      setMsgPerfiClienteValidate("registro no autorizado");
    }
    if (resDataPerfilClientePost.msg === "no existe usuario en registro") {
      setAlertRegisterPerfilCLienteValidate(true);

      setBgAlertPerfilClienteValidate(false);

      setBgConfirmPerfilClientUpdate(false);
      setMsgPerfiClienteValidate("el correo no registrado");
    }

    if (
      resDataPerfilClientePost.msg ===
      "error al autozar el registro del perfilcliente"
    ) {
      setAlertRegisterPerfilCLienteValidate(true);

      setBgAlertPerfilClienteValidate(false);

      setBgConfirmPerfilClientUpdate(false);
      setMsgPerfiClienteValidate("Error al actualizar perfil");
    }
  };

  return (
    <>
      {loginCorreoState && (
        <div className=" z-10 min-h-[calc(100vh-64px)] border-red-500 border-2 w-full  flex flex-col  justify-center items-center gap-4">
          <div className=" text-2xl">{foundLoginValue}</div>

          <div className="text-xl flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
            <button
              className="w-1/6 text-white bg-red-500 cursor-pointer"
              onClick={() => route.back()}
            >
              volver
            </button>
          </div>
        </div>
      )}
      {loginCorreoSuccessState && (
        <div className="relative  w-full  z-10 min-h-[calc(100vh-64px)] z-10  border-red-500 border-2 w-full  flex  justify-center items-center gap-4  max-md:flex max-md:flex-col max-md:w-full max-md:justify-center max-md:items-center ">
          <div className="absolute top-0 left-0">
            <MenuCuenta />
          </div>

          <div className="w-[40%]   min-h-[80vh] flex  flex-col border-blue-500 border-2 justify-start items-center  max-md:w-full gap-4 max-md:w-full max-sm:gap-2 ">
            <div className="w-full flex justify-center max-sm:text-sm">
              Información del Cliente
            </div>

            <form
              className="flex flex-col justify-center w-full "
              onSubmit={(e) => handlePerfilClienteSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="  w-full flex justify-center   max-sm:text-lg">
                <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                  <legend className="min-w-[90px]  ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                    Nombre
                  </legend>
                  <div className="w-full  pl-[5px] pb-[5px] ">
                    <input
                      className="w-full focus:outline-none text-lg max-sm:text-sm"
                      type="text"
                      onChange={(e) => {
                        setNombrePerfilClienteValue(e.target.value);
                        setAlertRegisterPerfilCLienteValidate(false);
                      }}
                      value={nombrePerfilClienteValue}
                      name="nombrePerfilClientValue"
                      id="nombrePerfilClienteValue"
                      placeholder="escriba su nombre"
                      autoComplete="off"
                      required
                    />
                  </div>
                </fieldset>
              </div>

              <div className="  w-full flex justify-center   max-sm:text-lg">
                <div className="  w-[47%] flex justify-center   max-sm:text-lg">
                  <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                    <legend className="min-w-[90px]  ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                      Apelllido1
                    </legend>
                    <div className="w-full  pl-[5px] pb-[5px] ">
                      <input
                        className="w-full focus:outline-none text-lg max-sm:text-sm"
                        type="text"
                        onChange={(e) => {
                          setApellido1PerfilClienteValue(e.target.value);
                          setAlertRegisterPerfilCLienteValidate(false);
                        }}
                        value={apellido1PerfilClienteValue}
                        name="apellido1PerfilClienteValue"
                        id="apellido1PerfilClienteValue"
                        placeholder="Su apellido paterno"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="  w-[47%] flex justify-center   max-sm:text-lg">
                  <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                    <legend className="w-[90px]  ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                      Apelllido2
                    </legend>
                    <div className="w-full  pl-[5px] pb-[5px] ">
                      <input
                        className="w-full focus:outline-none text-lg max-sm:text-sm"
                        type="text"
                        onChange={(e) => {
                          setApellido2PerfilClienteValue(e.target.value);
                          setAlertRegisterPerfilCLienteValidate(false);
                        }}
                        value={apellido2PerfilClienteValue}
                        name="apellido2PerfilClienteValue"
                        id="apellido2PerfilClienteValue"
                        placeholder="Su apellido materno"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="  w-full flex justify-center   max-sm:text-lg">
                <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                  <legend className="w-[90px]  ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                    Dirección
                  </legend>
                  <div className="w-full  pl-[5px] pb-[5px] ">
                    <input
                      className="w-full focus:outline-none text-lg max-sm:text-sm"
                      type="text"
                      onChange={(e) => {
                        setDireccionPerfilClienteValue(e.target.value);
                        setAlertRegisterPerfilCLienteValidate(false);
                      }}
                      value={direccionPerfilClienteValue}
                      name="direccionPerfilClienteValue"
                      id="direccionPerfilClienteValue"
                      placeholder="escriba su dirección"
                      autoComplete="off"
                      required
                    />
                  </div>
                </fieldset>
              </div>

              <div className="  w-full flex justify-center   max-sm:text-lg max-sm:flex-col ">
                <div className="  w-[47%] flex justify-center   max-sm:text-lg max-sm:w-[100%] max-sm:justify-center">
                  <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                    <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                      Telefono
                    </legend>

                    <div className="w-full  pl-[5px] pb-[5px] ">
                      <input
                        className="w-full focus:outline-none text-lg max-sm:text-sm"
                        type="number"
                        onChange={(e) => {
                          setTelefonoPerfilClienteValue(e.target.value);

                          setAlertRegisterPerfilCLienteValidate(false);
                        }}
                        value={telefonoPerfilClienteValue}
                        name="telefonoPerfilClienteValue"
                        id="telefonoPerfilClienteValue"
                        placeholder="Su apellido paterno"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="relative  w-[47%] flex justify-center   max-sm:text-lg  max-sm:w-[100%]  max-sm:justify-center">
                  <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                    <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                      Genero &nbsp;
                    </legend>
                    <div className="w-full  px-[5px] pb-[5px]     text-1xl  max-sm:text-sm ">
                      <select
                        className="w-full focus:outline-none"
                        name="lenguajes"
                        id="lang"
                        onChange={(e) => {
                          setGeneroPerfilClienteValue(e.target.value);
                          setAlertRegisterPerfilCLienteValidate(false);
                          // console.log(e.target.value);
                        }}
                      >
                        <option value="Elija un genero">
                          {generoPerfilState
                            ? generoPerfilClienteValue
                            : "Elija un genero"}
                        </option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="Prefiero no decirlo">
                          Prefiero no decirlo
                        </option>
                      </select>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="relative  w-full flex justify-center  max-sm:text-lg max-sm:w-[100%] max-sm:justify-center max-sm:gap-1">
                <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                  <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                    Fecha&nbsp;Nac
                  </legend>

                  <div className="w-full flex justify-center   pb-[5px] ">
                    <input
                      className=" w-[95%] focus:outline-none text-lg max-sm:text-sm"
                      type="date"
                      onChange={(e) => {
                        setFechaPerfilClienteValue(e.target.value);
                        setAlertRegisterPerfilCLienteValidate(false);
                      }}
                      value={fechaPerfilClienteValue}
                      name="fechaPerfilClienteValue"
                      id="fechaPerfilClienteValue"
                      placeholder="Su apellido paterno"
                      autoComplete="off"
                      required
                    />
                  </div>
                </fieldset>
              </div>

              <div className="relative  w-full flex justify-center  max-sm:text-lg max-sm:w-[100%] max-sm:justify-center max-sm:gap-1">
                <fieldset className=" w-[90%] border-gray-500 border-2 max-sm:w-[90%] ">
                  <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                    Foto
                  </legend>

                  <div className="w-full flex justify-center   pb-[5px] ">
                    <input
                      className=" w-[95%] focus:outline-none text-lg max-sm:text-sm"
                      type="file"
                      name="fotoPerfilClienteValue"
                      id="fotoPerfilClienteValue"
                      onChange={async (e) => {
                        if (!e.target.files) return;
                        setFotoPerfilClienteValue(e.target.files[0]);
                        setAlertRegisterPerfilCLienteValidate(false);

                        // const emailClienteBufferUrl =
                        //   sessionStorage.getItem("correoLoginCliente");

                        //*extraccion del buffer bia blob
                        // const response = await fetch(
                        //   `${server}/perfilcliente/${emailClienteBufferUrl}/buffer`
                        // );
                        // const data = await response.blob();

                        // setFotoBufferStateBoolean(true);
                        // // console.log("datanormal-buffer-team", data);
                        // setUrlStreamLabState(data);

                        //*mostramos la extension

                        const reqCorreoCLienteFindUpdate = await fetch(
                          `${server}/emailcliente/${sessionStorage.getItem(
                            "correoLoginCliente"
                          )}/sesionemail`
                        );

                        const resCorreoCLienteFindUpdate =
                          await reqCorreoCLienteFindUpdate.json();

                        setExtFotoBufferState(
                          resCorreoCLienteFindUpdate[0].perfilcliente.ext
                        );
                      }}
                    />
                  </div>
                </fieldset>
              </div>

              {fotoBufferStateBoolean ? (
                <div className="w-full flex justify-center pt-3 cursor-pointer  max-sm:w-full">
                  {extFotoBufferState.includes("webp") ||
                  extFotoBufferState.includes("jpeg") ||
                  extFotoBufferState.includes("png") ||
                  extFotoBufferState.includes("jpg") ? (
                    <Image
                      src={`data:image/${extFotoBufferState};base64,${bufferFileLoad}`}
                      width="0"
                      height="0"
                      sizes="100vw"
                      alt="Picture of the author"
                      className=" w-[80%] h-[300px] max-sm:h-[210px]"
                    />
                  ) : (
                    ""
                  )}
                  {extFotoBufferState.includes("svg") ? (
                    <Image
                      src={`data:image/${extFotoBufferState}+xml;base64,${bufferFileLoad}`}
                      width="0"
                      height="0"
                      sizes="100vw"
                      alt="Picture of the author"
                      className=" w-[80%] h-[300px] max-sm:h-[210px]"
                    />
                  ) : (
                    ""
                  )}

                  {extFotoBufferState.includes("mp4") && (
                    <div className="w-[80%] h-[300px] max-sm:h-[210px]">
                      <video
                        className="w-full h-full object-cover"
                        width={0}
                        height={0}
                        src={`data:video/${extFotoBufferState};base64,${bufferFileLoad}`}
                        controls
                      >
                        file de prueba
                      </video>
                    </div>
                  )}

                  {extFotoBufferState.includes("mp3") ? (
                    <div className="w-[80%] h-[300px] max-sm:h-[210px]">
                      <video
                        className="w-full h-full object-cover"
                        width={0}
                        height={0}
                        src={`data:audio/${extFotoBufferState};base64,${bufferFileLoad}`}
                        controls
                      >
                        file de prueba
                      </video>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {alertRegisterPerfilCLienteValidate && (
                <div className="relative pt-5 flex justify-center   max-sm:text-lg">
                  <div className=" w-[90%] h-[50px] border-gray-500 border-2 max-sm:w-[90%] ">
                    <div
                      className={`flex justify-center items-center w-full h-full  text-md max-sm:text-sm ${
                        bgAlertPerfilClienteValidate
                          ? "bg-yellow-200 font-bold text-gray-950"
                          : `${
                              bgConfirmPerfilClientUpdate
                                ? "bg-black font-bold text-white"
                                : "bg-red-500 font-bold text-white"
                            }`
                      }`}
                    >
                      {msgPerfiClienteValidate}
                    </div>
                  </div>
                </div>
              )}
              <div className=" flex flex-col justify-center items-center  mt-8  ">
                <div className="w-[80%] flex justify-center text-lg max-sm:text-sm">
                  <button className="w-[400px] border-red-700 border-2 h-[40px] text-red-700 font-bold rounded-full">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className=" w-[40%] min-h-[80vh] flex flex-col  justify-around min-h-[80vh] border-blue-500 border-2  max-md:w-full">
            <form
              className="flex justify-center w-full "
              onSubmit={(e) => {
                handlePassUpdateFormCliente(e);
              }}
            >
              <div className="flex flex-col justify-center w-[400px]  mt-8 gap-7 ">
                <div className="flex justify-center pt-3 text-lg max-sm:text-sm ">
                  Actualización de contraseña
                </div>
                <div className="relative  flex justify-center   max-sm:text-lg">
                  <fieldset className=" w-[80%] border-gray-500 border-2 max-sm:w-[80%] ">
                    <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                      Contraseña
                    </legend>
                    <div className="w-full  pl-[5px] pb-[5px] ">
                      <input
                        className="w-full focus:outline-none text-lg max-sm:text-sm"
                        type="password"
                        onChange={(e) => {
                          setPass1Value(e.target.value);
                          setAlertPassRegisterCLienteValidate(false);
                        }}
                        value={pass1Value}
                        name="passwordRegisterValidation"
                        id="passwordRegisterClientValidation"
                        placeholder="escriba su contraseña"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="relative  flex justify-center  max-sm:text-lg">
                  <fieldset className=" w-[80%] border-gray-500 border-2 max-sm:w-[80%] ">
                    <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm ">
                      Contraseña
                    </legend>
                    <div className="w-full  pl-[5px] pb-[5px] ">
                      <input
                        className="w-full focus:outline-none  text-lg  max-sm:text-sm"
                        type="password"
                        onChange={(e) => {
                          setPass2Value(e.target.value);
                          setAlertPassRegisterCLienteValidate(false);
                        }}
                        value={pass2Value}
                        name="passwordVerifyRegisterValidation"
                        id="passwordVerifyRegisterValidation"
                        placeholder="vuelva a escribir su contraseña"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </fieldset>
                </div>

                {alertPassRegisterCLienteValidate && (
                  <div className="relative  flex justify-center   max-sm:text-lg">
                    <div className=" w-[80%] h-[50px] border-gray-500 border-2 max-sm:w-[80%] ">
                      <div
                        className={`flex justify-center items-center w-full h-full  text-md max-sm:text-sm ${
                          bgAlertPassClienteValidate
                            ? "bg-yellow-200 font-bold text-gray-950"
                            : `${
                                bgConfirmPassClientUpdate
                                  ? "bg-black font-bold text-white"
                                  : "bg-red-500 font-bold text-white"
                              }`
                        }`}
                      >
                        {msgPassRegisterClienteValidate}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center text-lg max-sm:text-sm">
                  <button className="w-[80%] border-red-700 border-2 h-[40px] text-red-700 font-bold rounded-full">
                    Guardar
                  </button>
                </div>
              </div>
            </form>

            <div className="text-xl flex w-full my-2  justify-center   cursor-pointer w-[100px] h-[40px]">
              <button
                className="min-w-[100px] text-white bg-blue-500 cursor-pointer"
                onClick={() => route.back()}
              >
                volver
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
