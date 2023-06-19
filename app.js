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
const makeMove = function(marker, board){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.addEventListener("click", ()=>{
            //check if box is empty
          //add marker to box
           if(!board[box.dataset.index]){
            box.innerText = `${marker}`;
            board[box.dataset.index] = marker;
            console.log(board)
           }else{
            alert("space unavailable")
           }
            
        })
    })

}

const randomMove = function(marker, board){
    const rand = Math.floor(Math.random() * (board.length -1))
    const boxes = document.querySelectorAll(".box");
   
    if(!board[rand]){
        //console.log(rand)
        for(let box of boxes){
            if(box.dataset.index === rand.toString()){
                console.log("found it")
                box.innerText = `${marker}`;
                board[rand] = marker;
                console.log(board)
                    }
            }
        }else{
            randomMove(marker, board)
        }
    }
         
//check game winner



return {createBoard, displayBoard, makeMove, randomMove}
} 
)()


const gameboard = Gameboard.createBoard();
Gameboard.displayBoard(gameboard);
Gameboard.makeMove("X",gameboard);
Gameboard.randomMove("O", gameboard);



