const preloader = document.querySelector(".preloader");

window.addEventListener("load",removePreloader);

function removePreloader(){
   setTimeout(() => {
    preloader.classList.add("end-preloader"); 
   }, 3000);
}



