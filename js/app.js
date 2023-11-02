//RENDER GAME AREA
const mainContainer = document.createElement('div')
mainContainer.setAttribute('class', 'main-container')
document.body.append(mainContainer)

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
                    square.style.backgroundColor = 'black'
                    playerObj.ships++
                    removeNotification()
                    return;
                }
                square.style.backgroundColor = 'black'
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
}
const botSquares = document.querySelectorAll('.bot')

const createBotShips = () => {
    for (let i = 0; i < 2; i++) {
        const rndIdx = Math.floor(Math.random() * (7 - 0) + 0)
        console.log(rndIdx)
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
    //HITS REMAINING
}

//EVENT LISTENERS
playerSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        createShip(e)
    })
})