let hands = ['<i class="fas fa-hand-rock"></i>', '<i class="fas fa-hand-paper"></i>', '<i class="fas fa-hand-scissors"></i>']
let revealSection = document.getElementById("revealSection")
let choseHandSection = document.getElementById("choseHandSection")
let playerHand = document.getElementById("playerHand")
let robotHand = document.getElementById("robotHand")
let resultText = document.getElementById("resultText")
let playerHandIcon = document.getElementById("playerHandIcon")
let robotHandIcon = document.getElementById("robotHandIcon")
let game = new Game()

function setResultText(text) {
    resultText.innerText = text
}

revealSection.style.display = "none"

Array.from(document.getElementsByClassName("select-hand")).forEach(selectHandEl => {
    let index = selectHandEl.dataset.index
    selectHandEl.addEventListener("click", (event) => {
        game.onHandClick(index)
    })
})

document.getElementById("playAgain").addEventListener("click", () => {
    game.reset()
    choseHandSection.style.display = "flex"
    revealSection.style.display = "none"
    playerHand.classList.remove("winner")
    robotHand.classList.remove("winner")
})

document.getElementById("statsButton").addEventListener("click", () => {
    document.getElementById("win").innerText = game.player.getWin()
    document.getElementById("equalize").innerText = game.player.getEqualized()
    document.getElementById("lose").innerText = game.player.getLose()
    document.getElementById("statsGui").classList.toggle("stats-gui-open")
})

document.getElementById("statsCloseButton").addEventListener("click", () => {
    document.getElementById("statsGui").classList.toggle("stats-gui-open")
})

game.gameEvents.addEventListener("selected_hand", () => {
    choseHandSection.style.display = "none"
    revealSection.style.display = "block"
})

game.gameEvents.addEventListener("result", (event) => {
    let robotHand = event.robot_hand
    let playerHand = event.player_hand
    let equalize = event.equalize
    let playerWin = event.playerWin

    playerHandIcon.innerHTML = hands[playerHand]
    robotHandIcon.innerHTML = hands[robotHand]

    if (equalize) {
        setResultText("égualité")
    } else if (playerWin) {
        setResultText("Victoire")
        document.getElementById("playerHand").classList.add("winner")
    } else {
        setResultText("Défaite")
        document.getElementById("robotHand").classList.add("winner")
    }

})

