import React from 'react';

// PUBLIC_INTERFACE
const Board = ({ squares, onClick }) => {
  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <button
          key={index}
          className="square"
          onClick={() => onClick(index)}
          aria-label={`Square ${index}`}
        >
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
