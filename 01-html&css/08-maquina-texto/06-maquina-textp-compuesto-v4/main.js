class maquinaEscribir{
    constructor(elemento,palabras,espera= 2000){
        this.elemento=elemento;
        this.palabras=palabras;
        this.txt='';
        this.palabrasIndex = 0;
        this.espera = parseInt(espera,10),
        this.escribir();
        this.borrando = false;
    }
    
        
  escribir(){
      
        const actual = this.palabrasIndex % this.palabras.length;
        const textoCompleto = this.palabras[actual];
        
        if(this.borrando){
            this.txt = textoCompleto.substring(0,this.txt.length-1);
        }else{
            this.txt = textoCompleto.substring(0,this.txt.length + 1);
        }
        this.elemento.innerHTML = `<span class="temas">${this.txt}</span>`;

       
   
        let velocidadEscritura = 400;
        if(this.borrando){
            velocidadEscritura/=2;
        }
    

        if(!this.borrando && this.txt=== textoCompleto){
            velocidadEscritura = this.espera;
            this.borrando = true ; 

            // if(this.palabrasIndex == 2){
            //     clearInterval()
            // }       
             

            }else if(this.borrando && this.txt===''){
            this.borrando = false;
            this.palabrasIndex++;
            velocidadEscritura = 500;
           

        }




     const escribir1 =  setTimeout(() =>{
         
       this.escribir()     
  
    },velocidadEscritura)
    
    if(this.palabrasIndex ==this.palabras.length){
        clearInterval(escribir1)
        this.elemento.innerHTML = `<span class="temas1">Bienvenido</span>`;
    }
    }
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const elemento = document.querySelector('.temas');
    const palabras = JSON.parse(elemento.getAttribute('data-palabras'));

    const espera = elemento.getAttribute('data-espera');
    new maquinaEscribir(elemento,palabras,espera);
}