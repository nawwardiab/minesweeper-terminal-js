import readlineSync from "readline-sync";
let promptUser = readlineSync.question;

let highScores = []; // Store high scores based on time

// Minesweeper class handling core game logic
class Minesweeper {
  constructor(size) {
    this.size = size; // Define board size (e.g. 5 for 5x5)
    this.grid = []; // 2D array to represent the board
    this.mines = []; // Track positions of mines
    this.uncoveredCount = 0; // Count of uncovered non-mine cells
    this.totalMines = Math.floor(this.size * this.size * 0.2); // 20% of cells are mines
    this.nonMineCells = this.size * this.size - this.totalMines; // Total non-mine cells
    this.firstMove = true; // tracks if it's the player's first move
    this.startTime = null; // track start time of the game
  }

  initializeBoard() {
    // Initialize the grid with "U" (uncovered)
    this.grid = createBoard(this.size);
    this.mines = placeMines(this.grid, this.totalMines);
    this.startTime = new Date(); // start time tracking
  }

  revealCell(row, col) {
    // safe start logic
    if (this.firstMove && this.grid[row][col] === "*") {
      this.relocateMine(row, col); // move the mine if it's the first move
    }
    this.firstMove = false; // disable safe start after first move

    // handle uncovering logic
    return uncoverCell(this, row, col);
  }

  relocateMine(row, col) {
    // move the mine from (row,col) to a new location
    this.grid[row][col] = "U"; // remove the mine
    this.mines = this.mines.filter(
      (m) => !(m.row === row && this.nonMineCells.col === col) // remove from mine list
    );

    let newRow, newCol;
    do {
      newRow = Math.floor(Math.random() * this.size);
      newCol = Math.floor(Math.random() * this.size);
    } while (this.grid[newRow][newCol] === "*");

    this.grid[newRow][newCol] = "*"; // place new mine
    this.mines.push({ row: newRow, col: newCol }); // add to mine list
  }

  flagCell(row, col) {
    // flag a cell
    flagCell(this, row, col);
  }

  unflagCell(row, col) {
    // unflag a cell
    unflagCell(this, row, col);
  }

  checkWin() {
    // check if all non-mine cells are uncovered
    if (this.uncoveredCount === this.nonMineCells) {
      let endTime = new Date();
      let elapsedTime = Math.floor((endTime - this.startTime) / 1000); // Time in seconds
      console.log("Congratulations! You've won the game!");
      saveHighScore(elapsedTime); // save the time to high scores
      return false;
    }
    return true;
  }
}

// ---------------- Helper Functions -------------- //

// create an empty board
function createBoard(size) {
  let board = [];
  for (let row = 0; row < size; row++) {
    let rowArray = [];
    for (let col = 0; col < size; col++) {
      rowArray.push("U"); // set all cells as uncovered
    }
    board.push(rowArray);
  }

  return board;
}

// place mines randomly on the board
function placeMines(grid, totalMines) {
  let mines = [];
  let size = grid.length;

  while (mines.length < totalMines) {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    if (grid[row][col] !== "*") {
      grid[row][col] = "*"; // Place a mine
      mines.push({ row: row, col: col });
    }
  }
  return mines;
}

// Function to display the board
function displayBoard(board) {
  for (let row of board.grid) {
    console.log(row.join(" ")); // Print each row of the board
  }
}

// Function to uncover a cell
function uncoverCell(board, row, col) {
  if (board.grid[row][col] === "*") {
    console.log("Game Over! You hit a mine.");
    showAllMines(board); // Reveal all mines on game over
    return false; // Game ends
  } else if (board.grid[row][col] === "U") {
    let mineCount = countAdjacentMines(board, row, col);
    board.grid[row][col] = mineCount; // Update cell with number of adjacent mines
    board.uncoveredCount++; // Increment uncovered non-mine cells

    return board.checkWin(); // Check if player has won
  }
  return true; // Cell already uncovered, continue game
}

// Function to count adjacent mines
function countAdjacentMines(board, row, col) {
  let mineCount = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < board.size && c >= 0 && c < board.size) {
        if (board.grid[r][c] === "*") {
          mineCount++;
        }
      }
    }
  }
  return mineCount;
}

// Function to reveal all mines
function showAllMines(board) {
  for (let mine of board.mines) {
    board.grid[mine.row][mine.col] = "*"; // Show all mines on the board
  }
}

// Function to flag a cell
function flagCell(board, row, col) {
  if (board.grid[row][col] === "U") {
    board.grid[row][col] = "F"; // Flag the cell
    console.log(`Flagged cell at (${row}, ${col})`);
  } else {
    console.log("Cannot flag this cell.");
  }
}

// Function to unflag a cell
function unflagCell(board, row, col) {
  if (board.grid[row][col] === "F") {
    board.grid[row][col] = "U"; // Unflag the cell
    console.log(`Unflagged cell at (${row}, ${col})`);
  } else {
    console.log("This cell is not flagged.");
  }
}

// function to save high scores
function saveHighScore(time) {
  highScores.push(time);
  highScores.sort((a, b) => a - b); // sort scores in ascending order
  if (highScores.length > 5) highScores.pop(); // keep top 5 scores
}

// function to display high scores
function displayHighScores() {
  console.log("Top 5 High Scroes (in seconds):");
  highScores.forEach((score, index) => {
    console.log(`${index + 1}. ${score} seconds`);
  });
}

// Get board size from user
function getBoardSize() {
  let size = promptUser("Enter board size (e.g., 5 for 5x5): ");
  return parseInt(size, 10);
}

// Get the player's action and coordinates
function getPlayerAction() {
  let action = promptUser("Choose an action: 1. Uncover, 2. Flag, 3. Unflag ");
  let row = parseInt(promptUser("Enter row number: "), 10);
  let col = parseInt(promptUser("Enter column number: "), 10);

  return { action: action, row: row, col: col }; // Return action and coordinates
}

// Function to update the board based on player action
function updateBoard(board, action, row, col) {
  switch (action) {
    case "1": // Uncover a cell
      return uncoverCell(board, row, col);
    case "2": // Flag a cell
      flagCell(board, row, col);
      break;
    case "3": // Unflag a cell
      unflagCell(board, row, col);
      break;
    default:
      console.log("Invalid action. Please choose 1, 2, or 3.");
  }
  displayBoard(board); // Show the updated board
  return true;
}

// Function to play the game
function playGame() {
  let boardSize = getBoardSize(); // Get board size from user
  let board = new Minesweeper(boardSize); // Create new board
  board.initializeBoard(); // Initialize the board
  displayBoard(board); // Show the initial board

  let gameActive = true;

  while (gameActive) {
    let { action, row, col } = getPlayerAction(); // Get player action
    gameActive = updateBoard(board, action, row, col); // Update board and continue game
  }

  displayHighScores(); // Show high scores after each game

  let playAgain = promptUser("Would you like to play again? (yes/no): ");
  if (playAgain.toLowerCase() === "yes") {
    playGame(); // Restart the game
  } else {
    console.log("Thanks for playing!");
  }
}

// Start the game
playGame();
