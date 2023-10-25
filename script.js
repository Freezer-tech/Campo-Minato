/* ------------------
FASE DI PREPARAZIONE
-------------------- */

const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainView = document.querySelector('.end-game-screen-nostyle')


const playAgainButtonBoard = document.querySelector('.play-again-board'); // by Elijah
const playAgainButton = document.querySelector('.play-again');
const showBoardButton = document.querySelector('.show-board');
const playAgainShow = document.querySelector('.show');

const audioWin = new Audio("./audio/dracarys.mp3");
const audioGameover = new Audio("./audio/timeiscome.mp3");


const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
const totalTreasures = 1; 
const treasureList = [];
let score = 0;
let isEnd = false;
let isShow = true;

while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) {
        bombsList.push(number);
        console.log('Bomba in posizione: ' + number);
    }
}

while (treasureList.length < totalTreasures) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!treasureList.includes(number) && !bombsList.includes(number)) {
        treasureList.push(number);
        console.log('Tesoro posizionato alla cella numero: ' + number);
    }
}

/* ---------------------
GRIGLIA E LOGICA DI GIOCO
------------------------*/

let isCellEven = false;
let isRowEven = false;


for (let i = 1; i <= 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;
    
    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');
    
    if (i % 10 === 0) isRowEven = !isRowEven;
    
    cell.addEventListener('click', function(){
        if (isShow === true){
            if(cell.classList.contains('cell-clicked')) return;
    
            if (bombsList.includes(i)) {
                cell.classList.add('cell-bomb');
                endGame(false);
            } else if (treasureList.includes(i)) {  
                cell.classList.add('cell-treasure');
                scoreCounter.innerText = String(99999)
                endGame(true);
            } else {
            cell.classList.add('cell-clicked');
            updateScore();
            }
        }
    });
    grid.appendChild(cell);
}


/*--------------
FUNZIONI
---------------*/
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(4, 0);
        
    if (score === maxScore) endGame(true);
}

function endGame(isVictory) {
    if(isVictory === true){
        endGameScreen.classList.add('win');
        endGameScreen.classList.add('win-buttons');
        endGameText.innerHTML = 'YOU<br>WIN';
            if (!audioWin) {
                audioWin = new Audio("./audio/dracarys.mp3");
              }
            audioWin.play();
            revealAllBombs();
            isEnd = true;
    } else {
        if (!audioGameover) {
             audioGameover = new Audio("./audio/timeiscome.mp3");
            }
            audioGameover.play();
            revealAllBombs();
            isEnd = true;
    }
    endGameScreen.classList.remove('hidden');
}

function playAgain(){
    audio.loop = true;
    location.reload();
}

function revealAllBombs(){
    const cells = document.querySelectorAll('.cell');
    for(let i = 0; i <=  cells.length; i++){
        if(bombsList.includes(i+1)){
            const cellToReveal = cells[i];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}

function showboard(){
    endGameScreen.classList.add("hidden");
    playAgainView.classList.remove("hidden");
    isView = false;
}

    /* -----------------
    EVENTI
    ------------------*/
    playAgainButton.addEventListener('click', playAgain);   
    playAgainButtonBoard.addEventListener('click', playAgain);
    showBoardButton.addEventListener('click', showboard);