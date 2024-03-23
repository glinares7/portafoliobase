
let progressbar=document.querySelector('.progressbar');

function scrollProgressBar (){
   let  scrollTop = document.documentElement.scrollTop; //lo que avanza el scroll
   let scrollHeight = document.documentElement.scrollHeight; //el alto total
   let clientHeight = document.documentElement.clientHeight; //lo que se ve en pantalla

   let windowHeight= scrollHeight - clientHeight;  //lo restante de la pantalla

   let porcentaje = scrollTop / windowHeight * 100;
   progressbar.style.width=porcentaje + '%';
}


window.addEventListener('scroll',scrollProgressBar)