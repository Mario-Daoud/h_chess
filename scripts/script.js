const setup = () => {
  const board = document.querySelector("#gameboard");
  const boardWidth = 8;
  const playerDisplay = document.querySelector("#player");
  const infoDisplay = document.querySelector("#info-display");

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
        square.firstChild.firstChild.classList.add("darkPiece");
      }
      if (i >= boardWidth * 6) {
        square.firstChild.firstChild.classList.add("lightPiece");
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
    e.target.parentNode.append(currentElement);
    e.target.remove();
  };

  document.querySelectorAll("#gameboard .square").forEach((square) => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
  });
};

window.addEventListener("load", setup);
