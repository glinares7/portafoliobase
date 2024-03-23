const fila=document.querySelector('.main__contenidocarousel');
const peliculas=document.querySelectorAll('.main__peliculas');


const flechaIsquierda=document.getElementById('flecha-isquierda');
const flechaDerecha=document.getElementById('flecha-derecha');


//? ---------------------------- event listener para la flecha derecha  -----------------------

flechaDerecha.addEventListener('click', (e) =>{
        fila.scrollLeft +=fila.offsetWidth;

        const estadoActivo=document.querySelector('.main__buttonind--activo');
        if(estadoActivo.nextSibling){
            estadoActivo.nextSibling.classList.add('main__buttonind--activo')
            estadoActivo.classList.remove('main__buttonind--activo')
        }
})
flechaIsquierda.addEventListener('click', (e) =>{
        fila.scrollLeft -=fila.offsetWidth;

        const estadoActivo=document.querySelector('.main__buttonind--activo');
        if(estadoActivo.previousSibling){
            estadoActivo.previousSibling.classList.add('main__buttonind--activo')
            estadoActivo.classList.remove('main__buttonind--activo')
        }
})


//? ---------------------------- PAGINACIÓN  -----------------------

const numeroPaginas=Math.ceil(peliculas.length / 5);
    for(let i=0; i<numeroPaginas;i++){
        const indicador=document.createElement('BUTTON');

        
        if(i===0){
            indicador.classList.add('main__buttonind--activo')
            
        }
        
        document.querySelector('.main__indicadores').appendChild(indicador).classList.add('main__buttonind');
        
    
        indicador.addEventListener('click',(e)=>{
                fila.scrollLeft = i * fila.offsetWidth;
                
                document.querySelector('.main__buttonind--activo').classList.remove('main__buttonind--activo');
                e.target.classList.add('main__buttonind--activo');
                
                
            })
            
    }  
    
    
//? ---------------------------- hover  -----------------------
peliculas.forEach((pelicula) =>{
    pelicula.addEventListener('mouseenter',(e)=>{
        const elemento=e.currentTarget;
        setTimeout(() => {
                peliculas.forEach(pelicula => pelicula.classList.remove('main__peliculahover'));
                elemento.classList.add('main__peliculahover');
            },300);
        })
        
        
    })
    
    fila.addEventListener('mouseleave', ()=>{
        peliculas.forEach(pelicula => pelicula.classList.remove('main__peliculahover'));
})