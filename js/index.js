const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#2f00ec';
const DEFAULT_SIZE = 16;

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

const gridContainer = document.querySelector('.grid-container');
const dimensionsValue = document.getElementById('dimensions');
const dimensionsLabel = document.querySelector('.dimensions-label');
const colorPicker = document.getElementById('color-picker');
const colorPickerBtn = document.getElementById('color-mode');
const rainbowBtn = document.getElementById('rainbow-mode')
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


const setCurrentMode = (mode) => {
  activateBtn(mode);
  currentMode = mode;
}

const setCurrentColor = (color) => {
  currentColor = color;
}

const setCurrentSize = (size) => {
  currentSize = size;
}

const activateBtn = (mode) => {
  switch (mode) {
    case 'color':
      colorPickerBtn.classList.add('selected');
      rainbowBtn.classList.remove('selected');
      eraseBtn.classList.remove('selected');
      break;
    case 'rainbow':
      rainbowBtn.classList.add('selected');
      colorPickerBtn.classList.remove('selected');
      eraseBtn.classList.remove('selected');
      break;
    case 'erase':
      eraseBtn.classList.add('selected');
      colorPickerBtn.classList.remove('selected');
      rainbowBtn.classList.remove('selected');
      break;
  }
}


const createGrid = (quantity) => {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${quantity}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${quantity}, 1fr)`;
  const cells = [...Array(quantity * quantity)].map(() => document.createElement('div'));
  cells.forEach(item => {
    item.classList.add('grid');
    item.addEventListener('mouseover', changeCellColor);
    item.addEventListener('mousedown', changeCellColor);
    gridContainer.append(item);
  });
}

const clearGrid = () => {
  const grid = document.querySelectorAll('.grid');
  grid.forEach(i => i.style.backgroundColor = 'transparent');
}

const changeCellColor = (e) => {
  if (e.type === 'mouseover' && !mouseDown) return;
  switch (currentMode) {
    case 'rainbow':
      e.target.style.backgroundColor = `${generateHexColor()}`;
      break;
    case 'color':
      e.target.style.backgroundColor = `${currentColor}`;
      break;
    case 'erase':
      e.target.style.backgroundColor = `${'transparent'}`;
      break;
  }
}

const generateHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


// listeners 
colorPicker.addEventListener('input', (e) => {
  setCurrentColor(e.target.value);
})

colorPickerBtn.addEventListener('click', () => {
  setCurrentMode('color');
})

rainbowBtn.addEventListener('click', () => {
  setCurrentMode('rainbow');
})

eraseBtn.addEventListener('click', () => {
  setCurrentMode('erase');
})

clearBtn.addEventListener('click', clearGrid);


dimensionsValue.addEventListener('input', () => {
  dimensionsLabel.innerText = `${dimensionsValue.value} x ${dimensions.value}`;
});

dimensionsValue.addEventListener('change', () => {
  createGrid(dimensionsValue.value);
});

window.addEventListener('load', () => {
  createGrid(DEFAULT_SIZE);
  setCurrentMode(DEFAULT_MODE);
})