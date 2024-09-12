import React, { useState } from 'react';
import './App.css';

// Função para verificar se há um vencedor
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Componente para renderizar um quadrado
const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// Componente principal do tabuleiro
const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square
        key={i}
        value={square}
        onClick={() => onClick(i)}
      />
    ))}
  </div>
);

// Componente principal do jogo
const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
    </div>
  );
};

// Componente principal do aplicativo
function App() {
  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      <Game />
    </div>
  );
}

export default App;