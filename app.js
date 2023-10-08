const winCombinations = [[1,2,3],
                          [4,5,6],
                          [7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

const tiles = document.querySelectorAll('#grid div')
const score = document.querySelector('#score')
const mark = ['O','X']
let index = 0
let clickCntr = 0
let winner = ''

function createGrid() {
    for(i=1; i<10; i++){
        let tile = document.getElementById(i)
        tile.addEventListener('click', markXO)

    }
}

function markXO(){
    clickCntr++
    index = 1 - index
    if(clickCntr === 9){
        // alert(`Its a draw`) //-->its not good to use alert function here as it is synchronous processing---this would show the warning "[Violation] 'click' handler took 1716ms" as the result of the click event will have to wait till we make the alert disappear
        displayScore()
    }
    this.textContent = mark[index]
    this.removeEventListener('click',markXO)
    checkScore()
}

function checkScore(){    
    winCombinations.forEach(singleCombination => {
        const XWins = singleCombination.every(element => tiles[element-1].textContent === 'X')
        const OWins = singleCombination.every(element => tiles[element-1].textContent === 'O')
        if(XWins){
            console.log("X wins")
            winner = 'X'
            displayScore(winner)
        }
        else if(OWins){
            winner = 'O'
            displayScore(winner)
        }
    });
}

function displayScore(winner){
    tiles.forEach(tile => tile.removeEventListener('click',markXO))
    const scorePara = document.createElement('p')
    const msg = document.createElement('p')
    if(winner === 'X' || winner ==='O')
        scorePara.textContent = `Congratulations! ${winner} is the Winner`
    else if(clickCntr === 9)
        scorePara.textContent = `Game Over!`
    msg.textContent = `Restarting the game...`
    score.append(scorePara, msg)
    setTimeout(()=>{
        location.reload()
    }, 2000)
}

createGrid()

