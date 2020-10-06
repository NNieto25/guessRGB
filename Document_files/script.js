//Global variables
let colors;
//HTML elements
let title = document.querySelector("h1");
let reset = document.getElementById("reset");
let message = document.getElementById("message");
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");

const fillColorsArray = (amount) => {
  let colorsArray = [];
  for (let i = 0; i < amount; i++) {
    colorsArray = [...colorsArray, getRandomColor()];
  }
  return colorsArray;
};

const displayColor = (tag) => {
  tag.textContent = pickColor(colors);
};

const getRandomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const pickColor = (colorsArray) => {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};

const fillSquares = (colorsArray, squaresArray) => {
  let index = 0;
  squaresArray.forEach(
    (square) => (square.style.backgroundColor = colorsArray[index++])
  );
};

const win = (color, squaresArray, messageElement) => {
  squaresArray.forEach((square) => (square.style.backgroundColor = color));
  messageElement.textContent = "Skere!";
  title.style.backgroundColor = color;
};

const lose = (singleSquare, messageElement) => {
  singleSquare.style.backgroundColor = "#fff";
  messageElement.textContent = "Hijole crack";
};

const selectColorListener = (squares, colorDisplay, message) => {
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      let selectedColor = square.style.backgroundColor;
      if (selectedColor == colorDisplay.textContent) {
        win(selectedColor, squares, message);
      } else {
        lose(square, message);
      }
    });
  });
};

const resetGameListener = (message) => {
  reset.addEventListener("click", () => {
    colors = fillColorsArray(6);
    displayColor(colorDisplay);
    fillSquares(colors, squares);
    message.textContent = "";
    title.style.backgroundColor = "#232323";
  });
};

const app = () => {
  resetGameListener(message);
  selectColorListener(squares, colorDisplay, message);
  reset.click();
};

window.onload = app;