function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won <span id="winnerName">Player Name</span>';
  gameOverElement.style.display = "none";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
    }
  }

  for (let i = 0; i < 9; i++) {
    gameBoradElement.children[i].textContent = "";
    gameBoradElement.children[i].classList.remove("disabled");
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set names for both players!!");
    return;
  }

  resetGameStatus();
  activePlayerElement.textContent = players[activePlayer].name;
  gameAreaELement.style.display = "block";
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[1][1] > 0 &&
    ((gameData[0][0] === gameData[1][1] && gameData[0][0] === gameData[2][2]) ||
      (gameData[0][2] === gameData[1][1] && gameData[1][1] === gameData[2][0]))
  ) {
    return gameData[1][1];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}
function switchActivePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }
  selectedField.textContent = players[activePlayer].Symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  const winnerId = checkForGameOver();

  if (winnerId != 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchActivePlayer();
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw";
  }
}
