"use client";

import { UseContext } from "@/app/contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import userApp from "../login/hooks/user-App";
import MenuCuenta from "@/app/components/menu-cuenta";

export default function Page() {
  const [inpUser, setInpUser]: any = useState("");
  const [inpPass, setInpPass]: any = useState("");

  const {
    server,
    userGetAuth,
    userEncryptOneAuth,
    userGetEncrypt,
    authPostToken,
    authdecryptOneJwt,
    authPostSession,
    authGetSession,
    authGetSessionServerDismiss,
  } = userApp();
  const [httpResError, setHttpResError] = useState(false);
  const [tokenPass, setTokenPass] = useState(false);
  const [textError, setTextError] = useState("");

  const [httpResErrorEncrypt, setHttpResErrorEncrypt] = useState(false);
  const [tokenExp, setTokenExp] = useState(false);

  const [isUser, serIsUser] = useState(false);

  const {
    authState,
    setAuthState,
    setPerfilAuth,
    setUserAuth,
    setCuentaState,
    cuentaState,
  }: any = useContext(UseContext);

  const route = useRouter();

  let resUserGet;
  let resUserGetEncrypt;

  const handleSubmitForm = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    setAuthState(false);
    const usersRes: any = await userGetAuth();

    //* console.log(" datos back", resUserGet);

    resUserGet = usersRes.find((items: any) => items.username == inpUser);

    console.log(" datos back user get ", resUserGet);

    const resBackEncryptGet = await userGetEncrypt();

    resUserGetEncrypt = resBackEncryptGet.find(
      (items: any) => items.username == inpUser && items.encrypt == inpPass
    );

    const resTokenJwt = localStorage.getItem("token");
    const resSessionReq = sessionStorage.getItem("session");

    if (!resUserGet) {
      console.log("usuario no esta en la bd");
      setHttpResError(true);
      setAuthState(false);
    } else {
      if (resUserGetEncrypt) {
        //*token legacy

        if (resTokenJwt) {
          console.log("token", resTokenJwt);

          const resBackEncrypt = await authdecryptOneJwt(
            resUserGet.id,
            resTokenJwt
          );

          console.log("token-back", resBackEncrypt);

          if (authState) {
            if (resBackEncrypt.message === "Token has expired catch") {
              localStorage.removeItem("token");
              // sessionStorage.removeItem("session");
              const resSesionLog = await authGetSessionServerDismiss(
                resSessionReq
              );

              console.log("resSesionLog", resSesionLog);

              setAuthState(false);
              setPerfilAuth(false);
              setTextError("Token expirado");
              setTokenExp(true);
              setInpUser("");
              setInpPass("");
            }

            //todo no aurizado
            if (resBackEncrypt.message === "Token no autorizado middleware") {
              localStorage.removeItem("token");
              // sessionStorage.removeItem("session");
              const resSesionLog = await authGetSessionServerDismiss(
                resSessionReq
              );

              console.log("resSesionLog", resSesionLog);

              setAuthState(false);
              setTextError("Vuelva autenticar ");
              setTokenExp(true);
              setInpUser("");
              resBackEncrypt[0];
              setInpPass("");
            }

            if (resBackEncrypt[0]) {
              //*el usuario ya fue validado

              if (
                resBackEncrypt[0].username === inpUser &&
                resBackEncrypt[0].encrypt === inpPass
              ) {
                console.log("user/contraseña  coinciden encrypt");
                route.push("/crud/at");
                setAuthState(true);
                setPerfilAuth(true);

                setHttpResError(false);
                serIsUser(true);
                setUserAuth({
                  id: resBackEncrypt[0].id,
                  username: resBackEncrypt[0].username,
                  userpass: resBackEncrypt[0].encrypt,
                  perfil: resBackEncrypt[0].perfil,
                });
              } else {
                console.log("contraseña no coinciden encrypt");
                setAuthState(false);

                serIsUser(false);
                setUserAuth({
                  id: "",
                  username: "",
                  userpass: "",
                  perfil: "",
                });
              }
            }
          }

          console.log(authState);
        } else {
          const pld = {
            password: inpPass,
          };

          const resTokenPost = await authPostToken(resUserGetEncrypt.id, pld);

          const resBackEncryptPass = await authdecryptOneJwt(
            resUserGet.id,
            resTokenPost.token
          );

          localStorage.setItem("token", resTokenPost.token);

          authPostSession;

          setUserAuth({
            id: resBackEncryptPass[0].id,
            username: resBackEncryptPass[0].username,
            userpass: resBackEncryptPass[0].encrypt,
            perfil: resBackEncryptPass[0].perfil,
          });
          setTokenPass(true);
          setInpUser("");
          setInpPass("");

          setTimeout(() => {
            setAuthState(true);
            setPerfilAuth(true);
            route.push("/crud/at");
          }, 2000);
        }

        //*REPARAR
        if (resSessionReq) {
          console.log("la session existe");

          const resSesionGet = await authGetSession(resSessionReq);
          if (resSesionGet.msg === "no tiene sesion - server down") {
            console.log("dataResSessionGet", resSesionGet);

            sessionStorage.removeItem("session");
            const resSessionAuth: any = sessionStorage.getItem("session");
            if (!resSessionAuth) {
              console.log("generando la sesion");

              const pldSession = {
                password: inpPass,
              };

              const resSessionPost = await authPostSession(
                resUserGetEncrypt.id,
                pldSession
              );

              console.log("session-back", resSessionPost);

              sessionStorage.setItem("session", resSessionPost.session);
            }
          }

          if (resSesionGet.msg === "sesion no valida") {
            console.log("dataResSessionGet", resSesionGet);
          }

          if (Array.isArray(resSesionGet)) {
            console.log("dataResSessionGet", resSesionGet);
          }
        } else {
          console.log("generando la sesion");

          const pldSession = {
            password: inpPass,
          };

          const resSessionPost = await authPostSession(
            resUserGetEncrypt.id,
            pldSession
          );

          console.log("session-back", resSessionPost);

          sessionStorage.setItem("session", resSessionPost.session);
          // }
        }
      } else {
        setAuthState(false);
        setPerfilAuth(false);
        setHttpResErrorEncrypt(true);
      }
    }
  };

  const handleRegister = () => {
    route.push("/registrocliente");
  };

  return (
    <>
      <div className={` ${cuentaState && "relative z-10"} `}>
        <MenuCuenta />
        <div
          className="border-red-500 border-2
            flex   w-full  h-[calc(100vh-64px)]  justify-center items-center "
        >
          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col border-green-500 border-2  w-[25%] h-[60%] min-w-[250px] min-h-[250px]   max-sm:w-[70%] max-sm:min-w-[200px] max-lg:w-[60%] max-xl:w-[55%]"
          >
            <div className="flex justify-center  items-center w-full h-[15%] border-red-500 border-2">
              <div className="flex items-center  justify-center w-full h-[50%]  border-green-500 border-2">
                <h1 className=" text-center">Iniciar Sesión</h1>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full h-[65%] border-red-500 border-2">
              <div className="flex flex-col w-full h-[25%] min-h-[60px]  border-green-500 border-2">
                <label
                  id="textNombre"
                  className="flex justify-start items-center h-full border-blue-500 border-2 text-center"
                >
                  Usuario:
                </label>
                <input
                  className="h-full"
                  type="text"
                  name="TextNombre"
                  id="textNombre"
                  placeholder="user@mail.com"
                  value={inpUser}
                  onChange={(e) => {
                    setInpUser(e.target.value);
                    setHttpResError(false);
                    setHttpResErrorEncrypt(false);
                    setTokenPass(false);
                    setTokenExp(false);
                  }}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col   h-[25%] min-h-[60px]   border-green-500 border-2">
                <label
                  id="textPassword"
                  className="flex justify-start items-center h-full border-blue-500 border-2 text-center"
                >
                  Contraseña:
                </label>
                <input
                  className="h-full"
                  type="password"
                  name="textPassword"
                  id="textPassword"
                  value={inpPass}
                  onChange={(e) => {
                    setInpPass(e.target.value);
                    setHttpResError(false);
                    setHttpResErrorEncrypt(false);
                    setTokenPass(false);
                    setTokenExp(false);
                  }}
                  required
                  autoComplete="off"
                />
              </div>
              {httpResError && (
                <div className="bg-orange-600 text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                  <p>Usuario no registrado</p>
                </div>
              )}
              {httpResErrorEncrypt && (
                <div className="bg-red-600 text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                  <p>Usuario /contraseña no valido</p>
                </div>
              )}
              {tokenPass && (
                <div className="bg-black text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                  <p>Token generado</p>
                </div>
              )}
              {tokenExp && (
                <div className="bg-yellow-400 text-back flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                  <p>{textError}</p>
                </div>
              )}

              {isUser && (
                <div className="bg-blue-600 text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                  <p>Usuario/contraseña coincidente</p>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center gap-4 w-full h-[20%] border-red-500 border-2">
              <div className="flex items-center  justify-center w-[40%] h-[40%] min-h-[30px] max-sm:h-[50%] border-blue-500 border-2 ">
                <input
                  className="border-green-500 border-2 cursor-pointer w-full h-full"
                  type="submit"
                  value="Ingresar"
                  onClick={(e: any) => {
                    // console.log("e interno", e.target.form[0].value);
                    // console.log("e interno", e.target.form[1].value);

                    if (e.target.form[0].value && e.target.form[1].value) {
                      setAuthState(true);
                      // route.push('/crud/at')
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-center w-[40%] h-[40%] min-h-[30px]  max-sm:h-[50%] border-blue-500 border-2 ">
                <input
                  className="border-green-500 border-2 cursor-pointer w-full h-full"
                  type="submit"
                  value="Salir"
                  onClick={() => {
                    setCuentaState(false);
                    setAuthState(false);
                    route.push("/");
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end pr-1">
              <h1 className="text-md max-sm:text-sm">
                ¿Tienes una cuenta?{" "}
                <button onClick={handleRegister}>
                  <span className="text-red-500">Registrate</span>
                </button>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
