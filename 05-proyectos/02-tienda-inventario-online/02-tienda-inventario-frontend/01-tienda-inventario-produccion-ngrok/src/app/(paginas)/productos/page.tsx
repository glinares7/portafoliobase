
'use client'
import Link from "next/link";
import Reto from "./reto";


export default function Page() {


  return (
    <>
      <Reto />
      <div>¡Bienvenido a mi productos!</div>
      <Link href="/">volver</Link>
    </>
  );
}
