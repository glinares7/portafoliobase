//?node --version    npm--version

//* npm init -y  

//* npm install @babel/cli @babel/core @babel/polyfill @babel/preset-env @babel/register @babel/register gulp gulp-babel gulp-concat gulp-plumber gulp-uglify --save-dev

//* npm install -g gulp (solo una vez)

//* para integrar babel a otros proyectos se debe  crear la estructura de carpetas dev public 
///*importar los archivos gulpfile.babel.js  package.json  .babelrc y en la terminal npm install

//* Se debe asignar las carpetas JS a sus respectivas carpetas public/js y dev/js

//* En la terminal escribir gulp y hacer los cambios en el js

//? ---------------------------- Elementos donde haremos los cambios  -----------------------

const fila=document.querySelector('.main__contenidocarousel');
const pelicula=document.querySelectorAll('.main__peliculas');

const botonDerecho=document.getElementById('flecha-derecha');
const botonisquierdo=document.getElementById('flecha-isquierda');



window.addEventListener('load',()=>{
    
//? ---------------------------- EVENTOS   -----------------------



//? ---------------------------- INTERACION DE LAS FLECHAS  -----------------------


botonDerecho.addEventListener('click',  ()=>{
    fila.scrollLeft += fila.offsetWidth;

    const nuevo=document.querySelector('.main__buttonind--activo');
    if(nuevo.nextSibling){
        nuevo.nextSibling.classList.add('main__buttonind--activo');
        nuevo.classList.remove('main__buttonind--activo')
    }

    
})


botonisquierdo.addEventListener('click',  ()=>{
    fila.scrollLeft -= fila.offsetWidth;

    const nuevo=document.querySelector('.main__buttonind--activo');
    if(nuevo.previousSibling){
        nuevo.previousSibling.classList.add('main__buttonind--activo');
        nuevo.classList.remove('main__buttonind--activo')
    }
})


//? ---------------------------- CREACION DE LOS BOTONES INDICADORES  -----------------------
const cantidad= Math.ceil(pelicula.length/5);

for (let i = 0; i <cantidad; i++) {
    const boton=document.createElement('BUTTON');
    if(i===0){
        boton.classList.add('main__buttonind--activo')
    } 
    document.querySelector('.main__indicadores').appendChild(boton).classList.add('main__buttonind')
    


boton.addEventListener('mouseenter',()=>{

    boton.addEventListener('click',(e)=>{
        fila.scrollLeft = i * fila.offsetWidth
  document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')
  e.target.classList.add('main__buttonind--activo')


  //? ---------------------------- PARA QUE AL HACER CLICK NO SE MEZCLE CON EL EVENTO SCROLL (REMOVER LISTENER) -----------------------
  
})

fila.removeEventListener('scroll',agre, false);


}) 

//? ---------------------------- CUANDO SE SALE DEL INDICADOR DE BARRAS SE  SIGA MOVIENDO EL SCROLL  -----------------------

document.querySelector('.main__indicadores').addEventListener('mouseleave',()=>{
   
    setTimeout(() => {
        fila.addEventListener('scroll',agre);
    }, 2000);

})


}





//? ---------------------------- EXPANSION DE CASA IMAGEN - PELUCLA   -----------------------

pelicula.forEach(element => {
   element.addEventListener('mouseenter',(e)=>{
    //    console.log(e.target.firstElementChild.firstElementChild.attributes[1].ownerElement.nextSibling.data);
    setTimeout(() => {
        element.classList.add('main__peliculahover')
        
    }, 200);
    element.addEventListener('mouseleave',(e)=>{
        // const imag=e.currentTarget;
      element.classList.remove('main__peliculahover')
        })  
        
    })   

});

//? ---------------------------- MOVER SCROLL SIDEBAR  -----------------------

const cantPeliculas=Math.ceil(pelicula.length/5);


//? ---------------------------- mod  -----------------------


let maxScrollLeft=fila.scrollWidth -fila.clientWidth;
let intervalo=null;

let step=10;

    const start= () =>{
        
        intervalo=setInterval(() => {

        fila.scrollLeft =  fila.scrollLeft + step;
        

            // 4774
        // 3637
    

        if(fila.scrollLeft=== maxScrollLeft){
            step = -15;

     //? ---------------------------- QUITAR EL ELEMENTO ACTIVO AL FINAL DE LA FILA  -----------------------  
            document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')


        }else if(fila.scrollLeft===0){
            step = 10;

            // document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')
            
            document.querySelector('.main__buttonind').classList.add('main__buttonind--activo')

            //? ---------------------------- PARA QUE DE UN INICIO SALTE A LA SIGUIENTE BARRA  -----------------------

         
                fila.addEventListener('scroll',agre)
                
      
        }


    }, 200);

};



const stop= ()=>{
    clearInterval(intervalo);
}


//? ---------------------------- MOV-SCROLL -BARRA -----------------------

const nextE=()=>{

    const nuevo2=document.querySelector('.main__buttonind--activo');
    if(nuevo2.nextSibling){
        nuevo2.nextSibling.classList.add('main__buttonind--activo');
        nuevo2.classList.remove('main__buttonind--activo')
    }
}

//? ---------------------------- SE  ASEGINA LA FUNCION PARA USARLO EN EL REMOVEEVENTLISTER  -----------------------

const agre= ()=>{

    for (let i = 1; i <cantPeliculas; i++) {
        

        if(fila.scrollLeft == (i*fila.offsetWidth)){
            nextE()
        
            }

            //? ---------------------------- Para que  la ultima pelicula tenga esta resta y se note la barra  -----------------------
            
        if(i== cantPeliculas-1){

            if(fila.scrollLeft == (i*fila.offsetWidth - 220)){
                nextE()
             
                }
        }
        
    }
    


}



//? ---------------------------- INICIALIZA LAS IMAGENES AL CARGAR -----------------------

start();



fila.addEventListener('mouseout',()=>{
    start();
})

fila.addEventListener('mouseover',()=>{
    stop();
})


//? ---------------------------- INDICADORES EN LA SECCION DE BARRITAS -----------------------

document.querySelector('.main__indicadores').addEventListener('mouseover',()=>{
    stop();
})
document.querySelector('.main__indicadores').addEventListener('mouseout',()=>{
    start();
})


//? ---------------------------- FLECHAS ISQUIERDA Y DERECHA  -----------------------

botonDerecho.addEventListener('mouseover',()=>{
    stop();
})
botonDerecho.addEventListener('mouseout',()=>{
    start();
})
botonisquierdo.addEventListener('mouseover',()=>{
    stop();
})
botonisquierdo.addEventListener('mouseout',()=>{
    start();
})



//? ---------------------------- REFERENCIA DEL  REMOVEEVENTLISTENER  -----------------------
// https://sebhastian.com/javascript-remove-event-listener/

})