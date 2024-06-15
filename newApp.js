function makeCell() {
  let valueOfCell = "#";
  const setToken = (token) => {
    valueOfCell = token;
  };
  const getToken = () => valueOfCell;
  return {setToken, getToken};
}

function makePlayer(name, token) {
  const getPlayerToken = () => token;
  const getPlayerName = () => name;
  return {getPlayerName, getPlayerToken};
}

const firstPlayer = makePlayer("me", "X");
const secondPlayer = makePlayer("you", "O");

const model = (function (player1, player2) {
  let _board = [];
  for (let i = 0; i < 9; i++) {
    _board[i] = makeCell();
  }
  const getBoard = () => _board.map((cell) => cell.getToken());

  let _curPlayer = player1;
  const _changeCurPlayer = () => {
    _curPlayer = _curPlayer === player1 ? player2 : player1;
  };

  let _gameOver = false;
  const setGameOver = () => (_gameOver = true);
  const isGameOver = () => _gameOver;

  const _check = (player, index1, index2, index3) => {
    if (
      _board[index1].getToken() === player.getPlayerToken() &&
      _board[index2].getToken() === player.getPlayerToken() &&
      _board[index3].getToken() === player.getPlayerToken()
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

  const isPlayerWinning = (player) => {
    console.log("tryWinner");
    _winningIndexes.forEach((element) => {
      if (_check(player, element[0], element[1], element[2])) {
        console.log("winner is true");
        setGameOver();
        return true;
      } else {
        return false;
      }
    });
  };

  const makeAMove = (index, player) => {
    if (_board[index].getToken() === "#") {
      _board[index].setToken(player.getPlayerToken());
      return true;
    } else {
      return false;
    }
  };

  const playRound = () => {
    let moveIndex = +prompt();
    let move = makeAMove(moveIndex, _curPlayer);
    console.log(move);
    while (move === false) {
      console.log("bruh");
      move = makeAMove(+prompt(), _curPlayer);
    }
    if (isPlayerWinning(_curPlayer)) {
      setGameOver();
      console.log("someone won!");
      return `${_curPlayer.getPlayerName()} has won!`;
    } else {
      _changeCurPlayer();
      return "playing...";
    }
  };

  return {
    setGameOver,
    _gameOver,
    playRound,
    isGameOver,
    getBoard,
  };
})(firstPlayer, secondPlayer);

const drawBoard = () => {
  boardArray = model.getBoard();
  return `${boardArray[0]} ${boardArray[1]} ${boardArray[2]}\n${boardArray[3]} ${boardArray[4]} ${boardArray[5]}\n${boardArray[6]} ${boardArray[7]} ${boardArray[8]}`;
};

console.log("start");
while (model._gameOver === false) {
  console.log("new round");
  const sd = model.playRound();
  console.log(drawBoard());
  console.log(`gameover is ${model._gameOver}`);
  console.log(`status is ${sd}`);
}
