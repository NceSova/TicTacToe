function Cell() {
  let value = "#";
  const getValue = () => value;
  const setValue = (newValue) => {
    value = newValue;
  };
  return {getValue, setValue};
}

function Gameboard() {
  const board = [];
  for (let index = 0; index < 9; index++) {
    board.push(Cell());
  }

  const getBoard = () => {
    return board.map((cell) => cell.getValue());
  };
  const printBoard = () => {
    const boardArray = getBoard();
    return `${boardArray[0]} | ${boardArray[1]} | ${boardArray[2]}\n----------\n${boardArray[3]} | ${boardArray[4]} | ${boardArray[5]}\n----------\n${boardArray[6]} | ${boardArray[7]} | ${boardArray[8]}`;
  };
  const makeAMove = (index, token) => {
    if (board[index].getValue() === "#") {
      board[index].setValue(token);
    }
  };
  return {
    getBoard,
    printBoard,
    makeAMove,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
}

const game = Gameboard();
game.makeAMove(2, "X");
console.log(game.printBoard());
