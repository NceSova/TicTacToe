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

  const getBoard = () => board;
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
  playerOneName = "Первый игрок",
  playerTwoName = "Второй игрок"
) {
  let gameOn = true;
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

  const isTie = () => {
    let cells = board.getBoard().filter((cell) => cell.getValue() === "#");
    if (!cells.length) {
      return true;
    } else {
      return false;
    }
  };

  const playRound = (index, gameOverCallback, tieCallback) => {
    console.log(
      `${getActivePlayer().name} placing ${getActivePlayer().token} on ${index}`
    );
    board.makeAMove(index, getActivePlayer().token);
    // Game end logic
    if (isGameOver()) {
      gameOverCallback();
      return;
    } else if (isTie()) {
      tieCallback();
      return;
    } else {
      switchActivePlayer();
      printNewRound();
    }
  };

  printNewRound();
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const playerTokenDiv = document.querySelector(".turn-token");
  const boardDiv = document.querySelector(".board-container");

  const updateScreen = () => {
    boardDiv.innerHTML = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `Сейчас ходит: ${activePlayer.name}`;
    playerTokenDiv.textContent = `-> ${activePlayer.token}`;

    for (let index = 0; index < 9; index++) {
      const curCell = board[index];
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.id = index;
      if (curCell.getValue() === "X") {
        let col = "blue";
        cellButton.style.color = col;
      } else if (curCell.getValue() === "O") {
        let col = "red";
        cellButton.style.color = col;
      }
      cellButton.textContent = curCell.getValue();
      boardDiv.appendChild(cellButton);
    }
  };

  const gameOverCallback = () => {
    let win = document.querySelector(".winner");
    win.textContent = `Победил ${game.getActivePlayer().name}`;
    win.style.cssText = "font-size: 2rem; color: #e11d48;";
    console.log("game OVER");
    const buttons = document.querySelectorAll(".cell");
    buttons.forEach((button) => {
      button.disabled = true;
    });
    boardDiv.removeEventListener("click", clickHandler);
  };

  const tieCallback = () => {
    let win = document.querySelector(".winner");
    win.textContent = "НИЧЬЯ";
    win.style.cssText = "font-size: 2rem; color: #e11d48;";
    boardDiv.removeEventListener("click", clickHandler);
    playerTurnDiv.textContent = `НИЧЬЯ!!!`;
    console.log("ITS A TIE");
  };

  function clickHandler(e) {
    const cell = e.target.id;
    console.log(`click detected ${cell}`);
    game.playRound(cell, gameOverCallback, tieCallback);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandler);
  updateScreen();
}
ScreenController();
