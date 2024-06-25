const colorCodeContainer = document.getElementById("color-code");
const optionsContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById('score');
let score = 0;
let randomcolor = null;


function genrateRandomNumberBetween(min, max) {
     return min + Math.floor(Math.random() * (max - min + 1) )
}

function genrateRandomColor() {
    const red = genrateRandomNumberBetween(0, 255);
    const green = genrateRandomNumberBetween(0, 255);
    const blue = genrateRandomNumberBetween(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

// console.log(genrateRandomColor());

function incrementScore() {
    score += 1;
    scoreContainer.innerText = score;
}



function validateResult(el) {
    // console.log(el);
    // console.log(el.target);
    const selectedColor = el.target.style.backgroundColor;
    // console.log(selectedColor);
    if(selectedColor === randomcolor) {
        incrementScore();
    }else {
        score = 0;
    }
    window.localStorage.setItem("score", score)
    startGame();
}

function startGame(){
    score = Number(window.localStorage.getItem('score')) ?? 0;
    scoreContainer.innerText = score; 
    optionsContainer.innerText = null; 
    randomcolor = genrateRandomColor();
    colorCodeContainer.innerText = randomcolor;

    const appIndex = genrateRandomNumberBetween(0, 5);
    
    for(let i = 0; i < 6; i++){
        const div = document.createElement('div');
        div.addEventListener("click", validateResult );
        div.style.backgroundColor = i === appIndex ? randomcolor : genrateRandomColor();
        optionsContainer.append(div);
    }
}

window.addEventListener("load", () => {
    startGame()
})