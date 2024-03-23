import { useContext, useEffect, useState } from "react";
import { UseContext } from "../contexts/authContext";
import { useRouter } from "next/navigation";
import RegistroCliente from "./@registrocliente/page";
import LoginCliente from "./@logincliente/page";
import CorreoCliente from "./@correocliente/page";
import RegistroCLienteValidation from "./@registroclientevalidacion/page";
import CorreoCLienteValidacion from "./@correoclientevalidacion/page";
import RegistroContrasenaClienteValidacion from "./@registrocontrasenaclientevalidacion/page";
import menuApp from "./hooks/menu-App";

export default function MenuCuenta() {
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

  const route = useRouter();

  const { server } = menuApp();

  useEffect(() => {
    // setCuentaState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComrasClienteValidate = async () => {
    console.log("yo llegue primero");

    //*validar si el usuario esta registrado
    //* si no a inicioado sesion
    console.log("en construcción");

    // const payloadCarritoValidatePost = {
    //   emailcliente: sessionStorage.getItem("correoLoginCliente"),
    //   sessioncliente: sessionStorage.getItem("sessionCorreoLoginCliente"),
    // };

    // const reqSessionValidateCarritoPost = await fetch(
    //   `${server}/emailcliente/logincorreo`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payloadCarritoValidatePost),
    //   }
    // );

    // const resSessionValidateCarritoPost =
    //   await reqSessionValidateCarritoPost.json();

    // console.log("resSessionValidatePost -> ", resSessionValidateCarritoPost);

    // if (
    //   resSessionValidateCarritoPost.msg ===
    //   "el usuario no esta registrado - logincliente"
    // ) {
    //   //*creamos un estado
    //   // setCarritoState(false);
    //   // setClientCarritoVerifyState(true);

    //   setCuentaState(false);
    //   // setInicioSwitch(false); //*muestra el menu inicio
    //   // setLoginSwitch(false); //*oculta el login del contexto

    //   sessionStorage.removeItem("correoLoginCliente");
    //   sessionStorage.removeItem("sessionCorreoLoginCliente");

    //   setTimeout(() => {
    //     route.push("/compras");
    //   }, 500);
    //   return true;
    // }

    // if (
    //   resSessionValidateCarritoPost.msg ===
    //   "la sesion no coincide - vuelve a ingresar"
    // ) {
    //   sessionStorage.removeItem("correoLoginCliente");
    //   sessionStorage.removeItem("sessionCorreoLoginCliente");

    //   setCuentaState(false);
    //   setInicioState(true); ///*muestra la ventana menu

    //   setInicioSwitch(false); //*muestra el menu inicio
    //   // setRegistroSwitch(false); //*vuelve al registro

    //     setTimeout(() => {
    //       route.push("/compras");
    //     }, 500);

    //   return true;
    // }

    setCuentaState(false);
    // setInicioState(false);
    route.push("/compras");
  };
  return (
    <>
      {cuentaState && (
        <div className=" fixed z-30  pr-[70px] flex flex-col items-end top-[64px] right-0 w-full  h-full  min-h-[100vh] backdrop-brightness-50 bg-white/2  border-blue-500 border-2  ">
          <div className="flex flex-col items-center bg-white w-[200px] h-[300px] border-red-500 gap-2 border-2    ">
            <button
              className="flex justify-start pl-1 w-full  mt-2
                "
              onClick={() => {
                // route.push("/logincliente");
                setCuentaState(false);

                setInicioState(true);
              }}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                route.push("perfilcliente");

                setCuentaState(false);
              }}
              className="flex justify-start pl-1 w-full "
            >
              Perfil
            </button>
            <button
              onClick={handleComrasClienteValidate}
              className="flex justify-start pl-1 w-full "
            >
              Compras
            </button>
          </div>
        </div>
      )}

      {inicioState && (
        <div
          onKeyDown={(e) => {
            if (e.key == "Tab") {
              console.log("se hizo cli ck", e.key);
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="fixed z-30 backdrop-brightness-50 bg-white/30 w-full h-[calc(100vh-64px)]  border-red-500 border-2 max-sm:h-[calc(100vh-64px)]"
        >
          <div className="fixed w-[100%] h-[calc(100vh-64px)]  flex justify-center items-start   border-red-500 border-2 max-lg:overflow-y-scroll max-sm:h-full">
            <div
              className={`relative flex   w-[400px] h-[50vh]  border-red-500 border-2 bg-white  max-sm:w-full  overflow-hidden  max-sm:h-full min-h-[572px]`}
            >
              <div
                className={`relative h-full  flex flex-col justify-start  items-center  duration-300  ease-in-out transition-right
                
                ${
                  inicioSwitch
                    ? "  w-[0%]   right-[100%] opacity-0  "
                    : "w-full  right-0  opacity-100  "
                } 

                    
               
                `}
              >
                <button
                  onClick={() => {
                    setCuentaState(false);
                    setInicioState(false);
                    setInicioSwitch(false);
                    setLoginSwitch(false);
                    setCorreoValidationSwitch(false);
                  }}
                  className={`absolute w-[30px] h-[45px]  top-0 right-[8px] z-30`}
                >
                  <div
                    className=" flex justify-center items-center  w-full h-full
                  before:content-['']  
                  before:absolute 
                  before:block 
                  before:bg-red-500 
                  before:w-[2px]
                  before:h-[20px]
                  before:rotate-45
                  
                  after:content-['']  
                  after:absolute
                  after:block 
                  after:bg-red-500 
                  after:w-[2px]
                  after:h-[20px]
                  after:-rotate-45
                  "
                  ></div>
                </button>
                <div className="flex flex-col justify-center w-[400px] gap-5 pt-11 ">
                  <div className="flex justify-center  text-lg max-sm:text-sm">
                    Iniciar Sesión
                  </div>

                  <div className="flex justify-center text-lg max-sm:text-sm">
                    <button
                      onClick={() => {
                        setInicioSwitch(true); //*oculta el menuinicio

                        setCorreoSwitch(true); //* va a la ventana correocliente

                        // setCorreoValidationSwitch(true); //* va a la ventana correovalidation
                        // setRegistroSwitch(true); //* va a la ventana registrocliente
                      }}
                      className="w-[90%] border-red-700 border-2 h-[40px] text-red-700 font-bold rounded-full max-sm:w-[80%]"
                    >
                      Recibir la clave de acceso por correo
                    </button>
                  </div>

                  <div className="flex justify-center text-lg max-sm:text-sm">
                    <button
                      onClick={() => {
                        // route.push("/logincliente");

                        // setTimeout(() => {
                        //   setInicioState(false);
                        // }, 3000);

                        setInicioSwitch(true);

                        setLoginSwitch(true);
                      }}
                      className="w-[90%] border-black border-2 h-[40px]  font-bold rounded-full max-sm:w-[80%]"
                    >
                      Ingresar con correo y contraseña
                    </button>
                  </div>

                  <div className="flex justify-center text-lg max-sm:text-sm">
                    <button
                      onClick={() => {
                        console.log("enviar valor por google");
                      }}
                      className="w-[90%] border-black border-2 h-[40px]  font-bold rounded-full max-sm:w-[80%]"
                    >
                      Goggle
                    </button>
                  </div>

                  <div className="flex justify-center text-lg max-sm:text-sm">
                    <button
                      onClick={() => {
                        console.log("enviar valor por facebook");
                      }}
                      className="w-[90%] border-black border-2 h-[40px]  font-bold rounded-full max-sm:w-[80%]"
                    >
                      Facebook
                    </button>
                  </div>
                </div>

                <div className="w-full flex justify-end gap-x-3 pr-5 mt-[110px]">
                  <h1 className="text-lg max-sm:text-sm">
                    No tienes una cuenta ?
                  </h1>
                  <button
                    onClick={() => {
                      console.log(" presionado el boton enviar");

                      //*si se cambia  el localCarrito

                      // route.push("/registrocliente");

                      setInicioSwitch(true); //*oculta el menu inicio

                      setRegistroSwitch(true); //*vuelve al registro
                    }}
                    className="cursor-pointer text-lg max-sm:text-sm"
                  >
                    <h1 className="text-red-700 font-bold">Registrate</h1>
                  </button>
                </div>
              </div>
              <CorreoCliente />
              <LoginCliente />
              <RegistroCliente />
              <RegistroCLienteValidation />
              <RegistroContrasenaClienteValidacion />
              <CorreoCLienteValidacion />
            </div>

            {/* <div>
                <button
                  onClick={() => {
                    setInicioState(false);
                  }}
                  className={`w-[70px] h-[45px] bg-red-500 text-white `}
                >
                  <div className="relative flex justify-center items-center">
                    <div className="pl-[2.5px] absolute   rotate-[45deg] ">
                      |
                    </div>
                    <div className="pr-[2.5px] absolute   -rotate-[45deg] ">
                      |
                    </div>
                  </div>
                </button>
              </div> */}
          </div>
        </div>
      )}
    </>
  );
}
