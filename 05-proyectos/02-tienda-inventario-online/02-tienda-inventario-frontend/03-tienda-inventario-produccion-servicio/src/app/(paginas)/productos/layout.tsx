'use client'
import { UseContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setAuthState, testState, setPerfilAuth }: any = useContext(UseContext);

  // const setLogAuth = raiz.setAuthState

  const router = useRouter()

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setAuthState(true)
    setPerfilAuth(true)
    router.push('/crud/at')

  }

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setAuthState(false)
    setPerfilAuth(false)
    router.push('/')


  }
  return (
    <>
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
    </>
  );
}
