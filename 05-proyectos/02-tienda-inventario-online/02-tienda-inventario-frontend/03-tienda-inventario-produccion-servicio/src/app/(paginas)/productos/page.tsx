"use client";
import Link from "next/link";
import Reto from "./reto";
import { useContext, useEffect } from "react";
import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { authState, userAuth }: any = useContext(UseContext);

  const route = useRouter();

  useEffect(() => {
    console.log("la vida es asi", userAuth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Reto />
      <div>¡Bienvenido a mi productos!</div>
      {authState ? <h1>datos true 1</h1> : <h1>datos false 2</h1>}
      {/* <Link rel="preload" href="/">volver</Link> */}
      <button onClick={() => route.back()}>volver</button>
    </>
  );
}
