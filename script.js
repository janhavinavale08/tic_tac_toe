const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

function handleClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] || checkWinner()) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell)) {
        message.textContent = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
