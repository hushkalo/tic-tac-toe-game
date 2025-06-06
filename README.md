# Tic Tac Toe Game

A feature-rich Tic Tac Toe game built with React and TypeScript.

## Features

- **Two Players:** Player 1 and Player 2, each with their own symbol (X or O).
- **Player Info:** Displays each player's symbol and number of wins.
- **New Game Button:** Resets the board and starts a new game.
- **Game Counter:** Shows the total number of completed games (win or draw).
- **Turn Indicator:** Shows whose turn it is. Player 1 (X) always starts a new game.
- **Win/Draw Modal:** After a win or draw, a modal appears after 2 seconds with the result and an "Ok" button. The modal can also be closed by clicking outside it.
- **Persistent Board:** After closing the modal, the board remains filled until "New Game" is pressed.
- **Interrupt Game:** "New Game" can be pressed at any time to reset the board without counting the game.
- **Grid Size Selector:** Choose grid size from 3×3 up to 9×9. Changing the size only takes effect after starting a new game.

## Installation

1. Install [pnpm](https://pnpm.io/):
   ```sh
   npm install -g pnpm
   ```
2. Install dependencies:
    ```sh
    make install
    ```
3. Start the development server:
    ```sh
    make start
    ```
4. Production build:
    ```sh
    make build
   make preview 
   ```

## Game Rules
- The game is played on a grid (3×3 to 9×9).
- Players take turns placing their symbol.
- The first player to align their symbols in a row, column, or diagonal wins.
- If the board is full and no one wins, it's a draw.

<hr /> Enjoy playing!