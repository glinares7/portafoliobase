"use client";
import { UseContext } from "@/app/contexts/authContext";
import { log } from "console";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

export default function Layout({
  children,
  get,
  post,
  patch,
  remove,
  detalles,
  folder1,
  folder2,
}: {
  children: React.ReactNode;
  get: React.ReactNode;
  post: React.ReactNode;
  patch: React.ReactNode;
  remove: React.ReactNode;
  detalles: React.ReactNode;
  folder1: React.ReactNode;
  folder2: React.ReactNode;
}) {
  // const [dat, setDat] = useState(true)

  const router = useRouter();

  const path = usePathname();
  const [display, setDisplay]: any = useState(false);

  const raiz: any = useContext(UseContext);

  useEffect(() => {
    path.split("/")[0];

    // }, [path]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuth = raiz.authState;

  useLayoutEffect(() => {
    if (!isAuth) {
      // console.log('crud es false 1');

      return redirect("/");
    }
  }, [isAuth]);

  if (!isAuth) {
    return null;
  }

  // if (isAuth) {
  //     console.log('crud es true 2');

  // }

  // const isAuth = false;

  // if (!isAuth) {
  //     return redirect("/");
  // }
  // if (!isAuth) {
  //     return null;
  // }

  const handleSection = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };

  // const loginSegments = useSelectedLayoutSegment('analytics')
  return (
    <>
      {/* <button className="border-blue-500 border-2" >Cambio</button> */}
      <br />
      <div className=" relative flex   flex-row justify-around  text-center border-blue-500 border-2 max-sm:flex-col max-sm:items-center  ">
        <button
          onClick={handleSection}
          className="pr-3 py-3 hidden cursor-pointer  max-sm:block max-sm:w-full max-sm:flex max-sm:justify-end max-sm:transition max-sm:duration-300 max-sm:ease-linear  "
        >
          {display ? (
            <svg
              x-show="open"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              x-show="!open"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <div
          className={`border-blue 500 border-2 flex justify-evenly w-full max-sm:flex max-sm:w-1/2  max-sm:flex-col max-sm:items-start ${
            display
              ? "  max-sm:ransition-transform max-sm:duration-300  max-sm:linear  max-sm:h-[220px] max-sm:overflow-hidden  "
              : "   max-sm:ransition-transform max-sm:duration-300 max-sm:linear max-sm:h-[0px] max-sm:overflow-hidden	"
          }`}
        >
          {/* <Link rel="preload" className='border-red-500 border-2  w-1/2 cursor-pointer  py-2 ' href={'/crud/at'} >get</Link> */}
          {/* <div className='border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1'><Link href={'/crud/at'} >get</Link> </div> */}
          <button
            className="border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1"
            onClick={() => {
              router.push("/crud/at?page=1");
            }}
          >
            get
          </button>

          {/* <Link rel="preload" className='border-red-500 border-2 w-1/2 cursor-pointer  py-2 ' href={'/crud/ax'} >post</Link> */}
          {/* <div className='border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1'><Link href={'/crud/ax'} >post</Link></div> */}
          <button
            className="border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1"
            onClick={() => {
              router.push("/crud/ax");
            }}
          >
            post
          </button>

          {/* <Link rel="preload" className='border-red-500 border-2  w-1/2 h-full cursor-pointer  py-2 ' href={'/crud/aw'} >patch</Link> */}
          {/* <div className='border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1'><Link href={'/crud/aw'} >patch</Link></div> */}

          {/* <button
            className="border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1"
            onClick={() => {
              router.push("/crud/aw");
            }}
          >
            patch
          </button> */}

          {/* <Link rel="preload" className='border-red-500 border-2  w-1/2 cursor-pointer  py-2 ' href={'/crud/az'} >delete </Link> */}
          {/* <div className='border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1'><Link href={'/crud/az'} >delete </Link></div> */}
          {/* <button
            className="border-red-500 border-2 cursor-pointer w-[25%] py-2 max-sm:w-full max-sm:mb-1"
            onClick={() => {
              router.push("/crud/az");
            }}
          >
            delete
          </button> */}
        </div>
      </div>
      {/* <Link href="/crud/at">analytics</Link>
            <br />
        <Link href="/crud/ax">team</Link> */}

      {path.includes("at") ? get : ""}
      {path.includes("ax") ? post : ""}
      {path.includes("aw") ? patch : ""}
      {path.includes("az") ? remove : ""}
      {path.includes("dt") ? detalles : ""}

      {/*  //*Rutas paraleas ejemplo */}
      {/* <div className="flex  justify-around text-center ">
                <div className="border-blue-500 border-2 py-12 w-full">{folder1}</div>
                <div className="border-blue-500 border-2 py-12 w-full ">{folder2}</div>


            </div> */}
      {/* {children} */}
    </>
  );
}
