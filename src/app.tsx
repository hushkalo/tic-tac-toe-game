import { Modal } from "@components/modal.tsx";
import { checkWin } from "@utils/check-win.ts";
import { generateField } from "@utils/generate-field.ts";
import { generateWinningCombinations } from "@utils/generate-win-lines";
import { useState } from "react";

export function App() {
  const [row, setRow] = useState(3);
  const [col, setCol] = useState(3);
  const [winLines, setWinLines] = useState<number[][]>(
    generateWinningCombinations(row)
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [pendingBoardSize, setPendingBoardSize] = useState<number | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [players, setPlayer] = useState({
    player1: {
      isMove: true,
      name: "Player 1",
      symbol: "X",
      wins: 0,
      loses: 0,
      time: 0,
    },
    player2: {
      isMove: false,
      name: "Player 2",
      symbol: "O",
      wins: 0,
      loses: 0,
      time: 0,
    },
  });
  const currentPlayer = players.player1.isMove
    ? players.player1
    : players.player2;
  const [field, setField] = useState(generateField(row * col));
  const [showModal, setShowModal] = useState(false);
  function setNewBoardSize(size: number) {
    setRow(size);
    setCol(size);
    setField(generateField(size * size));
    setWinLines(generateWinningCombinations(size));
    setIsGameOver(false);
    setIsDraw(false);
    setPlayer({
      player1: { ...players.player1, isMove: true },
      player2: { ...players.player2, isMove: false },
    });
  }
  function handleClick(rowIndex: number) {
    if (!isGameStarted) {
      setIsGameStarted(true);
    }
    if (isGameOver) return;
    const isCellEmpty = field[rowIndex] === "";
    if (!isCellEmpty) return;
    const newField = field.slice();
    newField[rowIndex] = currentPlayer.symbol;
    setField(newField);
    setPlayer((prev) => ({
      player1: {
        ...prev.player1,
        isMove: !prev.player1.isMove,
      },
      player2: {
        ...prev.player2,
        isMove: !prev.player2.isMove,
      },
    }));
    if (
      rowIndex < 0 ||
      rowIndex >= field.length ||
      checkWin(winLines, newField)
    ) {
      setIsGameOver(true);
      setWinner(currentPlayer.name);
      setIsGameStarted(false);
      setShowModal(true);
      setPlayer((prev) => {
        const isPlayer1 = currentPlayer.symbol === prev.player1.symbol;
        return {
          player1: {
            ...prev.player1,
            isMove: true,
            wins: isPlayer1 ? prev.player1.wins + 1 : prev.player1.wins,
            loses: !isPlayer1 ? prev.player1.loses + 1 : prev.player1.loses,
          },
          player2: {
            ...prev.player2,
            isMove: false,
            wins: !isPlayer1 ? prev.player2.wins + 1 : prev.player2.wins,
            loses: isPlayer1 ? prev.player2.loses + 1 : prev.player2.loses,
          },
        };
      });
      return;
    }
    const isDraw = newField.every((cell) => cell !== "");
    if (isDraw) {
      setIsGameOver(true);
      setIsDraw(true);
      setIsGameStarted(false);
      setShowModal(true);
      return;
    }
    console.log(`Clicked cell at ${rowIndex}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Tic Tac Toe</h1>
          <div className="mb-6 flex items-center justify-center gap-4">
            <select
              value={row}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value, 10);
                if (isGameStarted) {
                  setPendingBoardSize(value);
                  return;
                }
                setNewBoardSize(value);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="3">3×3</option>
              <option value="4">4×4</option>
              <option value="5">5×5</option>
              <option value="6">6×6</option>
              <option value="7">7×7</option>
              <option value="8">8×8</option>
              <option value="9">9×9</option>
            </select>

            <button
              onClick={() => {
                setField(generateField(row * col));
                setIsGameOver(false);
                setIsDraw(false);
                setPlayer({
                  player1: { ...players.player1, isMove: true },
                  player2: { ...players.player2, isMove: false },
                });
                if (pendingBoardSize) {
                  setNewBoardSize(pendingBoardSize);
                  setPendingBoardSize(null);
                }
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Reset Game
            </button>
          </div>
        </div>

        {/* Game Status */}
        <div className="mb-6 text-center">
          {isGameOver ? (
            isDraw ? (
              <div className="rounded-lg bg-yellow-100 p-4">
                <h2 className="text-2xl font-bold text-yellow-800">
                  It's a Draw!
                </h2>
              </div>
            ) : (
              <div className="rounded-lg bg-green-100 p-4">
                <h2 className="text-2xl font-bold text-green-800">
                  🎉 {winner} Wins!
                </h2>
              </div>
            )
          ) : (
            <div className="rounded-lg bg-blue-100 p-4">
              <h2 className="text-xl font-semibold text-blue-800">
                Current Turn: {currentPlayer.name} ({currentPlayer.symbol})
              </h2>
            </div>
          )}
        </div>

        {/* Score Board */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              {players.player1.name}
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              <div>
                Symbol:{" "}
                <span className="font-bold text-blue-600">
                  {players.player1.symbol}
                </span>
              </div>
              <div>
                Wins:{" "}
                <span className="font-bold text-green-600">
                  {players.player1.wins}
                </span>
              </div>
              <div>
                Losses:{" "}
                <span className="font-bold text-red-600">
                  {players.player1.loses}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              {players.player2.name}
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              <div>
                Symbol:{" "}
                <span className="font-bold text-red-600">
                  {players.player2.symbol}
                </span>
              </div>
              <div>
                Wins:{" "}
                <span className="font-bold text-green-600">
                  {players.player2.wins}
                </span>
              </div>
              <div>
                Losses:{" "}
                <span className="font-bold text-red-600">
                  {players.player2.loses}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div
            className="inline-grid gap-2 rounded-lg bg-white p-4 shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
            }}
          >
            {field.map((cell, cellIndex) => (
              <button
                key={`${cellIndex}-${cell}`}
                className={`flex h-16 w-16 items-center justify-center border-2 border-gray-300 bg-gray-50 text-2xl font-bold transition-all hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  cell === "X"
                    ? "text-blue-600"
                    : cell === "O"
                      ? "text-red-600"
                      : "text-gray-400"
                } ${isGameOver ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                onClick={() => handleClick(cellIndex)}
                disabled={isGameOver || cell !== ""}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      </div>
      {winner && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          winner={winner}
          isDraw={isDraw}
        />
      )}
    </div>
  );
}
