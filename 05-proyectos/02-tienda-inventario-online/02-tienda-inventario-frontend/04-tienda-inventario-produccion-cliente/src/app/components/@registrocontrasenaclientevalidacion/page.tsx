"use client";
import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import menuApp from "../hooks/menu-App";

export default function RegistroContrasenaClienteValidacion() {
  const {
    setInicioState,
    loginSwitch,
    setLoginSwitch,
    setInicioSwitch,
    registroSwitch,
    setRegistroSwitch,
    registroContrasenaClienteSwitch,
    setRegistroContrasenaClienteSwitch,
    correoValueCliente,
  }: any = useContext(UseContext);

  const route = useRouter();

  const { server } = menuApp();

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

  const handleLoginFormCliente = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("fuente de soda");

    console.log("valor 1", pass1Value);
    console.log("valor2", pass2Value);

    console.log("correo del cliente", correoValueCliente);

    //*validamos si ambas contraseñas coinciden

    if (pass1Value === pass2Value) {
      console.log("las contraseñas son iguales");

      console.log("pass ahora ", pass2Value);

      const payloadPassVerifyRegister = {
        emailcliente: correoValueCliente,
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
          setInicioSwitch(false); //* vuelve a la  ventana anterior
          setRegistroContrasenaClienteSwitch(false); //*cambia la ventana actual

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

    //todo
    //* primero validamos que el estado del usuario creado sea verificado
  };

  return (
    <>
      <div
        className={`relative h-full  flex flex-col justify-start items-center transition-right duration-300  ease-in-out    ${
          registroContrasenaClienteSwitch
            ? "      w-full right-[0%]  opacity-100"
            : `  " w-[0%]  -right-[500%] opacity-0"
                  
              `
        }  

        
     
       
  
          `}
      >
        <button
          onClick={() => {
            setPass1Value("");
            setPass2Value("");

            setInicioState(false); //* cierra la ventana
            setInicioSwitch(false); //* cambia la primera ventana
            // setLoginSwitch(false); //*cambia la segunda ventana

            setRegistroContrasenaClienteSwitch(false); //* retorn la validación de correo a su estado inicial
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
              setPass1Value("");
              setPass2Value("");

              //   setLoginSwitch(false); //*cambia la ventana actual

              setInicioSwitch(false); //* vuelve a la  ventana anterior
              setRegistroContrasenaClienteSwitch(false); //* retorn la validación de correo a su estado inicial
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
              Confirmarción de contraseña
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
                Confirmar
              </button>
            </div>
          </div>
        </form>
        {/* <div className="w-full flex justify-end gap-x-3 pr-5 max-sm:pr-10 mt-[100px] max-md:w-[400px]">
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
              }}
              className=" cursor-pointer max-sm:text-sm "
              value={"Registrate"}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
