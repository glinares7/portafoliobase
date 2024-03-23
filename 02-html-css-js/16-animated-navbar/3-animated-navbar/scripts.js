const open = document.querySelector('.container');

const close= document.querySelector('.close');

let t1= gsap.timeline({defaults: {duration: 1,ease: 'expo.inOut'} });
open.addEventListener('click',()=>{
    if(t1.reversed()){
        t1.play();
    }else{
 
    t1.to('nav',{right:0})
        .to('nav', {height:'100vh'}, '-=.1')
        .to('nav ul li a ', {opacity:1,PointerEvents: 'all', stagger:.2}, '-=.8')
        .to('.close',{opacity:1, PointerEvents: 'all'}, "-=.1")
        .to('nav h2', {opacity:1}, '-=1');
    }
});

close.addEventListener('click', ()=>{
    t1.reverse()
});