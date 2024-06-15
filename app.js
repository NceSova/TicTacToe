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

  const calculateWinForPlayer = (player) => {
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
  const setTokenOnCell = (index, token) => _board[index].setToken(token);
  const clear = () => {
    _board = [];
    generateBoard();
  };

  return {
    clear,
    getBoard,
    setTokenOnCell,
    calculateWinForPlayer,
  };
})();

const game = (function () {})();

console.log("start");
const me = Player(1);
gameboard.setTokenOnCell(1, me.getPlayerToken());
gameboard.setTokenOnCell(4, me.getPlayerToken());
gameboard.setTokenOnCell(7, me.getPlayerToken());
console.log(gameboard.calculateWinForPlayer(me));
console.log(gameboard.getBoard());
gameboard.clear();
console.log(gameboard.getBoard());
