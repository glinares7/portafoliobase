'use client'


import smartphoneApp from "@/app/hooks/smartphone-App";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useEffect } from 'react';
import { useRef } from 'react';

import { useState } from 'react';


// export default function Page() {
//   return(
//     <>
//        <div>¡Bienvenido a mi perfil!</div>
//        <Link href="/">volver</Link>
//        </>
//    );
//   }


const Page: React.FC = () => {
  const dynamicParagRef = useRef<HTMLParagraphElement | null>(null);
  const titleSmartRef = useRef<HTMLParagraphElement | null>(null);

  const params = useSearchParams()
  const router = useRouter()


  const { smartphoneGetOne } = smartphoneApp()
  const [dataGet, setDataGet]: any = useState({})
  const getIdSmart = params.get('id') || 1


  useEffect(() => {


    (async () => {

      const smartGetOneRes = await smartphoneGetOne(getIdSmart)

      const newData = smartGetOneRes[0].title.replace('<br/>', '')
      smartGetOneRes[0].title = newData


      setDataGet(...smartGetOneRes)
    })()


    if (dynamicParagRef.current) {
      const idValue = dynamicParagRef.current;
      const secondLine = idValue.innerHTML.split(".")[1];


      const newElement = ` continuara Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quibusdam veniam consequatur, quo nesciunt quasi quas  <br/> corrupti architecto consequuntur consectetur neque veritatis magnam eligendi ducimus excepturi sunt sed dolorem alias.
       laceat illum?`;
      idValue.innerHTML = idValue.innerHTML.replace(secondLine, newElement);





      // idValue.innerHTML += newElement;


    } else {
      console.log('El elemento es nulo');
    }




    //   function adjustSecondLineSize() {
    //   const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("width"));
    //   const newSize = fontSize * 2; // Ajusta el tamaño como desees
    //   idValue.innerHTML = idValue.innerHTML.replace(secondLine, `todo achorado`);
    // }

    //   // `<small className="bg-red-500">${secondLine}</small>
    //   // adjustSecondLineSize();

    //   window.addEventListener("resize", adjustSecondLineSize);
  }, [getIdSmart, smartphoneGetOne]);





  //* paginación legacy

  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);

  // const data = Array.from({ length: 1200 }, (_, index) => index + 1); // Datos simulados.



  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const pageRange = 3; // Cantidad de páginas a mostrar alrededor de la página actual.

  // const getPageNumbers = () => {
  //   if (currentPage <= pageRange + 1) {
  //     return Array.from({ length: Math.min(pageRange * 2 + 1, totalPages) }, (_, index) => index + 1);
  //   }
  //   if (currentPage >= totalPages - pageRange) {
  //     return Array.from({ length: pageRange * 2 + 1 }, (_, index) => totalPages - pageRange * 2 + index);
  //   }
  //   return Array.from({ length: pageRange * 2 + 1 }, (_, index) => currentPage - pageRange + index);
  // };

  // const renderPage = (page: number) => {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pageData = data.slice(startIndex, endIndex);

  //   return (
  //     <div>
  //       {pageData.map(item => (
  //         <div key={item}>Item {item}</div>
  //       ))}
  //     </div>
  //   );
  // };

  // const renderPagination = () => (
  //   <div>

  //     {currentPage > 1 && (
  //       <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
  //     )}
  //     {currentPage > pageRange + 1 && (
  //       <button onClick={() => setCurrentPage(1)}>1</button>
  //     )}
  //     {currentPage > pageRange + 2 && (
  //       <span>...</span>
  //     )}

  //     {getPageNumbers().map(page => (
  //       <button
  //         key={page}
  //         onClick={() => setCurrentPage(page)}
  //         style={{
  //           margin: '0px 3px',
  //           padding: '0px 5px',
  //           fontWeight: currentPage === page ? 'bold' : 'normal',
  //           backgroundColor: currentPage === page ? "black" : "transparent",
  //           color: currentPage === page ? "white" : "black"
  //         }}
  //       >
  //         {page}
  //       </button>
  //     ))}
  //     {currentPage < totalPages - pageRange && (
  //       <span>...</span>
  //     )}

  //     {currentPage < totalPages - pageRange && (
  //       <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
  //     )}
  //     {currentPage < totalPages && (
  //       <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
  //     )}
  //   </div>
  // );



  return (
    <>
      <div className=" p-4 w-full border-gray-500 border-2">
        <p ref={dynamicParagRef} id="dynamicparag" className="w-full line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit.  Lorem ipsum dolor sit amet consectetur adipisicing  elit Fugiat praesentium delectus nam eaque quis animi at, totam v</p>
      </div>



      {/* paginación legacy */}
      {/* <div className="px-5">
        <h1>Paginación</h1>
        {renderPage(currentPage)}
        {renderPagination()}
      </div> */}

      <br />
      {dataGet && <div ref={titleSmartRef} >titulo : {dataGet.title}</div>}
      {dataGet && <div >offer1 : {dataGet.offer1}</div>}
      {dataGet && <div >offer2 : {dataGet.offer2}</div>}
      {dataGet && <div >current : {dataGet.current}</div>}
      <button onClick={() => router.back()}>volver</button>
    </>
  );
};

export default Page;


//*orimer borrador

// import { useEffect, useRef, useState } from 'react';

// const ParagraphComponent: React.FC = () => {
//   const dynamicParagraphRef = useRef<HTMLParagraphElement>(null);
//   const [secondLine, setSecondLine] = useState<string>('');

//   useEffect(() => {
//     const dynamicParagraph = dynamicParagraphRef.current;
//     const initialContent = dynamicParagraph.innerHTML;
//     const secondLineContent = initialContent.split("<br>")[1];

//     setSecondLine(secondLineContent);

//     function adjustSecondLineSize() {
//       const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("font-size"));
//       const newSize = fontSize * 0.7; // Ajusta el tamaño como desees
//       setSecondLine(`<span style="font-size: ${newSize}px">${secondLineContent}</span>`);
//     }

//     adjustSecondLineSize();

//     window.addEventListener("resize", adjustSecondLineSize);
//   }, []);

//   return (
//     <div className="container mx-auto p-4 max-w-screen-md border border-gray-300">
//       <p ref={dynamicParagraphRef} className="resize-text text-base max-w-full overflow-hidden overflow-ellipsis" dangerouslySetInnerHTML={{ __html: `Este es un ejemplo de un párrafo más largo que se mostrará en dos líneas ...<br />${secondLine}` }} />
//     </div>
//   );
// };

// export default ParagraphComponent;



//*segundo borrador


// 'use client'


// import Link from "next/link";
// import { useEffect } from 'react';
// import { useRef } from 'react';

// import { useState } from 'react';


// export default function Page() {
//   return(
//     <>
//        <div>¡Bienvenido a mi perfil!</div>
//        <Link href="/">volver</Link>
//        </>
//    );
//   }


// const Page: React.FC = () => {
//   const dynamicParagRef = useRef<HTMLParagraphElement | null>(null);


//   useEffect(() => {


//     if (dynamicParagRef.current) {
//       const idValue = dynamicParagRef.current;
//       const secondLine = idValue.innerHTML.split(".")[1];


//       const newElement = ` continuara Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quibusdam veniam consequatur, quo nesciunt quasi quas  <br/> corrupti architecto consequuntur consectetur neque veritatis magnam eligendi ducimus excepturi sunt sed dolorem alias.
//        laceat illum?`;
//       idValue.innerHTML = idValue.innerHTML.replace(secondLine, newElement);


//       // idValue.innerHTML += newElement;


//     } else {
//       console.log('El elemento es nulo');
//     }




//     //   function adjustSecondLineSize() {
//     //   const fontSize = parseFloat(window.getComputedStyle(dynamicParagraph).getPropertyValue("width"));
//     //   const newSize = fontSize * 2; // Ajusta el tamaño como desees
//     //   idValue.innerHTML = idValue.innerHTML.replace(secondLine, `todo achorado`);
//     // }

//     //   // `<small className="bg-red-500">${secondLine}</small>
//     //   // adjustSecondLineSize();

//     //   window.addEventListener("resize", adjustSecondLineSize);
//   }, []);






//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);

//   const data = Array.from({ length: 299 }, (_, index) => index + 1); // Datos simulados.

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const pageRange = 3; // Cantidad de páginas a mostrar alrededor de la página actual.

//   const getPageNumbers = () => {
//     let startPage = Math.max(currentPage - pageRange, 1);
//     let endPage = Math.min(currentPage + pageRange, totalPages);

//     // Asegurarse de que haya suficientes páginas antes y después de la página actual.
//     if (currentPage - startPage < pageRange) {
//       endPage = startPage + pageRange * 2;
//     }
//     if (endPage - currentPage < pageRange) {
//       startPage = endPage - pageRange * 2;
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
//   };

//   const renderPage = (page: number) => {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageData = data.slice(startIndex, endIndex);

//     return (
//       <div>
//         {pageData.map(item => (
//           <div key={item}>Item {item}</div>
//         ))}
//       </div>
//     );
//   };

//   const renderPagination = () => (
//     <div>
//       {currentPage > pageRange + 1 && (
//         <button onClick={() => setCurrentPage(1)}>Inicio</button>
//       )}
//       {getPageNumbers().map(page => (
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           style={{ margin: '5px' }}
//         >
//           {page}
//         </button>
//       ))}
//       {currentPage < totalPages - pageRange && (
//         <button onClick={() => setCurrentPage(totalPages)}>Fin</button>
//       )}
//     </div>
//   );



//   return (
//     <>
//       <div className=" p-4 w-full border-gray-500 border-2">
//         <p ref={dynamicParagRef} id="dynamicparag" className="w-full line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit.  Lorem ipsum dolor sit amet consectetur adipisicing  elit Fugiat praesentium delectus nam eaque quis animi at, totam v</p>
//       </div>




//       <div>
//         <h1>Paginación</h1>
//         {renderPage(currentPage)}
//         {renderPagination()}
//       </div>


//     </>
//   );
// };

// export default Page;
