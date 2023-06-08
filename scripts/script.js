const setup = () => {
  const board = document.querySelector("#gameboard");
  const boardWidth = 8;
  const playerDisplay = document.querySelector("#player");
  const infoDisplay = document.querySelector("#info-display");

  let currentPlayerColor = "white";
  playerDisplay.innerHTML = currentPlayerColor;

  let startPositionId;
  let currentElement;

  createBoard = () => {
    startPieces.forEach((piece, i) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.innerHTML = piece;
      square.firstChild?.setAttribute("draggable", "true");
      square.setAttribute("square-nr", i);

      const row = Math.floor(i / boardWidth) + 1;

      if (row % 2 === 0) {
        square.classList.add(i % 2 === 0 ? "lightSquare" : "darkSquare");
      } else {
        square.classList.add(i % 2 === 0 ? "darkSquare" : "lightSquare");
      }

      if (i <= boardWidth * 2 - 1) {
        square.firstChild.firstChild.classList.add("black");
      }
      if (i >= boardWidth * 6) {
        square.firstChild.firstChild.classList.add("white");
      }

      board.append(square);
    });
  };
  createBoard();

  dragStart = (e) => {
    startPositionId = e.target.parentNode.getAttribute("square-nr");
    currentElement = e.target;
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  dragDrop = (e) => {
    e.stopPropagation();
    const correctColor =
      currentElement.firstChild.classList.contains(currentPlayerColor);
    const opponentColor = currentPlayerColor === "white" ? "black" : "white";
    const taken = e.target.classList.contains("piece");
    const takenByOpponent =
      e.target.firstChild?.classList.contains(opponentColor);
    const valid = checkIfValid(e.target);

    if (correctColor) {
      if (takenByOpponent && valid) {
        e.target.parentNode.append(currentElement);
        e.target.remove();
        changePlayer();
        return;
      }

      if (taken && !takenByOpponent) {
        infoDisplay.textContent = "you cannot go here";
        setTimeout(() => {
          infoDisplay.textContent = "";
        }, 3000);
        return;
      }

      if (valid) {
        e.target.append(currentElement);
        changePlayer();
        return;
      }
    }
  };

  checkIfValid = (target) => {
    const targetNumber =
      Number(target.getAttribute("square-nr")) ||
      Number(target.parentNode.getAttribute("square-nr"));
    const piece = currentElement.id;
    const startId = Number(startPositionId);

    switch (piece) {
      case "pawn":
        const startRow = [];
        for (let i = 8; i < 16; i++) {
          startRow.push(i);
        }

        if (
          (startRow.includes(startId) &&
            startId + boardWidth * 2 === targetNumber) ||
          (startRow.includes(startId) &&
            startId - boardWidth * 2 === targetNumber) ||
          startId + boardWidth === targetNumber ||
          startId - boardWidth === targetNumber ||
          (startId + boardWidth - 1 === targetNumber &&
            document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild) ||
          (startId + boardWidth + 1 === targetNumber &&
            document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild)
        ) {
          return true;
        }

      case "knight":
        if (
          startId + boardWidth * 2 - 1 === targetNumber ||
          startId + boardWidth * 2 + 1 === targetNumber ||
          startId - boardWidth * 2 - 1 === targetNumber ||
          startId - boardWidth * 2 + 1 === targetNumber ||
          startId + boardWidth - 2 === targetNumber ||
          startId + boardWidth + 2 === targetNumber ||
          startId - boardWidth - 2 === targetNumber ||
          startId - boardWidth + 2 === targetNumber
        ) {
          return true;
        }

        case "bishop": 
        if (
startId + boardWidth + 1 === targetNumber ||
startId + boardWidth * 2 + 2 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`).firstChild ||
startId + boardWidth * 3 + 3 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 2 + 2}"]`).firstChild ||
startId + boardWidth * 4 + 4 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 3 + 3}"]`).firstChild ||
startId + boardWidth * 5 + 5 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 4 + 4}"]`).firstChild ||
startId + boardWidth * 6 + 6 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 5 + 5}"]`).firstChild ||
startId + boardWidth * 7 + 7 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 6 + 6}"]`).firstChild ||
startId - boardWidth - 1 === targetNumber ||
startId - boardWidth * 2 - 2 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`).firstChild ||
startId - boardWidth * 3 - 3 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 2 - 2}"]`).firstChild ||
startId - boardWidth * 4 - 4 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 3 - 3}"]`).firstChild ||
startId - boardWidth * 5 - 5 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 4 - 4}"]`).firstChild ||
startId - boardWidth * 6 - 6 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 5 - 5}"]`).firstChild ||
startId - boardWidth * 7 - 7 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 6 - 6}"]`).firstChild ||
startId + boardWidth - 1 === targetNumber ||
startId + boardWidth * 2 - 2 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`).firstChild ||
startId + boardWidth * 3 - 3 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 2 - 2}"]`).firstChild ||
startId + boardWidth * 4 - 4 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 3 - 3}"]`).firstChild ||
startId + boardWidth * 5 - 5 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 4 - 4}"]`).firstChild ||
startId + boardWidth * 6 - 6 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 5 - 5}"]`).firstChild ||
startId + boardWidth * 7 - 7 === targetNumber && !document.querySelector(`[square-nr="${startId + boardWidth * 6 - 6}"]`).firstChild ||
startId - boardWidth + 1 === targetNumber ||
startId - boardWidth * 2 + 2 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`).firstChild ||
startId - boardWidth * 3 + 3 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 2 + 2}"]`).firstChild ||
startId - boardWidth * 4 + 4 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 3 + 3}"]`).firstChild ||
startId - boardWidth * 5 + 5 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 4 + 4}"]`).firstChild ||
startId - boardWidth * 6 + 6 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 5 + 5}"]`).firstChild ||
startId - boardWidth * 7 + 7 === targetNumber && !document.querySelector(`[square-nr="${startId - boardWidth * 6 + 6}"]`).firstChild

        ) {
          return true;
        }
    }
  };

  changePlayer = () => {
    if (currentPlayerColor === "white") {
      revertIds();
      currentPlayerColor = "black";
      playerDisplay.innerHTML = currentPlayerColor;
    } else {
      reverseIds();
      currentPlayerColor = "white";
      playerDisplay.innerHTML = currentPlayerColor;
    }
  };

  reverseIds = () => {
    document.querySelectorAll(".square").forEach((square, i) => {
      square.setAttribute("square-nr", boardWidth * boardWidth - 1 - i);
    });
  };

  revertIds = () => {
    document.querySelectorAll(".square").forEach((square, i) => {
      square.setAttribute("square-nr", i);
    });
  };

  document.querySelectorAll(".square").forEach((square) => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
  });
};

window.addEventListener("load", setup);
