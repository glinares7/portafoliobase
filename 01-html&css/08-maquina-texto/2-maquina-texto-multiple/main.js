const maquina1 = document.getElementById('maquina-escribir1')
const maquina2 = document.getElementById('maquina-escribir2')
const maquina3 = document.getElementById('maquina-escribir3')
const maquina4 = document.getElementById('maquina-escribir4')
const maquina5 = document.getElementById('maquina-escribir5')

const maquinaEscribir1 = (text ,tiempo=200, etiqueta ) =>{
    let arrayCaracteres =  text.split('')
    console.log(arrayCaracteres);
    etiqueta.innerHTML= ''
    let cont = 0
    let escribir = setInterval(function(){
        etiqueta.innerHTML += arrayCaracteres[cont]
        cont++
        if(cont == arrayCaracteres.length){
            clearInterval(escribir)
        }
    },tiempo)
}



const maquinaEscribir2 = (text = '',tiempo=200, etiqueta = '') =>{
    let arrayCaracteres =  text.split('')
    console.log(arrayCaracteres);
    etiqueta.innerHTML= ''
    let cont = 0
    let escribir = setInterval(function(){
        etiqueta.innerHTML += arrayCaracteres[cont]
        cont++
        if(cont == arrayCaracteres.length){
            cont = 0
            etiqueta.innerHTML= ''
        }
    },tiempo)


}
const maquinaEscribir3 = (text = '',tiempo=200, etiqueta = '') =>{
    let arrayCaracteres =  text.split('')
    console.log(arrayCaracteres);
    etiqueta.innerHTML= ''
    let i = 0
    let j= text.length
    let escribir = setInterval(function(){
        if(i === arrayCaracteres.length){
            //*retroceder
            etiqueta.innerHTML = text.substring(0,j)
            j--
            if(j === 0){
                i = 0
                etiqueta.innerHTML = ''
                j= text.length
            }
        }else{
            etiqueta.innerHTML +=arrayCaracteres[i ]
            i++
        }
    },tiempo)
}


const maquinaEscribir4 = (text = '',tiempo=200, etiqueta = '') =>{
    let arrayCaracteres =  text.split('')
    etiqueta.innerHTML = ''
    let i = 0
    let escribir = setInterval(function(){
        if(arrayCaracteres[i] === '*'){
            etiqueta.innerHTML += '</br>'
        }else{
            etiqueta.innerHTML += arrayCaracteres[i]
        }

        if(i === arrayCaracteres.length){
            etiqueta.innerHTML = ''
            i = 0
        }
        i++
    },tiempo)
}



maquinaEscribir1("hola-mundo",300,maquina1)

maquinaEscribir2("hola-mundo   ",300,maquina2)

maquinaEscribir3("escribir    ",150,maquina3)


maquinaEscribir3("Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, non quos eum at numquam exercitationem voluptates culpa, harum esse provident doloribus, odio sint voluptate eos suscipit nemo iste nam eligendi Commodi illo unde deserunt expedita velit quisquam nihil quo rerum recusandae culpa numquam, odio repellendus reiciendis itaque nam obcaecati maxime aspernatur vel quas doloribus possimus eveniet nobis consectetur cupiditate! Mollitia!",150,maquina4)


maquinaEscribir4(" * ♦ Honestidad * ♦ Calidad * ♦ Responsabilidad Ambiental ",150,maquina5)
