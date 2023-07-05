
const Gameboard = (()=>{
    const createBoard = function(){
        const board = new Array("", "", "", "", "", "", "", "", "");
        return board
    
}
const displayBoard = function(board){
        const container = document.querySelector(".board-container")
        let count = 0
        for(let cell of board){
                const btn = document.createElement("button");
                btn.classList.add("box");
                btn.dataset.index = count;
                btn.innerText = "";
                container.appendChild(btn);
                count++
        }
}

const checkGameWinner = function(board){
    const h2 = document.querySelector("h2");
    const box =document.querySelectorAll(".box");
    let boxes = Array.from(box)
    
    const winning_combinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
console.log(board)    // for(let comb of winning_combinations){
    //     if(boxes[comb[0]]=== boxes[comb[1]] && boxes[comb[1]]=== boxes[comb[2]] && boxes[comb[0]].textContent!==""){
    //         console.log("match found")
    //         //console.log(board)
    //         return true
    //     }
    // }


    for(let comb of winning_combinations){
        
        if(board[comb[0]]=== board[comb[1]] && board[comb[1]]=== board[comb[2]] && board[comb[0]]!==""){
            console.log("match found")
            //console.log(board)
            return true
        }
    }
}
const checkBoardFull = function(board){
    return board.every((slot)=>{
        slot!=="";
    })
}

const checkGameOver = function(board){
    if(checkGameWinner(board) || checkBoardFull(board))
    return true
}

const endOfGame = function(board){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.disabled = true;
    })

}
return {createBoard, displayBoard, checkGameWinner, checkBoardFull, endOfGame, checkGameOver}
} 
)()

const Player = (name, marker) =>{
    
const randomMove = function(board){
    
    const boxes = document.querySelectorAll(".box");
    const available = []
    boxes.forEach(box=>{
        if(box.textContent === ""){
            available.push(box)
        }
    })
    
    if(available.length >0){
        const rand = Math.floor(Math.random() * (available.length -1))
        const choice = available[rand];
        choice.innerText = `${marker}`;
        board[choice.dataset.index] = `${marker}`;
    }
}
     return{name, marker, randomMove}
 }


const GameController = (()=>{
    const gameboard = Gameboard.createBoard();
    Gameboard.displayBoard(gameboard);//should this be passed in? idk
    const player1 = Player("player1", "X")
    const player2 = Player("player2", "O")
    const players = [player1, player2];
    let activePlayer = players[0];
    const switchPlayerTurn = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    const getActivePlayer = ()=> activePlayer;
    
    

const boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.addEventListener('click', ()=>{
            if(!Gameboard.checkGameOver(gameboard)){
                if(!gameboard[box.dataset.index]){
                    box.innerText = `${player1.marker}`
                    gameboard[box.dataset.index] = `${player1.marker}`
                    if(Gameboard.checkGameOver(gameboard)){
                        Gameboard.endOfGame(gameboard)
                    }else{
                        setTimeout(()=>{
                            player2.randomMove(gameboard);//this should mot be hard coded 
                        }, 1000)  
                    }
                }else{
                    alert("space is taken")
                }
            
            }else{
                Gameboard.endOfGame(gameboard)
            }
        })
    })





})()

