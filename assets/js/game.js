class GameEvents {
    constructor(game) {
        this.game = game
        this.eventsListener = []
    }

    dispatch(name, event = {}) {
        this.eventsListener.filter(obj => obj.name == name).forEach(value => {
            event["game"] = this.game
            value.event(event)
        })
    }

    addEventListener(name, event) {
        this.eventsListener.push({"name": name, "event": event})
    }
}

class Game {
    constructor() {
        this.gameEvents = new GameEvents(this)
        this.player = new Player(this)
    }

    onHandClick(handIndex) {
        this.player.hand = Number(handIndex)
        this.gameEvents.dispatch("selected_hand")
        this.checkWin()
    }

    checkWin() {
        let equalize = false
        let robotHandIndex = Math.round(Math.random() * (3 - 1))
        let playerHandIndex = this.player.hand

        /**
         *  Pierre = 0
         *  Feuille = 1
         *  Ciseaux = 2
         */

        if (robotHandIndex == playerHandIndex) {
            equalize = true
        }

        let playerWin = (playerHandIndex == 0 && robotHandIndex == 2)
                 || (playerHandIndex == 1 && robotHandIndex == 0)
                 || (playerHandIndex == 2 && robotHandIndex == 1)

        if (equalize) {
            this.player.equalized()
        } else if (playerWin) {
            this.player.winned()
        } else {
            this.player.losed()
        }

        this.gameEvents.dispatch("result", {
            "robot_hand": robotHandIndex,
            "player_hand": playerHandIndex,
            "equalize": equalize,
            "playerWin": playerWin
        })
    }

    reset() {
        this.player.reset()
    }
}

class Player {
    constructor(game) {
        this.game = game
        this.handIndex = -1

        if (localStorage.getItem("equalize") == undefined)
            localStorage.setItem("equalize", "0")
        if (localStorage.getItem("win") == undefined)
            localStorage.setItem("win", "0")
        if (localStorage.getItem("lose") == undefined)
            localStorage.setItem("lose", "0")
    }

    get hand() {
        return this.handIndex
    }

    set hand(value) {
        this.handIndex = value
    }

    reset() {
        this.handIndex = -1
    }

    getEqualized() {
        return Number(localStorage.getItem("equalize"))
    }

    equalized() {
        let equalize = Number(localStorage.getItem("equalize"))
        equalize++
        localStorage.setItem("equalize", `${equalize}`)
    }

    getWin() {
        return Number(localStorage.getItem("win"))
    }

    winned() {
        let win = Number(localStorage.getItem("win"))
        win++
        localStorage.setItem("win", `${win}`)
    }

    getLose() {
        return Number(localStorage.getItem("lose"))
    }

    losed() {
        let lose = Number(localStorage.getItem("lose"))
        lose++
        localStorage.setItem("lose", `${lose}`)
    }
}