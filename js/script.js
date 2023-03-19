"use strict";
const gridContainer = document.querySelector(".container");
const gridLineState = document.querySelector(
  '.switch.lines input[type="checkbox"]'
);
const slider = document.querySelector("#slider");
let allDivs;
const gridColorPicker = document.querySelector('#gridColorPicker');
let sliderValue = document.querySelector("#rangeValue").innerText;
const defaultGrid = Math.pow(16, 2);
let selectedGrid = defaultGrid;


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
    (x) => x.selectorText === "#container"
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
}

/* temp call to debug */
createGrid();
/* temp call to debug */

function clearGridDivs() {
  let allDivs = document.querySelectorAll("#container>*");
  for (let i = 0; i < allDivs.length; i++) {
    const elem = allDivs[i];
    elem.parentNode.removeChild(elem);
  }
}

gridLineState.onchange = gridLines;

function gridLines() {
  allDivs = document.querySelectorAll(".container>*");
  if (gridLineState.checked) {
    allDivs.forEach((x) => {
      x.style.border = "rgb(156, 156, 156) 0.1px solid";
    });
  } else {
    allDivs.forEach((x) => (x.style.border = "none"));
  }
}



gridColorPicker.onchange = gridBackgroundColor;

function gridBackgroundColor() {
    let currentColor = gridColorPicker.value;
    allDivs = document.querySelectorAll(".container>*");
    allDivs.forEach((x)=>{
        x.style.backgroundColor = `${currentColor}`;
    });
}



