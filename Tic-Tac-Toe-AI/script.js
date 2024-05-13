const X_CLASS = 'x';
const O_CLASS = 'o';
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
let xTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    cells.forEach(cell => {
      cell.innerText = ''; // Clear the content of each cell
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusDisplay.innerText = '';
    restartButton.addEventListener('click', startGame); // Add event listener for restart button
  }

  function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false, currentClass === X_CLASS ? "X" : "O");
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }

  function endGame(draw, winner) {
    if (draw) {
      statusDisplay.innerText = 'Draw!';
    } else {
      statusDisplay.innerText = `${winner} Wins!`;
    }
    cells.forEach(cell => {
      cell.removeEventListener('click', handleClick);
    });
  }

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
  }

function swapTurns() {
  xTurn = !xTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
      return combination.every(index => {
        return cells[index].innerText === (currentClass === X_CLASS ? 'X' : 'O');
      });
    });
  }
