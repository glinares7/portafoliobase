const header_sticky=document.getElementById('header-sticky')


const medidaObject=header_sticky.offsetTop;

    window.addEventListener('scroll',()=>{
     headerSticky();
  });

  const headerSticky= ()=>{
    let alturaActual=document.documentElement.scrollTop
    //* al mover el scrolll
    //   if(window.scrollY===0 ){
    //* al agregar contenido moviendo el scroll
      if(medidaObject - 150 > alturaActual){
          header_sticky.classList.remove("header-sticky")
      }else{
          header_sticky.classList.add("header-sticky")
 
      }
  }

