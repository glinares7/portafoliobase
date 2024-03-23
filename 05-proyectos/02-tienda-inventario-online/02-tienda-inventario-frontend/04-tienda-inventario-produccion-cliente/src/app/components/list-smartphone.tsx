import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { UseContext } from "../contexts/authContext";
interface Props {
  id: number;
  picture: string;
  title: string;
  from: string;
  offer1: number;
  offer2: number;
  current: number;
}

const ListSmartphone: React.FC<Props> = ({
  id,
  picture,
  title,
  from,
  offer1,
  offer2,
  current,
}) => {
  const search = useSearchParams();
  const parseData = useRef<HTMLParagraphElement | null>(null);

  const [modalImg, setModalImg] = useState(false);

  useEffect(() => {
    if (parseData.current) {
      const idValue = parseData.current;

      // const div = document.createElement('div');
      // div.innerHTML = title

      // const parsedContent = div.innerHTML;
      // idValue.innerHTML = parsedContent;
      idValue.innerHTML = title;
    }
  });

  const { cuentaState, setCuentaState }: any = useContext(UseContext);

  const router = useRouter();

  const handleId = (
    name: string,
    id: string,
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(search.toString());

    params.set(name, id);
    router.push("/detalles" + "?" + params.toString());
  };

  // const pictureConvert = picture.split('/')
  // const picture1 = pictureConvert.at(-2)
  // const picture2 = pictureConvert.at(-1)

  // //* ruta del tunnel localhost:5000
  // const newPicture = `https://nest-online-build.onrender.com/public/img/${picture1}/${picture2}`

  const handleResizeImg = () => {
    if (modalImg) {
      setModalImg(false);
    } else {
      setModalImg(true);
    }
  };

  return (
    <>
      <div
        className={`grid grid-cols-1 grid-rows-[1fr_200px_50px]  border-purple-700 border-2`}
      >
        {modalImg && (
          <div
            className={` absolute z-20 ${
              cuentaState && "z-10"
            }  flex left-0 justify-end w-[75%] max-sm:w-[90%]  cursor-pointer`}
            onClick={handleResizeImg}
          >
            {" "}
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
          </div>
        )}
        {modalImg && (
          <div
            className={`absolute  z-10  ${cuentaState && "z-10"}
            } flex left-0 justify-center w-full h-full   cursor-pointer`}
          >
            {" "}
            {picture.includes(".webp") ||
            picture.includes(".jpeg") ||
            picture.includes(".png") ||
            picture.includes(".jpg") ||
            picture.includes(".svg") ? (
              <Image
                onClick={handleResizeImg}
                width="0"
                height="0"
                sizes="100vw"
                className="w-[100%]  max-w-[550px] h-[100%] max-h-[85%] max-sm:w-[80%] max-sm:max-w-[350px] max-sm:h-[85%]"
                src={picture}
                alt="Picture of the author"
              />
            ) : (
              ""
            )}
          </div>
        )}
        <div className="w-full flex justify-center pt-3 cursor-pointer  max-sm:w-full">
          {picture.includes(".webp") ||
          picture.includes(".jpeg") ||
          picture.includes(".png") ||
          picture.includes(".jpg") ||
          picture.includes(".svg") ? (
            <Image
              onClick={handleResizeImg}
              src={picture}
              width="0"
              height="0"
              sizes="100vw"
              alt="Picture of the author"
              className=" w-[80%] h-[300px] max-sm:h-[210px]"
            />
          ) : (
            ""
          )}
          {picture.includes(".mp4") || picture.includes(".mp3") ? (
            <div className="w-[80%] h-[300px] max-sm:h-[210px]">
              <video
                className="w-full h-full object-cover"
                width={0}
                height={0}
                src={picture}
                controls
              >
                {title}
              </video>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="px-2 py-2  ">
          <div className="w-full  h-12 text-1xl font-bold   ">
            {/* <p className=" text-ellipsis overflow-hidden whitespace-pre	">{title} </p> */}
            <p ref={parseData} className="  line-clamp-2"></p>
          </div>

          <p className="text-base">{from}</p>
          {offer1 != 0 ? (
            <p className="text-sm">S/{offer1} un</p>
          ) : (
            <p className="h-5">{""}</p>
          )}
          {offer2 != 0 ? (
            <p className="text-2xl font-bold text-red-500">S/{offer2} un</p>
          ) : (
            <p className="h-5">{""}</p>
          )}
          {current != 0 ? (
            <p className="text-2xl font-bold text-blue-500">S/{current} un</p>
          ) : (
            <p className="h-8">{""}</p>
          )}
        </div>
        <div className="w-full flex justify-center items-start">
          <input
            type="button"
            onClick={(e) => handleId("id", `${id}`, e)}
            className="w-4/5 font-bold text-white h-10 bg-red-600 rounded-3xl cursor-pointer "
            value="VER DETALLE"
          />
        </div>
      </div>
    </>
  );
};

export default ListSmartphone;
