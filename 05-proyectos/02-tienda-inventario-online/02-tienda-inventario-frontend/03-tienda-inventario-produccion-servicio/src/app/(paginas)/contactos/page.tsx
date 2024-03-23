'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const route = useRouter()
    return (
        <>
            <div>¡Bienvenido a mi contactos!</div>
            {/* <Link rel="preload" href="/">volver</Link> */}
            <button onClick={() => route.back()}>volver</button>
            <hr />
            <div>
                <Link rel="preload" href="/contactos/genero">nesting genero</Link>
            </div>
            <div>
                <Link rel="preload" href="/contactos/signo">nesting signo</Link>
            </div>
        </>

    );
}