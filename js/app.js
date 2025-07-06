/*-------------------------------- Constants --------------------------------*/

const winningCombos=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

/*---------------------------- Variables (state) ----------------------------*/

let turn ="X"
let winner=false
let tie=false
let squareIndex
let combo=[]
/*------------------------ Cached Element References ------------------------*/

const board = [
    '','','',
    '','','',
    '','','']
const squareEls=[...document.querySelectorAll(".sqr")]
const messageEl= document.querySelector("#message")
const resetBtnEl= document.getElementById("reset")

init()
/*-------------------------------- Functions --------------------------------*/

function handleClick (target) {
    if(target.innerText==="O" || target.innerText==="X"|| winner===true) return;
    squareIndex=target.id
    // target.innerText=turn
    // board[squareIndex]="O"
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}
function init (target) 
{
    // console.log("init function")
    for(i=0;i< board.length;i++)
    {
        // console.log(board[i])
        board[i]=''
    }
    turn="X"
    winner=false
    tie=false
    render()
}
function render() 
{
    updateBoard()
    updateMessage()
}

function updateBoard() {
    for(i=0;i< board.length;i++)
    {
        squareEls[i].innerText=board[i]
    }
}

function updateMessage() {
    if(winner===false && tie === false)
    {
        messageEl.innerText=`${turn}'s Turn`
    }
    else if (winner===false && tie ===true)
    {
        messageEl.innerText=`It's a tie!`
    }
    else
    {
        messageEl.innerText=`${turn} won!`
    }
}

function placePiece(index) 
{
    board[index]=turn

}

function checkForWinner()
{
    combo=['','','']
    for(i=0;i<winningCombos.length;i++)
    {
         for(j=0;j<winningCombos[i].length;j++)
        {
            combo[j]=board[winningCombos[i][j]]
        }
        if( combo[0]!=='' && combo[1]===combo[2]&& combo[0]===combo[1])
        {
            
            winner=true
            return
        }
     
    }
}

function checkForTie()
{
    if(winner===true)return;
    tie=true
    for(i=0;i<board.length;i++)
    {
        if(board[i]==='')
        {
            tie=false
            return
        }
    }
}

function switchPlayerTurn()
{
    if(winner===true || tie===true)return;
    else
    {
        if(turn==="X") turn="O"
        else turn="X"
    }
    render()
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square)=>
    {
        square.addEventListener("click",(event)=> handleClick(event.target))
    }
)
resetBtnEl.addEventListener('click',init)
