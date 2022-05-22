const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const $currentColor = document.querySelector('#currentColor')
const $cleaneBtn = document.querySelector('#jsCleane')

const initialColor = '#2c2c2c';
const canvasSize = 700;

canvas.height = canvasSize;
canvas.width = canvasSize;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);

ctx.lineWidth = 2.5;
ctx.strokeStyle = initialColor;
ctx.fillStyle = initialColor;


let painting = false;
let filling = false;

function stopPainting () {
    painting = false;
}

function startPainting () {
    painting = true;
}

function onMouseMove (event) {
    x = event.offsetX;
    y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function onMouseDown (event) {
    if (filling === false) {
        painting = true;
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    $currentColor.style.backgroundColor = color;
}

function handleRangeChange (event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeClick () {
    if (filling === true) {
        filling = false;
        mode.innerHTML = 'Заливка';
        mode.style.backgroundColor = 'white'
    } else {
        filling = true;
        mode.style.backgroundColor = '#c8d6e5'
        mode.innerHTML = 'Рисование';
    }
}

function handleCanvasClick () {
    if (filling) {
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}

function handleCM (event) {
    event.preventDefault();
}

function handleSaveClick () {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my drawing';
    link.click();
}

function handleCleanCanvas () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}


if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}


Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}

if ($cleaneBtn) {
    $cleaneBtn.addEventListener('click', handleCleanCanvas);
}