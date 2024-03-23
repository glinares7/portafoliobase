const contenedor__loader= document.querySelector('.contenedor')

window.addEventListener('load',()=>{
setTimeout(() => {

        contenedor__loader.style.opacity=0
    
        contenedor__loader.style.visivility='hidden' 
}, 3000);
})


