// show menu
const showmenu=(togleid,navbarId,bodyId) =>{
    const toggle=document.getElementById(togleid),
    navbar =document.getElementById(navbarId),
    bodypadding=document.getElementById(bodyId)
    
    if(toggle && navbar){
        toggle.addEventListener('click',()=>{
            navbar.classList.toggle('show')
            toggle.classList.toggle('rotate')
            bodypadding.classList.toggle('expander')
        })
    }
}

showmenu('nav-toggle','navbar','body')

const linkcolor= document.querySelectorAll('.nav__link')  ;

function colorLink(){
    linkcolor.forEach(l =>l.classList.remove('active'));
    this.classList.add('active')
}

linkcolor.forEach(l => l.addEventListener('click',colorLink));
