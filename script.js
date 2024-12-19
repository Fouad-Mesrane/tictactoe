const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const statusDiv = document.querySelector(".status");
const resetEl = document.getElementById("reset");
let isGameOver = false;
let currentPlayer = "X";

// each number represents the index of the cell in the cells array
// each nested array has a winning combination of cells (their positions)
const winConditions = [
  [0, 1, 2], // BOARD POSITIONS (also the index in the array):
  [3, 4, 5], //   0  1  2
  [6, 7, 8], //   3  4  5
  [0, 3, 6], //   6  7  8
  [1, 4, 7],
  [2, 5, 8], // WIN CONDITION #1 [0, 1, 2]:
  [0, 4, 8], //   X  X  X
  [2, 4, 6], //   3  4  5
]; //   6  7  8

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";

resetEl.appendChild(resetBtn);

// PART 1: Clicking a box/cell creates an X or O (based on order)
function handleClick(e) {
  // HINT: use the textContent property

  if (isGameOver) return;
  if (e.target.textContent) return;

  if (currentPlayer === "X") {
    e.target.textContent = currentPlayer;
    currentPlayer = "O";
    statusDiv.textContent = `Next Turn: Player ${currentPlayer}`;
  } else if (currentPlayer === "O") {
    e.target.textContent = currentPlayer;
    currentPlayer = "X";
    statusDiv.textContent = `Next Turn: Player ${currentPlayer}`;
  }
  isGameOver = checkWinner();
  if (isGameOver) {
    currentPlayer = e.target.textContent;

    statusDiv.textContent = `${currentPlayer} wins`;
  }
}

// PART 2: Checking for three in a row of X or O (and display the winner)
function checkWinner() {
  // HINT: use the cells array and winConditions array (for simplicity, avoid using a nested for loop)
  let isWinner = false;
  for (let condition of winConditions) {
    const [a, b, c] = condition;

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      isWinner = true;
    }
  }
  return isWinner;
}

// PART 3: Create a reset game button (to be able to play again)

resetBtn.addEventListener("click", reset);

function reset() {
  isGameOver = false;
  currentPlayer = 'X';
  statusDiv.textContent = `Next Turn: Player ${currentPlayer}`
  for (let cell of cells) {
    cell.textContent = "";
  }
}

board.addEventListener("click", handleClick);
