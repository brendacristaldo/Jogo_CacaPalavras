// script.js
let sequence = [];
let userSequence = [];
let level = 0;

const startButton = document.getElementById('start');
const checkButton = document.getElementById('check');
const sequenceDisplay = document.getElementById('sequence');
const numberInput = document.getElementById('numberInput');
const messageDisplay = document.getElementById('message');

startButton.addEventListener('click', startGame);
checkButton.addEventListener('click', checkSequence);

function startGame() {
    level = 0;
    sequence = [];
    userSequence = [];
    messageDisplay.textContent = '';
    nextLevel();
}

function nextLevel() {
    level++;
    numberInput.value = '';
    userSequence = [];
    sequence.push(Math.floor(Math.random() * 10)); // Adiciona um número aleatório de 0 a 9
    displaySequence();
}

function displaySequence() {
    sequenceDisplay.textContent = sequence.join(' ');
    setTimeout(() => {
        sequenceDisplay.textContent = '';
    }, 1000 * level); // A sequência é exibida por um tempo proporcional ao nível
}

function checkSequence() {
    const userNumber = parseInt(numberInput.value, 10);
    userSequence.push(userNumber);
    numberInput.value = '';
    
    if (userSequence.length === sequence.length) {
        if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
            messageDisplay.textContent = 'Correto! Próximo nível...';
            setTimeout(nextLevel, 1000);
        } else {
            messageDisplay.textContent = `Errado! A sequência correta era: ${sequence.join(' ')}`;
        }
    }
}
