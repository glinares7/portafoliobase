console.clear();


const app = (()=>{
    //? variables
    let body;
    let menu;
    let menuItems;

    //? init función
    const init = () =>{
        //? identificadores DOM
        body=document.querySelector('body');
        menu = document.querySelector('.menu-icon');
        menuItems = document.querySelectorAll('.nav__list-item');
        applyListerners();
    }


    const applyListerners = () =>{
        menu.addEventListener('click',()=> toggleClass(body,'nav-active'));
    }
    //? crea la función togle
    const toggleClass = (element,stringClass) => {
        //? si la clase stringClass existe ?
        if(element.classList.contains(stringClass))
        element.classList.remove(stringClass);
        else
        element.classList.add(stringClass);
    }

    //* inicializa la función
    init();
})();