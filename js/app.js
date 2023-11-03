//RENDER GAME AREA
const mainContainer = document.createElement('div')
mainContainer.setAttribute('class', 'main-container')
document.body.append(mainContainer)

const title = document.createElement('h2')
title.innerText = "Battleship!"
mainContainer.append(title)

const edition = document.createElement('p')
edition.innerText = "Mini Edition"
mainContainer.append(edition)

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

const playAudio = () => {
    const audio = document.querySelector('#audio')
    audio.play()
}

const playWin = () => {
    const audio = document.querySelector('#win')
    audio.play()
}

const playLose = () => {
    const audio = document.querySelector('#lose')
    audio.play()
}

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
                    square.style.backgroundColor = '#262626'
                    playerObj.ships++
                    removeNotification()
                    return;
                }
                square.setAttribute('class', 'square player ship')
                square.style.backgroundColor = '#262626'
                playerSquares[parseInt(id) + 1].setAttribute('class', 'square player ship')
                playerSquares[parseInt(id) + 1].style.backgroundColor = '#262626'
                playerObj.ships++
                removeNotification()
            }
        })
    }
}

const checkShips = () => {
    if (playerObj.ships === 2) {
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
botHits.setAttribute('class', 'bot-hits')
botHits.innerText = `Enemy hits remaining: ${playerObj.hitsRemaining}`
hitsContainer.append(botHits)

const playerHits = document.createElement('h3')
playerHits.setAttribute('class', 'player-hits')
playerHits.innerText = `Player hits remaining: ${botObj.hitsRemaining}`
hitsContainer.append(playerHits)

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
    botHits.innerText = `Enemy hits remaining: ${playerObj.hitsRemaining}`

    playerHits.innerText = `Player hits remaining: ${botObj.hitsRemaining}`
    playerTurn()
}

//PLAYER TURN
const playerTurn = () => {
    botSquares.forEach(square => {
        square.addEventListener('click', (e) => {
            playAudio()
            if (e.target.classList.contains("ship")) {
                const notification = document.createElement('h3')
                notification.innerText = 'Direct hit!'
                notification.style.color = '#84B09D'
                notificationContainer.prepend(notification)
                // e.target.setAttribute('class', 'square bot ship fire')
                e.target.setAttribute('id', 'fire')
                botObj.hitsRemaining--
                playerHits.innerText = `Player hits remaining: ${botObj.hitsRemaining}`
                checkWin()
            } else {
                const notification = document.createElement('h3')
                notification.innerText = 'We missed!'
                notification.style.color = '#FC9D9A'
                e.target.style.backgroundColor = 'ghostwhite'
                notificationContainer.prepend(notification)
                botTurn()
            }
        })
    })
}

const checkWin = () => {
    if (botObj.hitsRemaining === 0) {
        confetti()
        playWin()
        const notification = document.createElement('h3')
        notification.innerText = "WE WON!"
        notification.style.color = 'black'
        notification.style.backgroundColor = '#84B09D'
        notificationContainer.prepend(notification)
    } else {
        botTurn()
    }
}

//BOT TURN
const botTurn = () => {
    const rndIdx = Math.floor(Math.random() * (8 - 0) + 0)
    playerSquares.forEach(square => {
        if (rndIdx === parseInt(square.id)) {
            if (square.classList.contains('fire')) {
                botTurn()
            } else {
                if (square.style.backgroundColor === 'rgb(38, 38, 38)') {
                    const notification = document.createElement('h3')
                    notification.innerText = "Argh! We've been hit!"
                    notification.style.color = '#540032'
                    notificationContainer.prepend(notification)
                    square.setAttribute('class', 'square player ship fire')
                    square.setAttribute('id', 'fire')
                    square.style.backgroundColor = 'red'
                    playerObj.hitsRemaining--
                    botHits.innerText = `Enemy hits remaining: ${playerObj.hitsRemaining}`
                    checkLose()
                } else {
                    const notification = document.createElement('h3')
                    notification.innerText = `The enemy missed - area ${square.id}`
                    notificationContainer.prepend(notification)
                }
            }
        }
    })
}

const checkLose = () => {
    if (playerObj.hitsRemaining === 0) {
        playLose()
        const notification = document.createElement('h3')
        notification.setAttribute('id', 'fire')
        notification.innerText = "MISSION FAILED! We'll get'em next time!"
        notification.style.color = "ghostwhite"
        notificationContainer.prepend(notification)
    }
}

//EVENT LISTENERS
playerSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        playAudio()
        createShip(e)
    })
})