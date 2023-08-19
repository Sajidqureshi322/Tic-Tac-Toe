const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid =  ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";   
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();
function checkGameOver(){
    let ans = "";
    winningPosition.forEach((arr) => {
        if(gameGrid[arr[0]] != "" && gameGrid[arr[0]] == gameGrid[arr[1]] && 
            gameGrid[arr[1]] == gameGrid[arr[2]]){

            if(gameGrid[arr[0]] == "X")
                ans = "X";
            else
                ans = "O";

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            boxes[arr[0]].classList.add("win");
            boxes[arr[1]].classList.add("win");
            boxes[arr[2]].classList.add("win");
        }
    });
    if(ans != ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }
    //agar grid full hogyi ho aur ans nhi mila 
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!= ""){
            fillCount++;
        }
    });
    if(fillCount == 9){
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }
}
function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;     
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();

        checkGameOver();
    }
}
boxes.forEach((box,index) =>{
    box.addEventListener('click',()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener('click',initGame);
