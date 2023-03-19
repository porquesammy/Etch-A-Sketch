"use strict";
const gridContainer = document.querySelector(".container");
const gridLineState = document.querySelector(
  '.switch.lines input[type="checkbox"]'
);
const rainbowState = document.querySelector(
  '.switch.rainbow input[type="checkbox"]'
);
const slider = document.querySelector("#slider");
const gridColorPicker = document.querySelector("#gridColorPicker");
let sliderValue = document.querySelector("#rangeValue").innerText;
const defaultGrid = Math.pow(16, 2);
let selectedGrid = defaultGrid;
const penColorPicker = document.querySelector("#penColorPicker");
let currentPenColor = "#70DbFF";
let mouseDown = false;

gridColorPicker.onchange = gridBackgroundColor;
gridLineState.onchange = gridLines;
rainbowState.onchange = penColor;
penColorPicker.onchange = penColor;

//grid slider power of 2 for even grids
slider.onchange = function () {
  selectedGrid = Math.pow(`${slider.value}`, 2);
  createGrid();
};

// Constructable Stylesheets to grab .container in css file
// Downside is stylesheet needs to stay in correct order
function createGrid() {
  clearGridDivs();
  [...document.styleSheets[0].cssRules].find(
    (i) => i.selectorText === "#container"
  ).style.cssText =
    "grid-template-columns: repeat(" +
    `${Math.sqrt(selectedGrid)}` +
    ", 1fr); grid-template-rows: repeat(" +
    `${Math.sqrt(selectedGrid)}` +
    ", 1fr);";
  //create appropriate amount of div containers
  for (let index = selectedGrid; index > 0; index--) {
    gridContainer.appendChild(document.createElement("div"));
  }
  gridLines();
  gridBackgroundColor();
  divEventListeners();
}
createGrid();

function clearGridDivs() {
  let allDivs = document.querySelectorAll("#container>*");
  for (let i = 0; i < allDivs.length; i++) {
    const elem = allDivs[i];
    elem.parentNode.removeChild(elem);
  }
}

function gridLines() {
  let allDivs = document.querySelectorAll(".container>*");
  if (gridLineState.checked) {
    allDivs.forEach((i) => {
      i.style.border = "rgb(156, 156, 156) 0.1px solid";
    });
  } else {
    allDivs.forEach((i) => (i.style.border = "none"));
  }
}

function gridBackgroundColor() {
  let currentGridColor = gridColorPicker.value;
  let allDivs = document.querySelectorAll(".container>*");
  allDivs.forEach((i) => {
    i.style.backgroundColor = `${currentGridColor}`;
  });
}

// clear button
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", createGrid);

//add event listeners to every div
function divEventListeners() {
  let allDivs = document.querySelectorAll(".container>*");
  allDivs.forEach((i) => {
    i.addEventListener("mouseover", draw);
    i.addEventListener("mousedown", draw);
    i.addEventListener("dblclick", erase);
    //fix bug where mouseup happens outside of divs and keeps drawing
    window.addEventListener("mouseup", stopDraw);
  });
}

function draw(e) {
  penColor();
  if (e.type === "mousedown") {
    e.preventDefault();
    mouseDown = true;
    e.toElement.style.backgroundColor = currentPenColor;
  } else if (e.type === "mouseover" && mouseDown) {
    e.toElement.style.backgroundColor = currentPenColor;
  }
}

function stopDraw() {
  mouseDown = false;
}

function penColor() {
  if (rainbowState.checked) {
    currentPenColor = `rgb(${random(255)},${random(255)},${random(255)})`;
  } else {
    currentPenColor = penColorPicker.value;
  }
}

// helper for rainbow
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function erase(e) {
  e.toElement.style.backgroundColor = `${gridColorPicker.value}`;
}
