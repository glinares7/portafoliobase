"use client";

import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import menuApp from "../hooks/menu-App";

export default function RegistroCLienteValidation() {
  const {
    setInicioState,
    loginSwitch,
    setLoginSwitch,
    setInicioSwitch,
    registroSwitch,
    setRegistroSwitch,
    registroValidationSwitch,
    setRegistroValidationSwitch,
    registroContrasenaClienteSwitch,
    setRegistroContrasenaClienteSwitch,
    correoValueCliente,
    setCorreoValueCliente,
  }: any = useContext(UseContext);

  const { server } = menuApp();

  const route = useRouter();

  const [correoValidationClienteValue, setCorreoValidationClienteValue]: any =
    useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [alertCorreoCLienteValidate, setAlertCorreoCLienteValidate] =
    useState(false);
  const [msgCorreoClienteValidate, setMsgCorreoClienteValidate] = useState("");

  const [bgAlertClienteValidate, setBgAlertClienteValidate] = useState(false);

  const [bgAlertRegisterSucessValidate, setBgAlertRegisterSucessValidate] =
    useState(false);
  const [
    disableButtonClientRegisterValidate,
    setDisableButtonClientRegisterValidate,
  ] = useState(false);

  const inputCorreoValidateRef = useRef(null);
  let inputElementValidateClienteValue: any = inputCorreoValidateRef.current;

  const handleSubmitValidationCorreoRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("format ->", correoValidationClienteValue);
    console.log(`correo validado => `, correoValueCliente);

    // console.log(
    //   "su valor es string",
    //   typeof Number(correoValidationClienteValue)
    // );

    if (isNaN(correoValidationClienteValue)) {
      console.log("agregamos una alerta");
      setAlertCorreoCLienteValidate(true);
      setMsgCorreoClienteValidate("Debe ser un numero de 6 digitos");
      inputElementValidateClienteValue.focus();
    } else {
      // console.log("su valor es number");
      // console.log("longitud del numero", correoValidationClienteValue.length);
      if (correoValidationClienteValue.length === 6) {
        //* validamos si es nuevo registro o si ya existe
        console.log("ok......");

        //* inicio
        const payloadPasswordClienteValidate = {
          emailcliente: correoValueCliente,
          sessioncliente: correoValidationClienteValue,
        };
        const postCLienteRegisterValidte = await fetch(
          `${server}/emailcliente`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadPasswordClienteValidate),
          }
        );

        const resPostClienteRegisterValidate =
          await postCLienteRegisterValidte.json();

        //*fin

        // const resPostClienteRegisterValidate = {
        //   msg: "prueba a discreción",
        // };

        console.log(
          "resClientRegisterValidate xrs => ",
          resPostClienteRegisterValidate
        );

        if (
          resPostClienteRegisterValidate.msg ===
          "cliente existente - vuelva a registrar"
        ) {
          console.log("llega  o no el mensaje ");
          setAlertCorreoCLienteValidate(true);
          setMsgCorreoClienteValidate(`Usuario existente, vuelva a registrar`);
          setBgAlertClienteValidate(true);
          inputElementValidateClienteValue.focus();

          setDisableButtonClientRegisterValidate(true); //*desactivar botton
          return true;
        }
        if (
          resPostClienteRegisterValidate.msg ===
          "sesion invalida -vuelva a registrar"
        ) {
          setCorreoValidationClienteValue("");
          setAlertCorreoCLienteValidate(true);
          setMsgCorreoClienteValidate(`sesion invalida - vuelva intentar`);
          setBgAlertClienteValidate(true);
          inputElementValidateClienteValue.focus();

          return true;
        }

        if (
          resPostClienteRegisterValidate.msg ===
          "sesion no accesible, vuelva a registrar"
        ) {
          setCorreoValidationClienteValue("");
          setAlertCorreoCLienteValidate(true);
          setMsgCorreoClienteValidate(
            `sesion no accesible- vuelva a registrar`
          );
          setBgAlertClienteValidate(true);
          inputElementValidateClienteValue.focus();
          return true;
        }
        //*registrar usuario

        setAlertCorreoCLienteValidate(true);
        setMsgCorreoClienteValidate(`usuario registrado`);
        setBgAlertClienteValidate(true);

        setBgAlertRegisterSucessValidate(true);

        //* vamos a la nueva ventana para adicionar la contraseña(2 pasos) a la cuenta cliente

        setTimeout(() => {
          // setInicioSwitch(false); //* vuelve a la  ventana anterior
          // setRegistroValidationSwitch(false); //*cambia la ventana actual

          setAlertCorreoCLienteValidate(false); //*local -> quita el alert

          setRegistroValidationSwitch(false); //* oculta a la isquierda la validacion de registro
          setRegistroContrasenaClienteSwitch(true); //* mostrarme verificación de contraseña
        }, 2500);

        //*^inicio
        // setTimeout(() => {
        //   setInicioSwitch(false); //* vuelve a la  ventana anterior
        //   setRegistroValidationSwitch(false); //*cambia la ventana actual

        //   setAlertCorreoCLienteValidate(false); //*local -> quita el alert
        // }, 2500);

        // //*fin
        // console.log("USUARIO REGISTRADO - CLIENTE VALIDATE !!!!!");
      } else {
        console.log("no es un numero de 6 digitos");
        setAlertCorreoCLienteValidate(true);
        setMsgCorreoClienteValidate(
          `Numero de 6 cifras, no de ${correoValidationClienteValue.length} cifra(s)`
        );
        setBgAlertClienteValidate(true);
        inputElementValidateClienteValue.focus();
      }
    }

    setCorreoValidationClienteValue("");
  };

  return (
    <>
      <div
        className={`relative h-full  flex flex-col justify-start items-center transition-right duration-300  ease-in-out    ${
          registroValidationSwitch
            ? "      w-full right-[0%]  opacity-100"
            : `
            ${
              registroContrasenaClienteSwitch
                ? " w-[0%]  right-[400%] opacity-0"
                : " w-[0%]  -right-[400%] opacity-0"
            }
            `
        }  

        
     
       
  
          `}
      >
        <button
          onClick={() => {
            setInicioState(false); //* cierra la ventana
            setInicioSwitch(false); //* cambia la primera ventana
            setLoginSwitch(false); //*cambia la segunda ventana

            setRegistroValidationSwitch(false);

            setAlertCorreoCLienteValidate(false); //*local -> quita el alert

            setDisableButtonClientRegisterValidate(false); //* hablilita el boton registro

            setCorreoValueCliente(""); //* reseteo el valor del correo validation
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
              setCorreoValidationClienteValue("");
              setPasswordValue("");

              setInicioSwitch(false); //* vuelve a la  ventana anterior
              setRegistroValidationSwitch(false); //*cambia la ventana actual

              setAlertCorreoCLienteValidate(false); //*local -> quita el alert

              setDisableButtonClientRegisterValidate(false); //* habilita el boton registro

              setCorreoValueCliente(""); //* reseteo el valor del correo validation
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
            handleSubmitValidationCorreoRegister(e);
          }}
        >
          <div
            className={`flex flex-col justify-center w-[400px]  mt-8 ${
              alertCorreoCLienteValidate ? "gap-3" : "gap-7"
            }`}
          >
            <div className="flex justify-center pt-3 text-lg max-sm:text-sm ">
              Codigo de verificación
            </div>
            <div className="relative  flex justify-center   max-sm:text-lg">
              <fieldset className=" w-[80%] border-gray-500 border-2 max-sm:w-[80%] ">
                <legend className="w-[90px] relative ml-[15px] pl-[5px] text-lg max-sm:text-sm">
                  Verificar
                </legend>
                <div className="w-full  pl-[5px] pb-[5px] ">
                  <input
                    ref={inputCorreoValidateRef}
                    className="w-full focus:outline-none text-lg max-sm:text-sm"
                    type="text"
                    onChange={(e) => {
                      setCorreoValidationClienteValue(e.target.value);
                      setAlertCorreoCLienteValidate(false);
                      setBgAlertClienteValidate(false);
                    }}
                    value={correoValidationClienteValue}
                    name="txtCorreoValidateRegister"
                    id="txtCorreoValidateRegister"
                    placeholder="Codigo enviado a su correo "
                    autoComplete="off"
                    required
                  />
                </div>
              </fieldset>
            </div>

            {alertCorreoCLienteValidate && (
              <div className="relative  flex justify-center   max-sm:text-lg">
                <div className=" w-[80%] h-[50px] border-gray-500 border-2 max-sm:w-[80%] ">
                  <div
                    className={`flex justify-center items-center w-full h-full  text-md max-sm:text-sm ${
                      bgAlertClienteValidate
                        ? bgAlertRegisterSucessValidate
                          ? "bg-black font-bold text-white"
                          : "bg-yellow-200 font-bold text-gray-950"
                        : "bg-red-500 font-bold text-white"
                    }`}
                  >
                    {msgCorreoClienteValidate}
                  </div>
                </div>
              </div>
            )}

            {/* <div className="relative  flex justify-center  max-sm:text-lg">
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
                    }}
                    value={passwordValue}
                    name="txtPasswordLogin"
                    id=""
                    placeholder="txtPasswordLogin"
                    autoComplete="off"
                    required
                  />
                </div>
              </fieldset>
            </div> */}

            <div className="w-full flex justify-center text-lg max-sm:text-sm">
              <input
                type="submit"
                className={`${
                  disableButtonClientRegisterValidate &&
                  "opacity-50 pointer-events-none"
                } w-[80%] bg-red-700 border-2 h-[40px] text-white font-bold rounded-full cursor-pointer`}
                value="Registrar"
              />
            </div>
          </div>

          {/* <div className="w-[400px] flex justify-end gap-x-3 pr-5 max-sm:pr-10 mt-[100px]">
            <h1 className="text-lg max-sm:text-sm">No tienes una cuenta ?</h1>
            <button
              onClick={() => {
                console.log(" presionado el boton enviar");

                //*si se cambia  el localCarrito

                // setInicioState(false); //* cierra la ventana
                // setInicioSwitch(false); //* cambia la primera ventana
                // setLoginSwitch(false); //*cambia la segunda ventana
                // route.push("/registrocliente");
                setCorreoValidationClienteValue("");
                // setPasswordValue("");
                // setLoginSwitch(false); //*cambia la ventana actual
                // setRegistroSwitch(true); //* va a la siguiente ventana
              }}
              className="cursor-pointer max-sm:text-sm"
            >
              <h1 className="text-lg max-sm:text-sm text-red-700 font-bold">
                Registrate
              </h1>
            </button>
          </div> */}
        </form>

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
