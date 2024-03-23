const textDisplay = document.getElementById('text')

const phrases = ['Hello, my name is Ania.', 'I love to code.','I love to teach.']

let i = 0
let j = 0
let currentPhrase = []
let isDeleting =false
let isEnd = false


function loop (){
    isEnd = false
    textDisplay.innerHTML= currentPhrase.join('')
    if(i< phrases.length){
        // console.log(phrases[i]);

        if(!isDeleting  && j <=phrases[i].length){
            // console.log(phrases[i][j])
            currentPhrase.push(phrases[i][j])
            j++
            textDisplay.innerHTML= currentPhrase.join('')
            // console.log('add a letter ')
        }
        
        if(isDeleting && j<= phrases[i].length){
            currentPhrase.pop(phrases[i][j])
            j--
            textDisplay.innerHTML= currentPhrase.join('')
            // console.log('remove a letter ')
        }

        if(j == phrases[i].length){
            isEnd = true
            isDeleting = true
            // i++
        }

        if(isDeleting && j === 0){
            currentPhrase = []
            isDeleting = false
            i++

            if( i == phrases.length){
                i = 0
            }
        }
    }
    const speedUp = Math.random() * (80 - 50) + 50
    const normalSpeed = Math.random() * (300 -200) + 200
    const time = isEnd ? 2000 : isDeleting  ? speedUp : normalSpeed
    setTimeout(loop, time)
}

loop()