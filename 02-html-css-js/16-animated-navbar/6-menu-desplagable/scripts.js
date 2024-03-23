(function(){
    const listElements=document.querySelectorAll('.menu__item--show');
    const list=document.querySelector('.menu__links');
    const menu =  document.querySelector('.menu__hamburger');

    const  objicon=document.querySelector("menu__img-1")
    const Aatrox = document.getElementById("menuimg");
    let imgsvg = 0;

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click',()=>{
                let subMenu =element.children[1];
                let height=0;
                element.classList.toggle('menu__item--active')
                console.log(subMenu.clientHeight);
                if(subMenu.clientHeight === 0){
                    height=subMenu.scrollHeight;
                    console.log(height);
                }
                subMenu.style.height = `${height}px`;
            })
        })
    }

 const deleteStyleHeight = () =>{
     listElements.forEach(element =>{
         if(element.children[1].getAttribute('style')){
            element.children[1].removeAttribute('style');
            element.classList.remove('menu__item--active');
         }
     })
 }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 800){
            deleteStyleHeight(); 
            if(list.classList.contains('menu__links--show')){
                list.classList.remove('menu__links--show')
            }
        }else{
            addClick( )
        }
    });

    if(window.innerWidth <= 800){
        addClick();
    }


    menu.addEventListener('click',()=>{

        list.classList.toggle('menu__link--show');


        // *usar en el pseudoelemento
        if(menu.classList.contains('menu__img-1')){

            menu.classList.add('menu__img--open')
            menu.classList.remove("menu__img-1");
        }else{
            console.log(objicon);
            menu.classList.remove('menu__img--open')
            menu.classList.add("menu__img-1");
        }

// const  AatroxIcon=()=> {
//     imgsvg = imgsvg + 1;
//     if (imgsvg % 2 != 0) {
//         Aatrox.setAttribute("src", "assets/close.svg");
//         menu.classList.add('menu__svg')
//         menu.classList.remove('menu__img')
//     }else{
//         Aatrox.setAttribute("src", "assets/menu.svg");
//         menu.classList.add('menu__img')
        
//     }

// }

// AatroxIcon()

    });
})();


