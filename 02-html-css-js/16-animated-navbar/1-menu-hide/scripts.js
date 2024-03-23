
    // let ubicacionPrincipal=window.scrollY;
    let ubicacionPrincipal = document.documentElement.scrollTop;

const menu__hide =document.addEventListener('scroll',()=>{
    // let desplazamiento_Actual=window.scrollY;
    let desplazamiento_Actual=document.documentElement.scrollTop;
    if(ubicacionPrincipal >=desplazamiento_Actual){
    document.getElementById('navbar').style.top='0%';
    
}else{
    document.getElementById('navbar').style.top='-100px';
    }
    ubicacionPrincipal= desplazamiento_Actual;

})

menu__hide()

// window.onscroll = function(){
//     let desplazamiento_Actual=window.pageYOffset;
//     console.log(desplazamiento_Actual+'-actual');
//     if(ubicacionPrincipal >=desplazamiento_Actual){
//     document.getElementById('navbar').style.top='0%';
    
// }else{
    
//     document.getElementById('navbar').style.top='-100px';
//     }
//     ubicacionPrincipal= desplazamiento_Actual;

// }