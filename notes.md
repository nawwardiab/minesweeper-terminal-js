# Minesweeper

## Game Logic:

1. Board setup:

   - a way to represent both boards: 2 \* 2D array

   - each board size have a predefined number of randomly placed mines.

2. Cell States:

- Each cell can either be covered (not revealed yet), uncovered, or flagged (if the player suspects there's a mine).
- When a cell is uncovered, it either reveals a number (indicating how many mines are adjacent), a mine (which ends the game), or a blank (indicating no adjacent mines).

3. User Action:
   User can choose to:

- Uncover a cell
- flag a cell
- remove a flag from a cell

4. Game Rules:

- game ends if the player uncovers a mine
- the game is won when all non-mine cells are uncovered
- when uncovering a cell without adjacent mines, you need to uncover all nearby cells automatically (recursive uncovering for safe areas)
- If a player uncovers a cell that isn’t a mine, the game shows the number of adjacent mines, helping them make more informed decisions about which cells to uncover or flag next.

5. Winning Condition:

The player wins if they successfully uncover all the non-mine cells without detonating a mine.

6. Gameplay Loop:

The game loop continuously prompts the player for actions, validates their input, and updates the game board after each move until the player either wins or loses.

---

## Phase 1: Game Setup

Objective: Establish the foundation of the game before any gameplay occurs.

1. Board Initialization

- First, decide how the board will be represented (e.g., 2D array of cells).
- Implement the random placement of mines on the board, making sure there are no overlaps.
- Define how covered, uncovered, flagged, and mined cells will be displayed.

2. Displaying the Board

- Create a function to display the board in the terminal.
- Make sure the board updates after each player move (before any gameplay starts, just display the initial board).

### summary of what to do in Phase 1.

1. Define the Board Structure: Create a grid (5x5 or 10x10) where each cell represents a covered, uncovered, flagged, or mined state.
2. Place the Mines: Randomly distribute a specific number of mines across the board, making sure there are no overlaps.
3. Display the Initial Covered Board: Print the board to the terminal, showing all cells as covered and hiding the mines.
4. Allow the User to Choose the Board Size: Prompt the player to select a board size before starting the game.
5. Prepare to Track Game State: Set up the necessary variables to track uncovered cells, flagged cells, and the game’s progress (whether the player has won or lost).

### Step 1: Define the board structure

1. Goal: create the game board where all gameplay will occur.
2. Logic:

- decide the dimensions of the board. for example: small (5x5) or large (10x10). the board will be a grid, where each cell can be a mine, empty, or marked by the player.
- represent this board using a 2D array in JavaScript, where each element in the array is a cell. Each cell should initially be covered and unmarked.
- each cell can have multiple states: covered, uncovered, flagged or mined. in the array, I could store objects or symboles representing these states (e.g. "U" for covered, "F" for flagged and "\*" for mined).

### Step 2: Place the Mines

1. Goal: Randomly distribute mines accross the board while ensuring that they don't overlap.
2. Logic:

- After creating the board, decide how many mines will be placed based on the board size. for example, 5 mines on a 5x5 board and 15 mines on a 10x10.
- Use a random function to select positions in the grid and place mines. I need to ensure that the same position isn't selected more than once.
- Store the mines using a special marker (e.g. "\*") in the cells. Do not show these mines to tha player initially - mines will only be revealed if the player uncovers them.

### Step 3: Display the Initial Covered Board

1. Goal: Show player the initial state of the game board, where all cells are hidden (covered).
2. Logic:

- Create a function that prints the board to the terminal. each cell should be displayed as covered (e.g., "U" for uncovered).
- make sure the player doesn't see where the mines are - they only see a grid of covered cells at this point.
- display board size ( 5x5 or 10x10 ) abd esure that it's formatted nicely for the player to read.

### Step 4: Allow the User to choose the board size

at the start I'll prompt the player to choose their preferred board size. based on their choice I'll initialize a 5x5 or 10x10 grid and adjust the numbers of mines accordingly.

1. Goal: Give the player the option to select between different board sizes at the start of the game.
2. Logic:

- beofre starting the game, prompt the player to choose the board size they want to play on (e.g. prompt with "choose 1 for 5x5 or 2 for 10x10").
- based on their selection create the appropriate board and determine how many mines will be placed.
- validate the user input to make sure it's a valid option

### Step 5: Prepare to track game state

1. Goal: Set up variables or data structures to track the current state of the game. like whether the player has won or lost, which cells are uncovered and which are flagged.
2. Logic:

- create variables to keep track of the game's state such as:
  - variable to track whether the game is ongoing (gameOver, gameWon).
  - a way to count how many cells are uncovered (to help with win conditions)
  - a way to store flagged cells.
- set these variables to their default states at the start of the game (gameOver = false, no cells uncovered or flagged yet).

---

## Phase 2: Basic Gameplay Mechanics

Objective: Build the core interactions of uncovering and flagging cells.

1. User Input

- Implement user input handling with prompts to uncover a cell, flag a cell, or remove a flag.
- Include input validation, such as ensuring the user selects valid cells within the board’s bounds.

2. Uncovering Cells

- Define the logic for uncovering a cell.
- Handle two cases: when the cell contains a mine (end game) and when it doesn't (uncover and display hints).
- Write the logic to uncover adjacent cells automatically if the uncovered cell has no adjacent mines (recursive uncovering).

3. Flagging and Unflagging Cells

- Add the functionality to flag or unflag a cell based on user input.
- Ensure flagged cells cannot be uncovered until unflagged.

### Summary of what to do in this phase:

1. Prompt the player to either uncover, flag, or unflag a cell.
2. Validate input to ensure the selected cell is within the board and hasn’t already been uncovered.
3. If the player chooses to uncover a cell, check if it’s a mine:

- If it’s a mine, end the game.
- If not, uncover it and show the number of adjacent mines, or recursively uncover nearby cells with no adjacent mines.

4. If the player chooses to flag/unflag a cell, mark it as flagged or unflagged, and prevent flagged cells from being uncovered until unflagged.

### Step 1: User input handling

1. Goal: The player needs to interact with the game by either uncovering a cell or flagging/unflagging a cell. the game must accept and process these actions.
2. Logic:

- after displaying the board to user ask them what action they want to take. provide three options: - uncover a cell - flag a cell - remove a flag
- user inputs a row and column for their selected action
- input validation: - ensure user picks a valid row and column within board's dimensions - ensure the cell hasn't already been uncovered or flagged (if trying to uncover)

### Step 2: Uncovering cells

1. Goal: allow player to uncover cells and handle the consequences of uncovering a mine or an empty cell.
2. Logic:

- when a user chooses to uncover a cell check t he value of the cell on the board.
- two posibilities:
  1. mine found: if the cell contains a mine display a message that the game is over. reveal all mines on the board and end the game.
  2. no mine: if the cell does not contain a mine uncover cell and:
     - if the cell has adjacent mines show the number of mines in adjacent cells (1 for one adjacent mine).
     - if there are no adjacent mines uncover the surrounding cells automatically (this requires a recursive function that uncovers neighbouring cells with no adjacent mines).
- after uncovering display the updated board to player.

### Step 3: flagging and unflagging cells

1. Goal: allow the player to flag or unflag cells to mark suspected mines helping them avoid accidental uncovering of dangerous cells.
2. Logic:

- when player chooses to flag a cell check if the cell is already uncovered.
- if the cell isn't uncovered set the cell's value to "F" for flagged.
- when unflagging, change the flagged cell back to an uncovered state "U".
- Validation: ensure that flagged cells cannot be uncovered until flag is removed.

---

## Phase 3: Winning and losing conditions

The objective in this phase is to determine when the game should end either by winnign or losing. The player wins by uncovering all non-mine cells and loses by uncovering a mine. this phase ensures that the game recognizes when a player has achieved either outcome and responds accordingly.

### Step 1: track uncovered cells

1. Goal: Track how many non-mine cells the player has uncovered during the game.
2. Logic:

- the game needs to know when the player has uncovered all safe (non-mine) cells.
- add a counter (uncoveredCount) to the board that increments each time a non-mine cell is uncovered
- the total number of non-mine cells is calculated at the start of the game as totalCells - totalMines.

### Step 2: Detect loss (uncovering a mine)

1. Goal: end the game immediately when a player uncovers a mine
2. Logic:

- if the player uncovers a cell containing a mine ("\*") they lose the game.
- when a mine is uncovered display message like "Game over! you hit a mine"
- after this reveal all remaining mines on the board so the player can see where they were
- stop the game after loss is confirmed

### Step 3: check for victory (uncovering all non-mine cells)

1. Goal: determine when the player has won by uncovering all non-mine cells
2. Logic:

- at the start calculate the total number of non-mine cells
- each time the player uncovers a non-mine cell, increment the uncoveredCount
- after each move check if uncoveredCount equals to the total numbers of non-mine cells
- if the numbers match, the player wins the game
- display message like "Congratulations! you've won the game" and stop the game

### Step 4: Update the game loop

1. Goal: ensure the game continues until the player either wins or loses.
2. Logic:

- modify the game loop so that the player can keep taking actions (uncover, flag, unflag) unless they win or lose
- if the player uncovers a mine (loses), stop the game loop and reveal the mines
- if the player uncovers all non-mine cells (wins) stop the game loop and display a victory message

### Step 5: Reveal Mines after loss

1. Goal: show the player all the mines after they lose
2. Logic:

- if the player loses by uncovering a mine, reveal all other mines on the board
- this helps the player understand where the remaining mines were hidden and why they lost

### Step 6: End game logic

1. Goal: allow player to restart or quit after a win or loss
2. Logic:

- after player wins or loses, prompt them with a question like "Would you like to play again? (Yes/No)
- if the choose "yes", reset the board and start a new game
- if they choose "no", end the game and thank them for playing

---

## Phase 4: Flagging and unflagging cells

The objective in Phase 4 is to allow the player to mark cells that they suspect contain mines (flagging) and remove those marks if they change their mind (unflagging). This phase introduces flagging mechanics and ensures the player can manage the board effectively, adding strategy to the game.

### Step 1: flagging a cell

1. Goal: allow the player to flag a cell if they suspect it contains a mine.
2. Logic:

- when player selects the option to flag a cell they should input the row and column of the cell they want to flag
- the game checks if the selected cell is still covered ("U" for uncovered)
- if it is mark that cell with an "F" to indicate it's flagged as a suspected mine.
- flagging doesn't uncover the cell or affect whether the player wins or loses. it's just a way for the player to keep track of where they think mines are.

### Step 2: Unflagging a cell

1. Goal: Allow player to remove a flag from a cell if they no longer suspect it's a mine.
2. Logic:

- if player wants to unflag a cell (remove a flag they previously placed) they select the option to unflag and input the cell's row and column
- the game checks if the selected cell is flagged "F"
- if it is the flag is removed, and the cell is reverted to its covered state "U"
- this step allows player to adhust their strategy during the game

### Step 3: Validation of flagging and unflagging

1. Goal: ensure that flagging or unflagging happens only on valid cells
2. Logic:

- if the player tries to flag a cell that's already uncovered (either a number or a mine) the game should reject the action and display a message like "you cannot flag an uncovered cell"
- similarly if the player tries to unflag a cell that isn't flagged, the game should display an error message like "This cell is not flagged"

### Step 4: Update the game loop

1. Goal: add flagging and unflagging options to the main gameplay loop
2. Logic:

- in the game's main loop add an option for the player to choose between uncovering a cell, flagging a cell, or unflagging a cell
- after player selects their action (flag or unflag) the board should update accordingly, showing the flags in place of covered cells
- ensure the game continues until the player either uncovers a mine (loses) or uncovers all non-mine cells (wins).

### Step 5: Check flags for win condition

1. Goal: ensure that flagged cells are correctly accounted for when checking for a win
2. Logic:

- when checking for a win (all non-mine cells uncovered) flags don't directly affect whether player wins. player can win without flagging all the mines as long as all non-mine cells are uncovered.
- however if the player flags all the mines and correctly uncovers all non-mine cells it should still count as a win
- ensure that flagged mines are not mistakenly uncovered during gameplay, but remain marked

### Step 6: End game logic for flagging

1. Goal: handle game logic after flagging or unflagging actions
2. Logic:

- after flagging or unflagging, the game should continue asking player for their next move (either uncovering a cell, flagging, unflagging another cell)
- after every turn, re-display the current state of the board, showing flagged cells, uncovered numbers and covered cells
- if the player wins or loses, end the game as in the previous phases (congratulate for a win, reveal mines for a loss and ask if they want to play again).

---

## Phase 5: additional features and enhancements

Phase 5 focuses on improving the game experience with additional features such as time tracking, high scores, and implementing a safe start (a guarantee that the first uncovered cell is not a mine). These enhancements are designed to make the game more engaging and user-friendly.

### Step 1: Time tracking

1. Goal: track how long a player takes to complete the game
2. Logic:

- when game starts record the current time
- when game ends (either by winning or losing) record the ending time
- calculate the total duration by subtracting start time from end time
- display the time taken to complete the game

### Step 2: High scores

1. Goal: store and display the fastest times for players
2. Logic:

- after calculating the time taken for each game, compare it with preciously recorded high scores
- if the current game's time is faster than one of the recorded high scores update the leaderboard
- store top 3-5 fastest times in memory or a file
- after each game display the current high sscores

#### Step 3: safe start (no mine on first move)

1. Goal: ensure that player's first move is not a mine
2. Logic:

- when player makes their first move (uncover action) check if it is a mine
- if the first uncovered cell is a mine move the mine to a different random location on the board
- uncover the selected cell as a non-mine cell
- proceed with normal gameplay after safe start

### Step 4: Pause/resume feature

1. Goal: allow the player to pause and resume the game
2. Logic:

- allow player to enter a comand to pause the game during their turn
- when paused save the current state of the board and stop the time tracking
- allow the player to resume the game restoring the board state and restarting the timer

### Step 5: game difficulty levels

1. Goal: add difficulty options that modify board size and number of mines
2. Logic:

- before starting the game prompt the user to choose a difficulty level (easy, medium, hard)
- set the board size and mine count based on the selected difficulty
- For example:
  - Easy: 5x5 board, 10% mines.
  - Medium: 8x8 board, 20% mines.
  - Hard: 10x10 board, 30% mines.
