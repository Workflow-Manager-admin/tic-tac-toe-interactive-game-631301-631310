import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import { calculateWinner, isDraw, getComputerMove } from './utils/gameUtils';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('two-player'); // 'two-player' or 'computer'
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !calculateWinner(squares) && !isDraw(squares)) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(squares);
        if (computerMove !== null) {
          handleSquareClick(computerMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode, squares]);

  const handleSquareClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setScores(prevScores => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1
      }));
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const toggleGameMode = () => {
    setGameMode(prevMode => prevMode === 'two-player' ? 'computer' : 'two-player');
    handleReset();
    setScores({ X: 0, O: 0 });
  };

  const winner = calculateWinner(squares);
  const draw = !winner && isDraw(squares);
  const status = winner 
    ? `Winner: ${winner}` 
    : draw 
    ? 'Game Draw!' 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <Scoreboard scores={scores} gameMode={gameMode} />
        <div className="status">{status}</div>
        <Board squares={squares} onClick={handleSquareClick} />
        <div className="controls">
          <button onClick={handleReset} className="control-button">
            Reset Game
          </button>
          <button onClick={toggleGameMode} className="control-button">
            {gameMode === 'two-player' ? 'Play vs Computer' : 'Play vs Friend'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
