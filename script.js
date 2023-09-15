const gridContainer = document.getElementById('grid');
const easyButton = document.getElementById('easyButton');
const mediumButton = document.getElementById('mediumButton');
const hardButton = document.getElementById('hardButton');

let gridSize = 4;
let cards = [];
let flippedCards = [];
let matches = 0;
let attempts = 0;
let timer;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGrid() {
    gridContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    matches = 0;
    attempts = 0;

    const cardValues = [];
    for (let i = 1; i <= gridSize / 2; i++) {
        cardValues.push(i, i);
    }

    shuffleArray(cardValues);

    for (let i = 0; i < gridSize; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = cardValues[i];
        card.dataset.index = i;
        card.textContent = '?';

        card.addEventListener('click', handleCardClick);
        if (i === gridSize / 2) {
            let br = document.createElement("br");
            gridContainer.appendChild(br);
        }
        gridContainer.appendChild(card);

        cards.push(card);
    }
}

let score = 0; 

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Clicks: ${score}`;
  }

function handleCardClick(event) {
    const card = event.target;
    if (card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.value;

    flippedCards.push(card);

    score++;
    updateScore();

    if (flippedCards.length === 2) {
        attempts++;

        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
            matches++;
            flippedCards = [];

            if (matches === gridSize / 2) {
                clearInterval(timer);
                alert(`Congratulations! You won in ${score} clicks.`);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach((flippedCard) => {
                    flippedCard.classList.remove('flipped');
                    flippedCard.textContent = '?';
                });
                flippedCards = [];
            }, 1000);
        }
    }
}

function resetScore() {
    score = 0;
    updateScore();
}

function startGame() {
    clearInterval(timer);
    createGrid();
    resetScore();

    timer = setInterval(() => {
    }, 1000);
}

easyButton.addEventListener('click', () => {
    gridSize = 4;
    startGame();
});

mediumButton.addEventListener('click', () => {
    gridSize = 6;
    startGame();
});

hardButton.addEventListener('click', () => {
    gridSize = 8;
    startGame();
});

startGame();