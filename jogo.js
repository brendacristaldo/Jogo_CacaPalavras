const words = ['JAVASCRIPT', 'HTML', 'CSS', 'PROGRAMAR', 'WEB', 'CODIGO'];
const gridSize = 10;

const wordGrid = document.getElementById('word-grid');
const wordList = document.getElementById('word-list');
let selectedCells = [];
let selectedWord = '';
let foundWords = [];

function initGrid() {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = '';
        }
    }
    return grid;
}

function placeWords(grid) {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.floor(Math.random() * 2);
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(grid, word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    if (direction === 0) {
                        grid[row][col + i] = word[i];
                    } else {
                        grid[row + i][col] = word[i];
                    }
                }
                placed = true;
            }
        }
    });
}

function canPlaceWord(grid, word, row, col, direction) {
    if (direction === 0) {
        if (col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '') return false;
        }
    } else {
        if (row + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '') return false;
        }
    }
    return true;
}

function fillGrid(grid) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

function renderGrid(grid) {
    wordGrid.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.textContent = cell;
            cellDiv.dataset.row = rowIndex;
            cellDiv.dataset.col = colIndex;
            cellDiv.addEventListener('click', selectCell);
            wordGrid.appendChild(cellDiv);
        });
    });
}

function renderWordList() {
    wordList.innerHTML = '';
    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = word;
        wordList.appendChild(wordDiv);
    });
}

function selectCell(event) {
    const cell = event.target;
    if (cell.classList.contains('selected')) {
        return;
    }

    selectedCells.push(cell);
    selectedWord += cell.textContent;

    cell.classList.add('selected');

    if (words.includes(selectedWord)) {
        highlightWord();
        foundWords.push(selectedWord);
        selectedWord = '';
        selectedCells = [];
        checkAllWordsFound();
    } else if (selectedWord.length > gridSize) {
        clearSelection();
    }
}

function highlightWord() {
    selectedCells.forEach(cell => {
        cell.classList.add('found');
        cell.classList.remove('selected');
    });
}

function clearSelection() {
    selectedCells.forEach(cell => {
        cell.classList.remove('selected');
    });
    selectedCells = [];
    selectedWord = '';
}

function checkAllWordsFound() {
    if (foundWords.length === words.length) {
        alert('Parabéns! Você encontrou todas as palavras!');
    }
}

function initGame() {
    const grid = initGrid();
    placeWords(grid);
    fillGrid(grid);
    renderGrid(grid);
    renderWordList();
}

initGame();
