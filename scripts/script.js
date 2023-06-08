const setup = () => {
  const board = document.querySelector("#gameboard");
  const boardWidth = 8;
  const playerDisplay = document.querySelector("#player");
  const infoDisplay = document.querySelector("#info-display");
  const startPieces = [pawn, bishop, knight, rook, queen, king];
};
window.addEventListener("load", setup);
