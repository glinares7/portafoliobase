"use client";
import MenuCuenta from "@/app/components/menu-cuenta";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import comprasApp from "./hooks/compras-App";
import { UseContext } from "@/app/contexts/authContext";

export default function Page() {
  const [comprasState, setComprasState] = useState(false);
  const [clientComprasVerifyState, setClientComprasVerifyState] =
    useState(false);

  const [msgComprasValue, setMsgComprasValue] = useState("");
  const {
    cuentaState,
    setCuentaState,
    inicioState,
    setInicioState,
    inicioSwitch,
    setInicioSwitch,
    registroSwitch,
    setRegistroSwitch,
    loginSwitch,
    setLoginSwitch,
    correoSwitch,
    setCorreoSwitch,
    setCorreoValidationSwitch,
  }: any = useContext(UseContext);

  const { server } = comprasApp();
  const route = useRouter();
  useEffect(() => {
    (async () => {
      console.log("yo llegue primero v2");

      //*validar si el usuario esta registrado
      //* si no a inicioado sesion
      console.log("en construcción v2");

      const payloadCarritoValidatePost = {
        emailcliente: sessionStorage.getItem("correoLoginCliente"),
        sessioncliente: sessionStorage.getItem("sessionCorreoLoginCliente"),
      };

      const reqSessionValidateCarritoPost = await fetch(
        `${server}/emailcliente/logincorreo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadCarritoValidatePost),
        }
      );

      const resSessionValidateCarritoPost =
        await reqSessionValidateCarritoPost.json();

      console.log("resSessionValidatePost -> ", resSessionValidateCarritoPost);

      if (
        resSessionValidateCarritoPost.msg ===
        "la sesion no coincide - vuelve a ingresar"
      ) {
        //*creamos un estado
        // setCarritoState(false);
        // setClientCarritoVerifyState(true);

        setCuentaState(false);

        setComprasState(false);
        setClientComprasVerifyState(true);
        setMsgComprasValue("session compras invalida - vuelva a ingresar");

        // setTimeout(() => {
        //   setInicioState(true);
        //   setInicioSwitch(false); //*muestra el menu inicio
        //   setLoginSwitch(false); //*oculta el login del contexto
        // }, 2500);

        sessionStorage.removeItem("correoLoginCliente");
        sessionStorage.removeItem("sessionCorreoLoginCliente");

        setTimeout(() => {
          setInicioState(true);
          setInicioSwitch(false); //*muestra el menu inicio
          setLoginSwitch(false); //*oculta el login del contexto
          // route.push("/");
        }, 2500);
        return true;
      }

      if (
        resSessionValidateCarritoPost.msg ===
        "el usuario no esta registrado - logincliente"
      ) {
        setComprasState(false);
        setClientComprasVerifyState(true);
        setMsgComprasValue("Error al validar usuario , vuelva a ingresar");

        setTimeout(() => {
          sessionStorage.removeItem("correoLoginCliente");
          sessionStorage.removeItem("sessionCorreoLoginCliente");
          route.push("/");
        }, 2500);

        // setCuentaState(false);
        // setInicioState(true); ///*muestra la ventana menu

        // setInicioSwitch(false); //*muestra el menu inicio
        // // setRegistroSwitch(false); //*vuelve al registro
        return true;
      }

      setComprasState(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full min-h-[calc(100vh-64px)] ">
        <MenuCuenta />

        {comprasState && (
          <div>
            <h1>bienvenido a la ventana compras</h1>
          </div>
        )}
        {clientComprasVerifyState && (
          <div className="w-full min-h-[calc(100vh-64px)]  flex flex-col items-center justify-center">
            <div className="w-full  flex justify-center items-center text-2xl max-sm:w-full text-center ">
              {" "}
              {msgComprasValue}
            </div>
            <div className="w-full flex justify-center  h-[40px]  my-3 ">
              <button
                className="flex justify-center items-center w-[12%] max-w-[100px]  text-white bg-red-500 cursor-pointer max-sm:w-[30%] max-sm:max-w-[100px]"
                onClick={() => route.back()}
              >
                volver
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
