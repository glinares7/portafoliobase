"use client";

import { UseContext } from "@/app/contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import userApp from "./hooks/user-App";

export default function Page() {
  const [inpUser, setInpUser]: any = useState("");
  const [inpPass, setInpPass]: any = useState("");

  const [fieldNull, setFieldNull] = useState(false);
  const [postAuth, setPostAuth] = useState(false);
  const [httpError, setHttpError] = useState(false);

  const { userPostAuth } = userApp();

  const { authState, setAuthState }: any = useContext(UseContext);

  const route = useRouter();

  useEffect(() => {
    if (!authState) {
      return redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authState) {
    return null;
  }

  const handleSubmitForm = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    console.log("boton enviar user", inpUser);
    console.log("boton enviar password", inpPass);

    // resUserGet = usersRes.find((items: any) => (
    //     // console.log(`valor ${i} usuario ${items.username} y  ${items.userpass}`);
    //     items.username == inpUser && items.userpass == inpPass
    // ))

    // console.log(" datos back", resUserGet);

    if (inpUser.trim() == "" || inpPass.trim() == "") {
      console.log("campos vacio(s)");

      setFieldNull(true);
    } else {
      const payload = {
        username: inpUser.trim(),
        userpass: inpPass.trim(),
      };

      const userPostRes = await userPostAuth(payload);

      console.log("postBack", userPostRes);

      if (!authState) {
        if (userPostRes.statusCode === 500 || 400) {
          setPostAuth(false);
          setHttpError(true);
        }

        if (!userPostRes.statusCode) {
          setPostAuth(true);
          setHttpError(false);
          route.push("/login");
        }
      }
    }

    console.log(authState);

    // setAuthState(true)
  };

  return (
    <>
      <div
        className="border-red-500 border-2
            flex   w-full  h-[calc(100vh-64px)]  justify-center items-center"
      >
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col border-green-500 border-2  w-[25%] h-[60%] min-w-[250px] min-h-[250px]   max-sm:w-[70%] max-sm:min-w-[200px]"
        >
          <div className="flex justify-center  items-center w-full h-[15%] border-red-500 border-2">
            <div className="flex items-center  justify-center w-full h-[50%]  border-green-500 border-2">
              <h1 className=" text-center">Registro de Usuario</h1>
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
                  setPostAuth(false);
                  setHttpError(false);
                  setFieldNull(false);
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
                  setPostAuth(false);
                  setHttpError(false);
                  setFieldNull(false);
                }}
                required
                autoComplete="off"
              />
            </div>

            {postAuth && (
              <div className="bg-green-600 text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                <p>Usuario creado</p>
              </div>
            )}
            {httpError && (
              <div className="bg-red-500 text-white flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                <p>Usuario existe / no connect</p>
              </div>
            )}
            {fieldNull && (
              <div className="bg-yellow-400 text-black flex flex-col justify-center items-center   h-[10%] min-h-[45px]   border-green-500 border-2">
                <p>Campo vacio(s)</p>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-4 w-full h-[20%] border-red-500 border-2">
            <div className="flex items-center  justify-center w-[40%] h-[40%] min-h-[30px] max-sm:h-[50%] border-blue-500 border-2 ">
              <input
                className="border-green-500 border-2 cursor-pointer w-full h-full"
                type="submit"
                value="Registrarse"
                onClick={(e: any) => {
                  // console.log("e interno", e.target.form[0].value);
                  // console.log("e interno", e.target.form[1].value);

                  if (e.target.form[0].value && e.target.form[1].value) {
                    setAuthState(false);
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
                  setAuthState(false);
                  route.back();
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
