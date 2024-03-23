
const contePadre =document.querySelector('.conte-padre')
const puntero = document.querySelector('.puntero')
const puntero2 = document.querySelector('.puntero2')
const btn = document.querySelector('.btn')
let btnGrande= false;
// si quieres que el puntero sea más grande
const ladoPuntero = 100
const ladoPunteroGrande = 200

puntero.style.width =ladoPuntero +'px';
puntero.style.height =ladoPuntero +'px';
puntero.style.borderRadius = ladoPuntero + 'px';
puntero2.style.borderRadius = ladoPuntero + 'px';


contePadre.addEventListener('mousemove',(e)=>{
    let lado = btnGrande ? ladoPunteroGrande : ladoPuntero;
    let x = e.pageX
    let y = e.pageY
    puntero.style.top=(y - lado/2) + 'px'
    puntero.style.left=(x - lado/2) + 'px'

})

btn.addEventListener('mouseover',()=>{
    puntero.style.width =ladoPunteroGrande +'px';
    puntero.style.height =ladoPunteroGrande +'px';
    btnGrande=true;
  
})
btn.addEventListener('mouseout',()=>{
    puntero.style.width =ladoPuntero +'px';
    puntero.style.height =ladoPuntero +'px';
    btnGrande=false
})
document.addEventListener('mouseover',() =>{
    puntero.style.display='block'
})
document.addEventListener('mouseout',() =>{
    puntero.style.display='none'
})