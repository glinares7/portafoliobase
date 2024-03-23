"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"


export default function Page({ params }: { params: { slug: string } }) {

    const router = useRouter()
    return (
        <>
            <div>Bienvenido al {params.slug} dinamico</div>
            <button onClick={() => router.back()}>volver</button>
        </>
    )
}