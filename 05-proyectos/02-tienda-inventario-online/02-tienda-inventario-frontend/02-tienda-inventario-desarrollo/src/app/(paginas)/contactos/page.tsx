import Link from "next/link";

export default function Page() {
    return (
        <>
            <div>¡Bienvenido a mi contactos!</div>
            <Link href="/">volver</Link>
            <hr />
            <div>
                <Link href="/contactos/genero">nesting genero</Link>
            </div>
            <div>
                <Link href="/contactos/signo">nesting signo</Link>
            </div>
        </>

    );
}