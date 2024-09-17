# Minesweeper

Welcome to Minesweeper, a classic game where you uncover tiles on a grid, trying to avoid hidden mines. The game ends when you uncover all non-mine cells or hit a mine.

## Project Overview

In Minesweeper, the game involves:

- **Board Representation:** A grid (customizable size) where some cells contain hidden mines, and others are safe.
- **Mine Placement:** Mines are randomly placed on the board, making each game unique.
- **Uncovering Cells:** Players can choose to uncover a cell. If the cell is safe, it shows the number of adjacent mines. If it contains a mine, the game ends.
- **Flagging Cells:** Players can flag cells they suspect contain mines to avoid accidentally uncovering them.
- **Move Validation:** Ensures players select valid coordinates within the grid.
- **Winning Condition:** Players win if they successfully uncover all non-mine cells.
- **Losing Condition:** The game ends when a mine is uncovered.
- **Restart Option:** After a game concludes, players can choose to restart or quit.

## Game Setup

To set up and run Minesweeper, follow these steps:

### Clone the Repository:

```bash
git clone git@github.com:nawwardiab/minesweeper-terminal-js.git
```

### Navigate to the Project Directory:

```bash
cd minesweeper
```

### Install the Required Dependencies:

```bash
npm install readline-sync
```

### Start the Game:

```bash
node index.js
```

### Follow the Prompts: Enter your action and coordinates to play the game.

## Game Examples

Here’s how the game might look in action:

### Starting the Game:

```
Welcome to Minesweeper!
Enter board size (e.g., 5 for 5x5): 5
```

### During the Game:

```
Current Board:
U U U U U
U U U U U
U U U U U
U U U U U
U U U U U

Choose an action: 1. Uncover, 2. Flag, 3. Unflag
Enter row number: 1
Enter column number: 1
```

### Uncovering a Cell:

```
Current Board:
1 U U U U
U U U U U
U U U U U
U U U U U
U U U U U
```

### Game End:

```
Game Over! You hit a mine.
Current Board:
* U U U U
U U U U U
U U * U U
U U U U U
U U U U U

Would you like to play again? (yes/no):
```
