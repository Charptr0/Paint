import * as color from "./colors.js";

const canvas = document.querySelector("canvas");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const ctx = canvas.getContext("2d");

// set canvas height and width
canvas.width = windowWidth * 0.85;
canvas.height = windowHeight * 0.8;

// global variables
let mouseIsDown = false;
let imageHistory = [];
let currentIndex = -1;

canvas.addEventListener("mousemove", (e) => {
    // only draw if the mouse is down
    if(mouseIsDown) {
        const pos = getMousePos(canvas, e);
        draw(pos);
    }
})

canvas.addEventListener("mousedown", (e) => {
    mouseIsDown = true;     

    // draw at least once
    const pos = getMousePos(canvas, e);
    draw(pos)
})

canvas.addEventListener("mouseup", () => {
    mouseIsDown = false; // the user has let go of the 
    ctx.beginPath();

    currentIndex++;
    imageHistory[currentIndex] = ctx.getImageData(0, 0, canvas.width, canvas.height);
})

addEventListener("keydown", () => {
    undo();
})

function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    return {
      x: (e.clientX - rect.left) * scaleX,  
      y: (e.clientY - rect.top) * scaleY
    }
}

function draw(pos) {
    ctx.fillStyle = "#FFF000";
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function clear() {
    ctx.fillStyle = color.WHITE;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    currentIndex = -1;
}

function undo() {
    if(currentIndex < 1) {
        clear();
        return;
    }

    currentIndex--;
    ctx.putImageData(imageHistory[currentIndex], 0, 0);
}


