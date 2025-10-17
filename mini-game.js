/* Mini game code*/

let targetNumber;
let guessesLeft;

// Get references to the HTML elements
const gameContainer = document.getElementById('gameContainer');
const gameStatus = document.getElementById('gameStatus');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const gameResetButton = document.getElementById('gameResetButton');

function initGame() {
    // Generate a new random number between 1 and 10
    targetNumber = Math.floor(Math.random() * 10) + 1;
    guessesLeft = 3;
    gameStatus.textContent = `1から10までの数字を当ててみよう！ 残り${guessesLeft}回です。`;
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    gameResetButton.style.display = 'none';
}

function checkGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 10) {
        gameStatus.textContent = "1から10の有効な数字を入力してください。";
        return;
    }

    guessesLeft--;

    if (guess === targetNumber) {
        gameStatus.textContent = `🎉 正解！数字は${targetNumber}でした！`;
        endGame();
    } else if (guessesLeft === 0) {
        gameStatus.textContent = `❌ ゲームオーバー！正解は${targetNumber}でした。`;
        endGame();
    } else if (guess < targetNumber) {
        gameStatus.textContent = `もっと大きい数字だよ。残り${guessesLeft}回です。`;
    } else if (guess > targetNumber) {
        gameStatus.textContent = `もっと小さい数字だよ。残り${guessesLeft}回です。`;
    }

    guessInput.value = '';
}

function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    gameResetButton.style.display = 'inline-block';
}

function resetGame() {
    initGame();
}

// Start the game
if (gameContainer) {
    guessButton.addEventListener('click', checkGuess);
    gameResetButton.addEventListener('click', resetGame);
    // You can also enable pressing 'Enter' to submit the guess
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !guessButton.disabled) {
            checkGuess();
        }
    });

    // Initialize the game
    initGame();
}