//RENDER GAME AREA
const mainContainer = document.createElement('div')
mainContainer.setAttribute('class', 'main-container')
document.body.append(mainContainer)

const hitsContainer = document.createElement('div')
hitsContainer.setAttribute('class', 'hits-container')
mainContainer.append(hitsContainer)

const gameContainer = document.createElement('div')
gameContainer.setAttribute('class', 'game-container')
mainContainer.append(gameContainer)

const botContainer = document.createElement('div')
botContainer.setAttribute('class', 'bot-container')
gameContainer.append(botContainer)

const playerContainer = document.createElement('div')
playerContainer.setAttribute('class', 'player-container')
gameContainer.append(playerContainer)

const notificationContainer = document.createElement('div')
notificationContainer.setAttribute('class', 'notification-container')
mainContainer.append(notificationContainer)

const populateBotSquares = () => {
    for (let i = 0; i < 8; i++) {
        const div = document.createElement('div')
        div.setAttribute('class', 'square bot')
        div.setAttribute('id', i)
        botContainer.append(div)
    }
}
populateBotSquares()

const populatePlayerSquares = () => {
    for (let i = 0; i < 8; i++) {
        const div = document.createElement('div')
        div.setAttribute('class', 'square player')
        div.setAttribute('id', i)
        playerContainer.append(div)
    }
}
populatePlayerSquares()

//PROMPT USER TO SELECT SPOTS(2) FOR SHIPS
const playerObj = {
    ships: 0,
    hitsRemaining: 0,
}
const playerSquares = document.querySelectorAll('.player')

const playerSelect = () => {
    const notification = document.createElement('h3')
    notification.setAttribute('class', 'notification')
    notification.innerText = "Select two spots for your ships!"
    notificationContainer.append(notification)
}
playerSelect()

const createShip = (event) => {
    const id = event.currentTarget.id
    if (!checkShips()) {
        playerSquares.forEach(square => {
            if (id === square.id) {
                if (id === '7') {
                    square.setAttribute('class', 'square player ship')
                    square.style.backgroundColor = 'black'
                    playerObj.ships++
                    removeNotification()
                    return;
                }
                square.setAttribute('class', 'square player ship')
                square.style.backgroundColor = 'black'
                playerSquares[parseInt(id) + 1].setAttribute('class', 'square player ship')
                playerSquares[parseInt(id) + 1].style.backgroundColor = 'black'
                playerObj.ships++
                removeNotification()
            }
        })
    }
}

const checkShips = () => {
    if (playerObj.ships === 2) {
        // console.log("Ships at sea!")
        return true
    } else {
        return false
    }
}

const removeNotification = () => {
    if (checkShips()) {
        const notificationLoc = document.querySelector('.notification')
        notificationLoc.remove()
        createBotShips()
    }
}

//CREATE BOT SHIPS
const botObj = {
    ships: 0,
    hitsRemaining: 0,
}
const botSquares = document.querySelectorAll('.bot')

const createBotShips = () => {
    for (let i = 0; i < 2; i++) {
        const rndIdx = Math.floor(Math.random() * (7 - 0) + 0)
        // console.log(rndIdx)
        botSquares.forEach(square => {
            if (rndIdx === parseInt(square.id)) {
                if (rndIdx === 7) {
                    square.setAttribute('class', 'square bot ship')
                    botObj.ships++
                } else {
                    square.setAttribute('class', 'square bot ship')
                    botSquares[rndIdx + 1].setAttribute('class', 'square bot ship')
                    botObj.ships++
                }
            }
        })
    }
    hitsRemaining()
}

//HITS REMAINING CONTAINER
const botHits = document.createElement('h3')
const playerHits = document.createElement('h3')
const hitsRemaining = () => {
    playerSquares.forEach(eachSqaure => {
        if (eachSqaure.classList.contains("ship")) {
            playerObj.hitsRemaining++
        }
    })
    botSquares.forEach(eachSqaure => {
        if (eachSqaure.classList.contains("ship")) {
            botObj.hitsRemaining++
        }
    })
    // console.log(botObj)
    // console.log(playerObj)
    botHits.setAttribute('class', 'bot-hits')
    botHits.innerText = `Enemy hits remaining: ${playerObj.hitsRemaining}`
    hitsContainer.append(botHits)

    playerHits.setAttribute('class', 'player-hits')
    playerHits.innerText = `Player hits remaining: ${botObj.hitsRemaining}`
    hitsContainer.append(playerHits)
    playerTurn()
}

//PLAYER TURN
const playerTurn = () => {
    botSquares.forEach(square => {
        square.addEventListener('click', (e) => {
            // console.log(e.target.classList)
            if (e.target.classList.contains("ship")) {
                // console.log("HIT!")
                e.target.style.backgroundColor = 'red'
                botObj.hitsRemaining--
                playerHits.innerText = `Player hits remaining: ${botObj.hitsRemaining}`
                checkWin()
            }

        })
    })
}

const checkWin = () => {
    console.log("Checking...")
}

//EVENT LISTENERS
playerSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        createShip(e)
    })
})