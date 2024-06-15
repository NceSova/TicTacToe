function Cell() {
  let _value = "#";

  const setToken = (token) => {
    _value = token;
  };

  const getToken = () => _value;

  return {
    setToken,
    getToken,
  };
}

function Player(token) {
  const _token = token;
  const getPlayerToken = () => _token;
  return {getPlayerToken};
}

const gameboard = (function () {
  let _board = [];
  function generateBoard() {
    for (let i = 0; i < 9; i++) {
      _board[i] = Cell();
    }
  }

  generateBoard();

  const _check3Cells = (token, index1, index2, index3) => {
    if (
      _board[index1].getToken() === token &&
      _board[index2].getToken() === token &&
      _board[index3].getToken() === token
    ) {
      return true;
    } else {
      return false;
    }
  };

  const _winningIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isPLayerWinning = (player) => {
    for (let index = 0; index < _winningIndexes.length; index++) {
      const element = _winningIndexes[index];
      if (
        _check3Cells(
          player.getPlayerToken(),
          element[0],
          element[1],
          element[2]
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const getBoard = () => _board.map((cell) => cell.getToken());
  // const setTokenOnCell = (index, token) => console.log(_board[index]);
  const setTokenOnCell = (index, token) => _board[index].setToken(token);
  const getTokenOnCell = (index) => _board[index].getToken();
  const clear = () => {
    _board = [];
    generateBoard();
  };

  return {
    clear,
    getBoard,
    setTokenOnCell,
    getTokenOnCell,
    isPLayerWinning,
  };
})();

const game = (function (player1, player2) {
  let curPlayer = player1;
  const getCurPlayer = () => curPlayer;

  const changeCurPlayer = () =>
    (curPlayer = curPlayer === player1 ? player2 : player1);

  const makeAMove = (indexOfCell) => {
    if (gameboard.getTokenOnCell(indexOfCell) === "#") {
      gameboard.setTokenOnCell(indexOfCell, curPlayer.getPlayerToken());
    } else {
      console.log("invalidMove");
    }
  };

  const drawBoard = () => {
    boardArray = gameboard.getBoard();
    return `${boardArray[0]} ${boardArray[1]} ${boardArray[2]}\n${boardArray[3]} ${boardArray[4]} ${boardArray[5]}\n${boardArray[6]} ${boardArray[7]} ${boardArray[8]}`;
  };

  const playRound = () => {
    console.log(drawBoard());
    let move = +prompt();
    makeAMove(move);
    if (gameboard.isPLayerWinning(curPlayer)) {
      console.log(drawBoard());
      return `The ${curPlayer.getPlayerToken()} has won!`;
    } else {
      changeCurPlayer();
    }
  };

  return {
    playRound,
    getCurPlayer,
    makeAMove,
    changeCurPlayer,
    drawBoard,
  };
})(Player("X"), Player("O"));

// const me = Player(1);
// gameboard.setTokenOnCell(1, me.getPlayerToken());
// gameboard.setTokenOnCell(4, me.getPlayerToken());
// gameboard.setTokenOnCell(7, me.getPlayerToken());
// game.makeAMove(3);
// console.log(gameboard.getBoard());
// console.log(gameboard.getBoard());
// console.log(game.drawBoard());
