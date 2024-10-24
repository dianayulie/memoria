const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const board = document.getElementById('board');
    shuffle(cards);
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.textContent = this.dataset.card;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === cards.length) {
            alert('¡Felicidades! Has encontrado todos los pares.');
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function resetGame() {
    matchedCards = 0;
    const board = document.getElementById('board');
    board.innerHTML = '';
    createBoard();
}

// Inicia el juego al cargar la página
createBoard();
