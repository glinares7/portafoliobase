"use client";
import MenuCuenta from "@/app/components/menu-cuenta";
import { UseContext } from "@/app/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const { cuentaState }: any = useContext(UseContext);
  const route = useRouter();

  return (
    <>
      <div className={` ${cuentaState && "relative z-10"}`}>
        <MenuCuenta />

        <div>¡Bienvenido a mi contactos!</div>
        {/* <Link rel="preload" href="/">volver</Link> */}
        <button onClick={() => route.back()}>volver</button>
        <hr />
        <div>
          <Link rel="preload" href="/contactos/genero">
            nesting genero
          </Link>
        </div>
        <div>
          <Link rel="preload" href="/contactos/signo">
            nesting signo
          </Link>
        </div>
      </div>
    </>
  );
}
