// Calculate winner by checking all possible winning combinations
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Check if the game is a draw
export const isDraw = (squares) => {
  return squares.every(square => square !== null);
};

// Computer move using minimax algorithm
export const getComputerMove = (squares) => {
  const availableMoves = squares
    .map((square, index) => square === null ? index : null)
    .filter(move => move !== null);

  if (availableMoves.length === 0) return null;

  // For simplicity, choose a random available move
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};
