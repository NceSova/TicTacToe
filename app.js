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
    return board.map((cell) => cell);
  };
  const printBoard = () => {
    const boardArray = getBoard().map((cell) => cell.getValue());
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
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    console.log(board.printBoard());
    console.log(`Its ${getActivePlayer().name}'s turn`);
  };

  const winningIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const check3Cells = (index1, index2, index3, token) => {
    let boardArray = board.getBoard();
    if (
      boardArray[index1].getValue() === token &&
      boardArray[index2].getValue() === token &&
      boardArray[index3].getValue() === token
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isGameOver = () => {
    let flag = false;
    winningIndexes.forEach((element) => {
      if (
        check3Cells(element[0], element[1], element[2], getActivePlayer().token)
      ) {
        flag = true;
      }
    });
    return flag;
  };

  const playRound = (index) => {
    console.log(
      `${getActivePlayer().name} placing ${getActivePlayer().token} on ${index}`
    );
    board.makeAMove(index, getActivePlayer().token);
    // Game end logic
    console.log(isGameOver());
    switchActivePlayer();
    printNewRound();
  };

  printNewRound();
  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
while (true) {
  game.playRound(+prompt());
}
