
const Gameboard = (()=>{

const board = new Array("", "", "", "", "", "", "", "", "");
const getBoard = ()=> board
const displayBoard = function(){
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

const checkGameWinner = function(p1, p2){
    const h2 = document.querySelector("h2");
    
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
    console.log(board)    


    for(let comb of winning_combinations){
        
        if(board[comb[0]]=== board[comb[1]] && board[comb[1]]=== board[comb[2]] && board[comb[0]]!==""){
            console.log("match found")
            console.log(board)
            if(board[comb[0]] === p1.marker){
                h2.textContent = `${p1.name} wins`
            }else{
                h2.textContent = `${p2.name} wins`
            }
            return true
        }
    }
}
const checkBoardFull = function(){
    
    if(!board.includes("")){
        console.log("draw")
        const h2 = document.querySelector("h2");
        h2.textContent = "It's a draw!"
        return true
    }
}

const checkGameOver = function(p1, p2){
    if(checkGameWinner(p1, p2) || checkBoardFull(board))
    return true
}



const endOfGame = function(){
    const boxes = document.querySelectorAll(".box");
    const reset = document.querySelector("#reset");
    boxes.forEach((box)=>{
        box.disabled = true;
    })

}

return {getBoard, displayBoard, checkGameWinner, checkBoardFull, endOfGame, checkGameOver}
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
    Gameboard.displayBoard();
    const player1 = Player("player1", "X")
    const player2 = Player("player2", "O")
    
    
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", ()=>{
    const boxes = document.querySelectorAll(".box")
    const h2 = document.querySelector("h2");
    h2.textContent = ""
    let gameboard = Gameboard.getBoard();
    for(let i = 0; i<9; i++){
        gameboard[i] = ""
    }
    boxes.forEach((box)=>{
        box.textContent = "";
        box.disabled = false
    })

})

const boxes = document.querySelectorAll(".box");
    let gameboard = Gameboard.getBoard()
    boxes.forEach((box)=>{
        box.addEventListener('click', ()=>{
            if(!Gameboard.checkGameOver(player1, player2)){
                if(!gameboard[box.dataset.index]){
                    box.innerText = `${player1.marker}`
                    gameboard[box.dataset.index] = `${player1.marker}`
                    if(Gameboard.checkGameOver(player1, player2)){
                        Gameboard.endOfGame()
                    }else{
                        setTimeout(()=>{
                            player2.randomMove(gameboard);
                            if(Gameboard.checkGameOver(player1, player2)){
                                Gameboard.endOfGame()
                            }     
                        }, 1000
                        
                        )  
                    }
                }else{
                    alert("space is taken")
                }
            
            }else{
                Gameboard.endOfGame()
            }
        })
    })





})()

