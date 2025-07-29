import React from 'react';

// PUBLIC_INTERFACE
const Scoreboard = ({ scores, gameMode }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <div className="scores">
        <div className="score-item">
          <span className="player">Player X</span>
          <span className="score">{scores.X}</span>
        </div>
        <div className="score-item">
          <span className="player">{gameMode === 'computer' ? 'Computer' : 'Player O'}</span>
          <span className="score">{scores.O}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
