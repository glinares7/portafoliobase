const mainHamburguer=document.querySelector('.main__nav');
const mainH=document.getElementById('buttonHanburguer');
const buttonClose=document.getElementById('buttonClose');

const size=document.getElementById('size');

const mainLogo=document.querySelector('.main__logo');
const mainLinks=document.querySelector('.main__links');


mainH.addEventListener('click',()=>{
    togleMenuAdd(mainHamburguer, buttonClose, mainLinks)
   
})

buttonClose.addEventListener('click',()=>{
    togleMenuRemove(mainHamburguer, buttonClose, mainLinks)
})

const togleMenuAdd = (a,b,c) =>{
    a.classList.toggle('main__menu--top')
    b.classList.add('main__close--active') 
    c.classList.add('main__links--active')


    size.classList.add('sizef')

    mainH.style.display="none"
}
const togleMenuRemove = (a,b,c) =>{
    a.classList.toggle('main__menu--top')
   b.classList.remove('main__close--active') 
   c.classList.remove('main__links--active')


    size.classList.remove('sizef')

    mainH.style.display="block"
}