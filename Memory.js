

// get start Game button 
let startGame = document.querySelector(".control-buttons span")

// start game to get name and remove splash window
startGame.onclick = () => {
    let nameValue = prompt("Enter your name : ")

    // get container-info children (hello) and set value 
    let hello = document.querySelector(".name span")

    if (nameValue == "" || nameValue == null) {
        hello.appendChild(document.createTextNode("Unknown"))
    } else {
        hello.appendChild(document.createTextNode(nameValue))
    }
    
    document.querySelector(".control-buttons").remove()
}


// get blocks parent and get blocks  set to array
let memoryGame = document.querySelector(".memory-game-blocks")

let arrayFace = Array.from(document.querySelectorAll('.memory-game-blocks .game-block'))

// to get ranges of our arrayFace
let orderRange = [...Array(arrayFace.length).keys()]

shuffle(orderRange)

// set blocks random range
arrayFace.forEach((elements, index) => {
    elements.style.order = orderRange[index]

    elements.onclick = () => flipBlock(elements)
})

// duration
let duration = 2000

function flipBlock(selectedBlock){
    
    selectedBlock.classList.add('is-flipped')

    let flippedBlocks = arrayFace.filter(flipped1Blocks => 
        flipped1Blocks.classList.contains('is-flipped'))

        if (flippedBlocks.length === 2) {
            stopClicking()
            
            checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1])
        }
}





// ====================== FUNCTIONS =============================
// check Matched blocks
function checkMatchedBlocks(firstblock, secondblock){

    // get container-info children wrong tries
    let wrongTries = document.querySelector('.tries span')

    if (firstblock.dataset.technology === secondblock.dataset.technology){
        
        firstblock.classList.remove('is-flipped')
        secondblock.classList.remove('is-flipped')

        firstblock.classList.add('has-match')
        secondblock.classList.add('has-match')

        // aset match audio
        let success = new Audio('audio/match.wav')
        success.play()
        // or play it by dom
        // document.getElementById("success").play()

    }else {
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1
        
        setTimeout(() => {
            firstblock.classList.remove('is-flipped')
            secondblock.classList.remove('is-flipped')
        }, duration)
        
        // set unmatch audio
        let fali = new Audio('audio/unmatch.wav')
        fali.play()
        // or play it by dom
        // document.getElementById("fail").play()
    }
}

// No clicking function 
function stopClicking(){

    memoryGame.classList.add('no-clicking')

    setTimeout(() => {
        memoryGame.classList.remove('no-clicking')
    }, duration)
}

// shuffle blocks range 
function shuffle(array){
    
    let current = array.length,
    random;

    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        
        [array[random], array[current]] = [array[current], array[random]]
    }
    return array
}