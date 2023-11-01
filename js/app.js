//RENDER GAME AREA
const gameContainer = document.createElement('div')
gameContainer.setAttribute('class', 'game-container')
document.body.append(gameContainer)

const botContainer = document.createElement('div')
botContainer.setAttribute('class', 'bot-container')
gameContainer.append(botContainer)

const playerContainer = document.createElement('div')
playerContainer.setAttribute('class', 'player-container')
gameContainer.append(playerContainer)



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
    document.body.append(notification)
}
playerSelect()

const createShip = (event) => {
    const id = event.currentTarget.id
    if (!checkShips()) {
        playerSquares.forEach(square => {
            if (id === square.id) {
                // console.log(`Match: event id: ${id} - square id; ${square.id}`)
                if(id === '7') {
                    square.style.backgroundColor = 'black'
                    playerObj.ships++
                    return;
                }
                square.style.backgroundColor = 'black'
                playerSquares[parseInt(id) + 1].style.backgroundColor = 'black'
                playerObj.ships++
                console.log(playerObj.ships)
            }
        })
    }
}

const checkShips = () => {
    if (playerObj.ships === 2) {
        console.log("Ships at sea!")
        return true
    } else {
        return false
    }
}

//EVENT LISTENERS
playerSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        // console.log(`clicked! id: ${e.currentTarget.id}`)
        createShip(e)
    })
})