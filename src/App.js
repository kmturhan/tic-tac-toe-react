import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>
      {value}
    </button>
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [sqaures, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (sqaures[i] || calculateWinner(sqaures)) {
      return;
    }
    const nextSquares = sqaures.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(sqaures);
  let status;
  if (winner) {
    status = "Kazanan : " + winner;
  } else {
    status = "Sıradaki oyuncu : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={sqaures[0]} onSquareClick={() => handleClick(0)} />
        <Square value={sqaures[1]} onSquareClick={() => handleClick(1)} />
        <Square value={sqaures[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={sqaures[3]} onSquareClick={() => handleClick(3)} />
        <Square value={sqaures[4]} onSquareClick={() => handleClick(4)} />
        <Square value={sqaures[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={sqaures[6]} onSquareClick={() => handleClick(6)} />
        <Square value={sqaures[7]} onSquareClick={() => handleClick(7)} />
        <Square value={sqaures[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(sqaures) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[a] === sqaures[c]) {
      return sqaures[a];
    }
  }
  return null;
}