const previous = document.getElementById('previous');
const next = document.getElementById('next');

const mainHero= document.querySelector('.main__hero')

let cont =1;

previous.addEventListener('click',() =>{
    cont--
    // mainHero.style.backgroundImages = "url('./images/desktop-image-hero-1.jpg')"
    if(cont>0){
      addRemove(cont+1)
      
    }
    if(cont== 0){
        condition(cont+1,3)
    }
})


next.addEventListener('click',() =>{
    cont++
    if(cont<4){
        addRemove(cont-1)
    }
    if(cont== 4){
    condition(cont-1,1)
    }
})


const addRemove = (contVar) =>{
    mainHero.classList.remove('main__hero--'+(contVar))
    mainHero.classList.add('main__hero--'+(cont)+'')

    const mherop=document.querySelector('.main__hero--'+(cont))
    mherop.style.opacity= 1
}

const condition = (contVar,num)=>{
    mainHero.classList.remove('main__hero--'+(contVar))
    cont = num
    
    mainHero.classList.add('main__hero--'+(cont))
    const mherop=document.querySelector('.main__hero--'+(cont))
    mherop.style.opacity= 1
}




