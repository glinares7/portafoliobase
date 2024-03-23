"use client";

import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import menuApp from "../hooks/menu-App";

export default function LoginCliente() {
  const {
    setInicioState,
    loginSwitch,
    setLoginSwitch,
    setInicioSwitch,
    registroSwitch,
    setRegistroSwitch,
  }: any = useContext(UseContext);

  const { server } = menuApp();

  const route = useRouter();

  const [correoValue, setCorreoValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [
    alertEmailPassLoginCLienteValidate,
    setAlertEmailPassLoginCLienteValidate,
  ] = useState(false);

  const [bgAlertEmailPassClienteValidate, setBgAlertEmailPassClienteValidate] =
    useState(false);

  const [bgConfirmEmailPassClient, setBgConfirmEmailPassClient] =
    useState(false);

  const [
    msgEmailPassLoginClienteValidate,
    setMsgEmailPassLoginClienteValidate,
  ] = useState("");

  useEffect(() => {}, []);

  const handleLoginFormCliente = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("fuente de soda");

    console.log("valor 1", correoValue);
    console.log("valor2", passwordValue);

    const payloadEmailPassLoginValidation = {
      emailcliente: correoValue,
      passcliente: passwordValue,
    };

    const reqEmailPassLoginClientPost = await fetch(
      `${server}/emailcliente/emailpass`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payloadEmailPassLoginValidation),
      }
    );

    const resEmailPassClienteLogin = await reqEmailPassLoginClientPost.json();

    console.log("resEmailPassCLientePost ->", resEmailPassClienteLogin);

    if (
      resEmailPassClienteLogin.msg ===
      "el usuario no esta registrado - logincliente"
    ) {
      setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
      setBgAlertEmailPassClienteValidate(false); //* color de fondo del alert
      setBgConfirmEmailPassClient(false); //* variación del fondo segun la condición

      setMsgEmailPassLoginClienteValidate("usuario no registrado");

      setCorreoValue("");
      setPasswordValue("");
      return true;
    }
    if (
      resEmailPassClienteLogin.msg ===
      "usuario y/o contraseña invalidos - emailpasscliente"
    ) {
      setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
      setBgAlertEmailPassClienteValidate(true); //* color de fondo del alert
      setBgConfirmEmailPassClient(false); //* variación del fondo segun la condición

      setMsgEmailPassLoginClienteValidate("usuario y/o contraseña no validos");

      setCorreoValue("");
      setPasswordValue("");
      return true;
    }
    if (
      resEmailPassClienteLogin.msg === "error en las credenciales -loginCliente"
    ) {
      setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
      setBgAlertEmailPassClienteValidate(false); //* color de fondo del alert
      setBgConfirmEmailPassClient(false); //* variación del fondo segun la condición

      setMsgEmailPassLoginClienteValidate(
        "error en las credenciales - ingrese por correo"
      );

      setCorreoValue("");
      setPasswordValue("");
      return true;
    }
    if (
      resEmailPassClienteLogin.msg ===
      "no asigno contraseña - ingrese por correo"
    ) {
      setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
      setBgAlertEmailPassClienteValidate(false); //* color de fondo del alert
      setBgConfirmEmailPassClient(false); //* variación del fondo segun la condición

      setMsgEmailPassLoginClienteValidate(
        "no asigno contraseña - ingrese por correo"
      );

      setCorreoValue("");
      setPasswordValue("");
      return true;
    }

    if (
      resEmailPassClienteLogin.msg ===
      "usuario no autorizado , vuelva a registrar"
    ) {
      setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
      setBgAlertEmailPassClienteValidate(false); //* color de fondo del alert
      setBgConfirmEmailPassClient(false); //* variación del fondo segun la condición

      setMsgEmailPassLoginClienteValidate(
        "usuario no verificado - vuelva a registrar"
      );

      setCorreoValue("");
      setPasswordValue("");
      return true;
    }

    setAlertEmailPassLoginCLienteValidate(true); //* muestra la barra de alerta
    setBgAlertEmailPassClienteValidate(false); //* color de fondo del alert
    setBgConfirmEmailPassClient(true); //* variación del fondo segun la condición

    setMsgEmailPassLoginClienteValidate("usuario - contraseña coinciden");

    setCorreoValue("");
    setPasswordValue("");

    //* agregamos la sesion  al navegador
    sessionStorage.setItem(
      "correoLoginCliente",
      resEmailPassClienteLogin.correocliente
    );
    sessionStorage.setItem(
      "sessionCorreoLoginCliente",
      resEmailPassClienteLogin.sessioncliente
    );

    setTimeout(() => {
      setInicioState(false); //*cierra la ventana y vuelva a su valor original

      setAlertEmailPassLoginCLienteValidate(false); //* oculta la barra de alerta

      route.push("/");
    }, 2500);
  };

  return (
    <>
      <div
        className={`relative h-full  flex flex-col justify-start items-center transition-right duration-300  ease-in-out    ${
          loginSwitch
            ? "      w-full right-[0%]  opacity-100"
            : `  ${
                registroSwitch
                  ? " w-[0%]  right-[200%] opacity-0"
                  : "     w-[0%]  -right-[200%] opacity-0"
              }`
        }  

        
     
       
  
          `}
      >
        <button
          onClick={() => {
            setInicioState(false); //* cierra la ventana
            setInicioSwitch(false); //* cambia la primera ventana
            setLoginSwitch(false); //*cambia la segunda ventana

            setAlertEmailPassLoginCLienteValidate(false); //* oculta la barra de alerta
          }}
          className={`absolute w-[30px] h-[45px]  top-0 right-[8px] z-30`}
        >
          <div
            className=" flex justify-center items-center    h-full
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

        <button
          onClick={() => {
            // setInicioState(false);
            setTimeout(() => {
              setCorreoValue("");
              setPasswordValue("");
              setInicioSwitch(false); //* vuelve a la  ventana anterior

              setLoginSwitch(false); //*cambia la ventana actual

              setAlertEmailPassLoginCLienteValidate(false); //* oculta la barra de alerta
            }, 50);
          }}
          className={`absolute w-[25px] h-[25px]  top-[11px] left-[10px] z-30 `}
        >
          <div
            className=" relative   w-[2px] h-[10px]  bg-red-500   transform -rotate-90 left-[10px]  h-full
                  before:content-['']  
                  before:absolute 
                  before:block 
                  before:left-[-4px]
                  before:top-[-3.5px]
                  before:bg-red-500 
                  before:w-[2px]
                  before:h-[12px]
                  before:rotate-[30deg]
                  
                  after:content-['']  
                  after:absolute
                  after:block 
                  after:right-[-4px]
                  after:top-[-3.5px]
                  after:bg-red-500 
                  after:w-[2px]
                  after:h-[12px]
                  after:-rotate-[30deg]
                  "
          ></div>
        </button>

        <form
          onSubmit={(e) => {
            handleLoginFormCliente(e);
          }}
        >
          <div className="flex flex-col justify-center w-[400px]  mt-8 gap-7 ">
            <div className="flex justify-center pt-3 text-lg max-sm:text-sm ">
              Iniciar Sesión
            </div>
            <div className="relative  flex justify-center   max-sm:text-lg">
              <fieldset className=" w-[80%] border-gray-500 border-2 max-sm:w-[80%] ">
                <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                  Correo
                </legend>
                <div className="w-full  pl-[5px] pb-[5px] ">
                  <input
                    className="w-full focus:outline-none text-lg max-sm:text-sm"
                    type="email"
                    onChange={(e) => {
                      setCorreoValue(e.target.value);
                      setAlertEmailPassLoginCLienteValidate(false);
                    }}
                    value={correoValue}
                    name="txtCorreoLogin"
                    id="txtCorreoLogin"
                    placeholder="email@mail.com"
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
                      setPasswordValue(e.target.value);
                      setAlertEmailPassLoginCLienteValidate(false);
                    }}
                    value={passwordValue}
                    name="txtPasswordLogin"
                    id="txtPasswordLogin"
                    placeholder="passwordLogin"
                    autoComplete="off"
                    required
                  />
                </div>
              </fieldset>
            </div>

            {alertEmailPassLoginCLienteValidate && (
              <div className="relative  flex justify-center   max-sm:text-lg">
                <div className=" w-[80%] h-[50px] border-gray-500 border-2 max-sm:w-[80%] ">
                  <div
                    className={`flex justify-center items-center w-full h-full  text-md max-sm:text-sm ${
                      bgAlertEmailPassClienteValidate
                        ? "bg-yellow-200 font-bold text-gray-950"
                        : `${
                            bgConfirmEmailPassClient
                              ? "bg-black font-bold text-white"
                              : "bg-red-500 font-bold text-white"
                          }`
                    }`}
                  >
                    {msgEmailPassLoginClienteValidate}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center text-lg max-sm:text-sm">
              <button className="w-[80%] border-red-700 border-2 h-[40px] text-red-700 font-bold rounded-full">
                Ingresar
              </button>
            </div>
          </div>
        </form>
        <div className="w-full flex justify-end gap-x-3 pr-5 max-sm:pr-10 mt-[100px] max-md:w-[400px]">
          <div className="w-[75%] flex justify-end">
            <h1 className="text-lg max-sm:text-sm">No tienes una cuenta ?</h1>
          </div>
          <div className="w-[25%] text-lg max-sm:text-sm text-red-700 font-bold  ">
            <input
              type="submit"
              onClick={() => {
                console.log(" presionado el boton enviar");

                //*si se cambia  el localCarrito

                // setInicioState(false); //* cierra la ventana
                // setInicioSwitch(false); //* cambia la primera ventana
                // setLoginSwitch(false); //*cambia la segunda ventana
                // route.push("/registrocliente");
                setCorreoValue("");
                setPasswordValue("");
                setLoginSwitch(false); //*cambia la ventana actual
                setRegistroSwitch(true); //* va a la siguiente ventana
                setAlertEmailPassLoginCLienteValidate(false); //* muestra la barra de alerta
              }}
              className=" cursor-pointer max-sm:text-sm "
              value={"Registrate"}
            />
          </div>
        </div>

        {/* <div className="w-[400px] h-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam nisi
          nam accusantium officia vero odio architecto eligendi est? Neque ea
          eaque dolore perferendis tempora nobis facere enim ad laudantium quas.
          Amet totam asperiores voluptatem iusto facere, sunt minus, ad laborum
          reprehenderit temporibus omnis aperiam consectetur modi aspernatur
          sint ullam ab quisquam et? Nihil culpa distinctio quidem sequi ut sit
          esse.
        </div> */}
      </div>
    </>
  );
}
