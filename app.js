let player_moves = 0;
let cpu_moves = 0;

const Gameboard = (()=>{
    const createBoard = function(){
        const board = new Array(9);
        return board
    
}
const displayBoard = function(board){
        const container = document.querySelector(".board-container")
        let count = 0
        for(let cell of board){
                const div = document.createElement("div");
                div.classList.add("box");
                div.dataset.index = count;
                div.innerText = "";
                container.appendChild(div);
                count++
        }
}

return {createBoard, displayBoard}
} 
)()

const Player = (name, marker) =>{
    const makeMove = function(board){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.addEventListener("click", ()=>{
            //check if box is empty
            //add marker to box
           if(!board[box.dataset.index]){
            //if the board is null at that position
            box.innerText = `${marker}`;
            board[box.dataset.index] = marker;
            // console.log(board)
            // player_moves++;
            // console.log(player_moves)
           }
           else{
            alert("space unavailable")
           }
            
        })
    })

}

const randomMove = function(board){
    const rand = Math.floor(Math.random() * (board.length -1))
    const boxes = document.querySelectorAll(".box");
   
    if(!board[rand]){
        //console.log(rand)
        for(let box of boxes){
            if(box.dataset.index === rand.toString()){
                console.log("found it")
                box.innerText = `${marker}`;
                board[rand] = marker;
                cpu_moves ++;
                console.log(board)
                    }
            }
        }else{
            randomMove(board)
        }
    }
    return{makeMove, randomMove}
}


//create different players
//play game, alternating player turns
//check game winner
//check if board is full

const gameController = (()=>{
    const gameboard = Gameboard.createBoard();
    Gameboard.displayBoard(gameboard);//should this be passed in? idk
    const player1 = Player("player1", "X")
    const player2 = Player("player2", "O")
    const players = [player1, player2];
    let activePlayer = players[0];
    const switchPlayerTurn = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
        alert("switch")
    }
    const getActivePlayer = ()=> activePlayer;

const playRound = ()=>{
    getActivePlayer().makeMove(gameboard);
    switchPlayerTurn();
    //create functions to check for game winner and whether board is full
    }

return{
     playRound, getActivePlayer
    }

})()


gameController.playRound();






