

    const contenedor_loader= document.querySelector('.contenedor_loader')
    const contenedor_parrafo= document.querySelector('.contenedor_parrafo')


window.addEventListener('load',()=>{

  setTimeout(() => {
    contenedor_loader.style.opacity = 0
    contenedor_loader.style.visivitity = 'hidden'
    contenedor_loader.style.zIndex = -1
  contenedor_parrafo.style.overflow = 'visible'
  }, 5000);
})