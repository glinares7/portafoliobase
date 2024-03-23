"use client";
import MenuCuenta from "@/app/components/menu-cuenta";
import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setAuthState, testState, setPerfilAuth, cuentaState }: any =
    useContext(UseContext);

  // const setLogAuth = raiz.setAuthState

  const route = useRouter();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("iniciar sesion cuenta cliente");

    // setAuthState(true)
    // setPerfilAuth(true)
    // router.push('/crud/at')
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("cierre cuenta cliente");

    // setAuthState(false)
    // setPerfilAuth(false)
    // router.push('/')
  };
  return (
    <>
      <div className={` ${cuentaState && "relative z-10"}`}>
        <MenuCuenta />

        {children}
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas totam
          quod aspernatur ipsum debitis, fugiat accusamus voluptatum praesentium
          expedita sunt modi sed quo. Tempora, doloribus labore nam et quasi
          eaque.
        </h1>
        {/* <h2>{raiz.testState}</h2> */}
        <h2>{testState}</h2>
        <button onClick={handleLogin}>login</button>
        <br />
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
}
