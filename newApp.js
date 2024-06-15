function makeCell(value) {
  let valueOfCell = value;
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

const view = (function () {
  const takeInput = () => {
    return +prompt();
  };
  const drawBoard = (boardArray) => {
    console.log(
      `${boardArray[0]} | ${boardArray[1]} | ${boardArray[2]}\n----------\n${boardArray[3]} | ${boardArray[4]} | ${boardArray[5]}\n----------\n${boardArray[6]} | ${boardArray[7]} | ${boardArray[8]}`
    );
  };
  const gameOver = (player) => {
    console.log(`${player.getPlayerName()} has Won!!!`);
  };
  const showCurPLayer = (player) => {
    console.log(player.getPlayerName());
  };
  return {
    takeInput,
    drawBoard,
    gameOver,
    showCurPLayer,
  };
})();

const model = (function (player1, player2, view) {
  let _board = [];
  for (let i = 0; i < 9; i++) {
    _board[i] = makeCell(i);
  }
  const getBoard = () => _board.map((cell) => cell.getToken());

  let curPlayer = player1;
  const changeCurPlayer = () => {
    curPlayer = curPlayer === player1 ? player2 : player1;
  };

  const check = (player, index1, index2, index3) => {
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

  const isWon = (player) => {
    winningIndexes.forEach((element) => {
      if (check(player, element[0], element[1], element[2])) {
        return true;
      } else {
        return false;
      }
    });
  };

  const makeAMove = (index, player) => {
    if (
      _board[index].getToken() !== player1.getPlayerToken() &&
      _board[index].getToken() !== player2.getPlayerToken()
    ) {
      _board[index].setToken(player.getPlayerToken());
      return true;
    } else {
      return false;
    }
  };

  const play = () => {
    gameOn = true;
    while (gameOn) {
      view.showCurPLayer(curPlayer);
      view.drawBoard(getBoard());
      let move = view.takeInput();
      makeAMove(move, curPlayer);
      if (isWon(curPlayer)) {
        view.gameOver(curPlayer);
        gameOn = false;
      } else {
        changeCurPlayer();
      }
    }
  };

  return {
    play,
  };
})(firstPlayer, secondPlayer, view);

model.play();
