//?  inicializamos la libreria AOS
AOS.init();


const menu=document.getElementById('menu');

const menutogle=document.getElementById('menu-togle');

let menu_bar = document.getElementById('menu-bar');


menu_bar.addEventListener('click',()=>{
    menu.classList.toggle('menu-togle')
    
 
})


