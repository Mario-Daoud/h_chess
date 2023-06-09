const setup = () => {
  const board = document.querySelector("#gameboard");
  const boardWidth = 8;
  const playerDisplay = document.querySelector("#player");
  const infoDisplay = document.querySelector("#info-display");

  let currentPlayerColor = "white";
  playerDisplay.innerHTML = currentPlayerColor;

  let startPositionId;
  let currentElement;
  let promotionPiece;

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

        const targetNumber =
          Number(e.target.getAttribute("square-nr")) ||
          Number(e.target.parentNode.getAttribute("square-nr"));
          if (
            targetNumber >= 0 &&
            targetNumber <= 7 &&
            currentElement.id === "pawn"
          ) {
            promotePiece(e.target.parentNode);
          }

        e.target.remove();
        checkForWin();
        
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
        const targetNumber =
          Number(e.target.getAttribute("square-nr")) ||
          Number(e.target.parentNode.getAttribute("square-nr"));
          if (
          targetNumber >= 0 &&
          targetNumber <= 7 &&
          currentElement.id === "pawn"
        ) {
          promotePiece(e.target);
        }
        checkForWin();
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
        for (let i = 48; i < 56; i++) {
          startRow.push(i);
        }

        if (
          (startId - boardWidth === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild) ||
          (startRow.includes(startId) &&
            startId - boardWidth * 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild) ||
          (startId - boardWidth - 1 === targetNumber &&
            document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild) ||
          (startId - boardWidth + 1 === targetNumber &&
            document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild)
        ) {
          return true;
        }

        break;

      case "knight":
        if (
          startId + boardWidth * 2 + 1 === targetNumber ||
          startId + boardWidth * 2 - 1 === targetNumber ||
          startId + boardWidth - 2 === targetNumber ||
          startId + boardWidth + 2 === targetNumber ||
          startId - boardWidth * 2 + 1 === targetNumber ||
          startId - boardWidth * 2 - 1 === targetNumber ||
          startId - boardWidth - 2 === targetNumber ||
          startId - boardWidth + 2 === targetNumber
        ) {
          return true;
        }
        break;

      case "bishop":
        if (
          startId + boardWidth + 1 === targetNumber ||
          (startId + boardWidth * 2 + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild) ||
          (startId + boardWidth * 4 + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild) ||
          (startId + boardWidth * 5 + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild) ||
          (startId + boardWidth * 6 + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 + 5}"]`
            ).firstChild) ||
          (startId + boardWidth * 7 + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 + 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 6 + 6}"]`
            ).firstChild) ||
          startId - boardWidth - 1 === targetNumber ||
          (startId - boardWidth * 2 - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild) ||
          (startId - boardWidth * 4 - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild) ||
          (startId - boardWidth * 5 - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild) ||
          (startId - boardWidth * 6 - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 - 5}"]`
            ).firstChild) ||
          (startId - boardWidth * 7 - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 - 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 6 - 6}"]`
            ).firstChild) ||
          startId - boardWidth + 1 === targetNumber ||
          (startId - boardWidth * 2 + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild) ||
          (startId - boardWidth * 4 + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild) ||
          (startId - boardWidth * 5 + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild) ||
          (startId - boardWidth * 6 + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 + 5}"]`
            ).firstChild) ||
          (startId - boardWidth * 7 + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 + 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 6 + 6}"]`
            ).firstChild) ||
          startId + boardWidth - 1 === targetNumber ||
          (startId + boardWidth * 2 - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild) ||
          (startId + boardWidth * 4 - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild) ||
          (startId + boardWidth * 5 - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild) ||
          (startId + boardWidth * 6 - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 - 5}"]`
            ).firstChild) ||
          (startId + boardWidth * 7 - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 - 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 6 - 6}"]`
            ).firstChild)
        ) {
          return true;
        }
        break;

      case "rook":
        if (
          startId + boardWidth === targetNumber ||
          (startId + boardWidth * 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild) ||
          (startId + boardWidth * 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild) ||
          (startId + boardWidth * 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild) ||
          (startId + boardWidth * 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 5}"]`)
              .firstChild) ||
          (startId + boardWidth * 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 6}"]`)
              .firstChild) ||
          startId - boardWidth === targetNumber ||
          (startId - boardWidth * 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild) ||
          (startId - boardWidth * 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild) ||
          (startId - boardWidth * 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild) ||
          (startId - boardWidth * 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 5}"]`)
              .firstChild) ||
          (startId - boardWidth * 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 6}"]`)
              .firstChild) ||
          startId + 1 === targetNumber ||
          (startId + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild) ||
          (startId + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild) ||
          (startId + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild) ||
          (startId + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild) ||
          (startId + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 5}"]`)
              .firstChild) ||
          (startId + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 6}"]`)
              .firstChild) ||
          startId - 1 === targetNumber ||
          (startId - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild) ||
          (startId - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild) ||
          (startId - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild) ||
          (startId - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild) ||
          (startId - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 5}"]`)
              .firstChild) ||
          (startId - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 6}"]`).firstChild)
        ) {
          return true;
        }
        break;

      case "queen":
        if (
          startId + boardWidth + 1 === targetNumber ||
          (startId + boardWidth * 2 + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild) ||
          (startId + boardWidth * 4 + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild) ||
          (startId + boardWidth * 5 + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild) ||
          (startId + boardWidth * 6 + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 + 5}"]`
            ).firstChild) ||
          (startId + boardWidth * 7 + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 + 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 6 + 6}"]`
            ).firstChild) ||
          startId - boardWidth - 1 === targetNumber ||
          (startId - boardWidth * 2 - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild) ||
          (startId - boardWidth * 4 - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild) ||
          (startId - boardWidth * 5 - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild) ||
          (startId - boardWidth * 6 - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 - 5}"]`
            ).firstChild) ||
          (startId - boardWidth * 7 - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 - 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 6 - 6}"]`
            ).firstChild) ||
          startId - boardWidth + 1 === targetNumber ||
          (startId - boardWidth * 2 + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild) ||
          (startId - boardWidth * 4 + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild) ||
          (startId - boardWidth * 5 + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild) ||
          (startId - boardWidth * 6 + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 + 5}"]`
            ).firstChild) ||
          (startId - boardWidth * 7 + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth + 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 2 + 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 3 + 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 4 + 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 5 + 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId - boardWidth * 6 + 6}"]`
            ).firstChild) ||
          startId + boardWidth - 1 === targetNumber ||
          (startId + boardWidth * 2 - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild) ||
          (startId + boardWidth * 4 - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild) ||
          (startId + boardWidth * 5 - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild) ||
          (startId + boardWidth * 6 - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 - 5}"]`
            ).firstChild) ||
          (startId + boardWidth * 7 - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth - 1}"]`)
              .firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 2 - 2}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 3 - 3}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 4 - 4}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 5 - 5}"]`
            ).firstChild &&
            !document.querySelector(
              `[square-nr="${startId + boardWidth * 6 - 6}"]`
            ).firstChild) ||
          startId + boardWidth === targetNumber ||
          (startId + boardWidth * 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild) ||
          (startId + boardWidth * 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild) ||
          (startId + boardWidth * 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild) ||
          (startId + boardWidth * 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild) ||
          (startId + boardWidth * 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 5}"]`)
              .firstChild) ||
          (startId + boardWidth * 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + boardWidth * 6}"]`)
              .firstChild) ||
          startId - boardWidth === targetNumber ||
          (startId - boardWidth * 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild) ||
          (startId - boardWidth * 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild) ||
          (startId - boardWidth * 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild) ||
          (startId - boardWidth * 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild) ||
          (startId - boardWidth * 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 5}"]`)
              .firstChild) ||
          (startId - boardWidth * 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - boardWidth}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - boardWidth * 6}"]`)
              .firstChild) ||
          startId + 1 === targetNumber ||
          (startId + 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild) ||
          (startId + 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild) ||
          (startId + 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild) ||
          (startId + 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild) ||
          (startId + 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 5}"]`)
              .firstChild) ||
          (startId + 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId + 6}"]`)
              .firstChild) ||
          startId - 1 === targetNumber ||
          (startId - 2 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild) ||
          (startId - 3 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild) ||
          (startId - 4 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild) ||
          (startId - 5 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild) ||
          (startId - 6 === targetNumber &&
            !document.querySelector(`[square-nr="${startId - 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 5}"]`)
              .firstChild) ||
          (startId - 7 === targetNumber &&
            !document.querySelector(`[square-nr="${startId + 1}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 2}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 3}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 4}"]`)
              .firstChild &&
            !document.querySelector(`[square-nr="${startId - 6}"]`).firstChild)
        ) {
          return true;
        }
        break;

      case "king":
        if (
          startId + 1 === targetNumber ||
          startId - 1 === targetNumber ||
          startId + boardWidth === targetNumber ||
          startId - boardWidth === targetNumber ||
          startId + boardWidth + 1 === targetNumber ||
          startId + boardWidth - 1 === targetNumber ||
          startId - boardWidth + 1 === targetNumber ||
          startId - boardWidth - 1 === targetNumber
        ) {
          return true;
        }
        break;
    }
  };

  promotePiece = (target) => {
    showPromotionModal(() => {
      const opponentColor = currentPlayerColor === "white" ? "black" : "white";
      target.innerHTML = promotionPiece.innerHTML;
      target.firstChild.setAttribute("draggable", "true");
      target.firstChild.firstChild.classList.add(opponentColor);
      target.firstChild.firstChild.style.height = "40px";
      target.firstChild.firstChild.style.width = "40px";
      target.firstChild.firstChild.style.margin = "10px";
    });
  };

  showPromotionModal = (callback) => {
    const promotionModal = document.querySelector("#promotion-modal");
    promotionModal.style.display = "flex";
    promotionModal.style.justifyContent = "space-around";
    promotionModal.style.alignItems = "center";
    promotionModal.style.flexWrap = "wrap";
    promotionModal.style.width = "480px";

    promotionPieces.forEach((pieceHTML) => {
      const pieceElement = document.createElement("div");
      pieceElement.innerHTML = pieceHTML;
      pieceElement.firstChild.style.width = "40px";
      pieceElement.firstChild.style.height = "40px";
      pieceElement.firstChild.firstChild.style.width = "40px";
      pieceElement.firstChild.firstChild.style.height = "40px";
      promotionModal.appendChild(pieceElement);
    });

    promotionModal.childNodes.forEach((piece) => {
      piece.addEventListener("click", () => {
        promotionPiece = piece;
        promotionModal.innerHTML = "";
        callback();
      });
    });
  };

  checkForWin = () => {
    const kings = Array.from(document.querySelectorAll("#king"));
    if (!kings.some((king) => king.firstChild.classList.contains("white"))) {
      infoDisplay.textContent = "Black wins!";
      document.querySelectorAll(".square").forEach((square) => {
        square.firstChild?.setAttribute("draggable", "false");
      });
    }
    if (!kings.some((king) => king.firstChild.classList.contains("black"))) {
      infoDisplay.textContent = "White wins!";
      document.querySelectorAll(".square").forEach((square) => {
        square.firstChild?.setAttribute("draggable", "false");
      });
    }

    if (infoDisplay.textContent === "Black wins!" || infoDisplay.textContent === "White wins!") {
        document.querySelector("#gameboard").innerHTML = "";
        setTimeout(() => {
            infoDisplay.textContent = "";
        }, 7000)
        createBoard();
    }
  };

  changePlayer = () => {
    if (currentPlayerColor === "white") {
      reverseIds();
      currentPlayerColor = "black";
      playerDisplay.innerHTML = currentPlayerColor;
    } else {
      revertIds();
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
