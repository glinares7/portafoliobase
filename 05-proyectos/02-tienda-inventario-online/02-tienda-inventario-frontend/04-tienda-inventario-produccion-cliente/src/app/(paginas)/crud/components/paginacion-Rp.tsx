import React, { useState } from "react";

// import data from "../db/data.json"

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import smartphoneFetch from "../hooks/smartphone-fetch";

interface Props {}

const PaginacionRp: React.FC<Props> = () => {
  const { smartphoneGet } = smartphoneFetch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [idx, setIdx] = useState(0);
  const [smart, setSmart]: any = useState([]);
  const search: any = searchParams.get("page") || 1;

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(smart.length / itemsPerPage);
  const pageRange = 1;

  useEffect(() => {
    if (search) {
      setIdx(search - 1);
    }
  }, [search]);

  useEffect(() => {
    // fetch('http://localhost:3000/smartphone').then(response => response.json()).then(data => setSmart(data))

    (async () => {
      const data = await smartphoneGet();

      setSmart(data);
    })();

    // }, [search, smartphoneGet])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    //* eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  );

  const handlePaginacion = (pa: string, ge: string, page: any) => {
    router.push(pathname + "?" + createQueryString(pa, ge));
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (search <= pageRange + 1) {
      return Array.from(
        { length: Math.min(pageRange * 2 + 1, totalPages) },
        (_, index) => index + 1
      );
    }
    if (search >= totalPages - pageRange) {
      return Array.from(
        { length: pageRange * 2 + 1 },
        (_, index) => totalPages - pageRange * 2 + index
      );
    }
    return Array.from(
      { length: pageRange * 2 + 1 },
      (_, index) => search - pageRange + index
    );
  };

  // console.log("todal actuales", getPageNumbers());log

  return (
    <>
      {/* <button key={i} onClick={() => handlePaginacion("page", `${item}`)}
                className={idx === i ? ' hover:bg-black hover:text-white w-9 h-8  bg-black  text-white' : ' hover:bg-yellow-300  w-9 h-8'}
            >{item}</button> */}

      <div className="flex  flex justify-end  gap-x-1 items-center text-sm underline border-red-700 border-2">
        {search > 1 && (
          <button
            onClick={() =>
              handlePaginacion("page", `${currentPage - 1}`, currentPage - 1)
            }
            className={"  w-9 h-8 "}
          >
            &lt;
          </button>
        )}
        {search > pageRange + 1 && (
          <button
            onClick={() => handlePaginacion("page", "1", 1)}
            className="hover:bg-yellow-300 w-9 h-8"
          >
            1{" "}
          </button>
        )}
        {search > pageRange + 2 && (
          <span
            className={
              " flex justify-center  items-center hover:bg-yellow-300 w-9 h-8 "
            }
          >
            ...
          </span>
        )}

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePaginacion("page", `${page}`, page)}
            className={
              page - 1 === idx
                ? " hover:bg-black hover:text-white w-9 h-8  bg-black  text-white"
                : " hover:bg-yellow-300  w-9 h-8"
            }
          >
            {page}
          </button>
        ))}
        {search < totalPages - pageRange && (
          <span
            className={
              "  flex justify-center  items-center hover:bg-yellow-300 w-9 h-8 "
            }
          >
            ...
          </span>
        )}

        {search < totalPages - pageRange && (
          <button
            onClick={() =>
              handlePaginacion("page", `${totalPages}`, totalPages)
            }
            className={
              totalPages - 1 === idx
                ? " hover:bg-black hover:text-white w-9 h-8  bg-black  text-white"
                : " hover:bg-yellow-300  w-9 h-8"
            }
          >
            {totalPages}
          </button>
        )}
        {search < totalPages && (
          <button
            onClick={() =>
              handlePaginacion("page", `${currentPage + 1}`, currentPage + 1)
            }
            className={"   w-9 h-8  "}
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
};

export default PaginacionRp;
