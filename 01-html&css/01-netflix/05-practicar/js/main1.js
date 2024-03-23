//? ---------------------------- Elementos donde haremos los cambios  -----------------------

const fila=document.querySelector('.main__contenidocarousel');
const pelicula=document.querySelectorAll('.main__peliculas');

const botonDerecho=document.getElementById('flecha-derecha');
const botonisquierdo=document.getElementById('flecha-isquierda');



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
    
    boton.addEventListener('click',(e)=>{
            fila.scrollLeft = i * fila.offsetWidth
      document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo')
      e.target.classList.add('main__buttonind--activo')
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

