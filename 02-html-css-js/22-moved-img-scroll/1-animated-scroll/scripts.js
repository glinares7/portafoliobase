
let animado=document.querySelectorAll(".animado");


function mostrarScroll () {
    //? cuado se desplazo el elemento
    let scrollTop = document.documentElement.scrollTop;

    for(let  i=0;i<animado.length; i++){
        //?  cual es la medida del inicio al elemento
        let alturaAnimado =animado[i].offsetTop;
        if(alturaAnimado - 580 < scrollTop){
            animado[i].style.opacity = 1 ;
            animado[i].classList.add("mostrarArriba");

        }
    }
}

window.addEventListener('scroll', mostrarScroll);