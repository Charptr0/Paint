import {COLORS} from "./colors.js";

const canvas = document.querySelector("canvas");
const clearBtn = document.getElementById("clear-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");

const currentColorSpan = document.getElementById("current-color");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const ctx = canvas.getContext("2d");

// set canvas height and width
canvas.width = windowWidth * 0.8;
canvas.height = windowHeight * 0.8;

// global variables
let mouseIsDown = false;
let imageHistory = [];
let currentIndex = -1;

/**
 * Listener for when the user is moving the mouse
 * 
 * Draw on the canvas iff when the mouse is held down
 */
canvas.addEventListener("mousemove", (e) => {
    // only draw if the mouse is down
    if(mouseIsDown) {
        const pos = getMousePos(e);
        draw(pos);
    }
})

/**
 * Listener for when the user have their mouse pressed down
 * 
 * Initialize drawing
 */
canvas.addEventListener("mousedown", (e) => {
    mouseIsDown = true;

    // draw at least once
    const pos = getMousePos(e);
    draw(pos)
})

/**
 * Listener for when the user have their lifted their mouse
 * 
 * Stop the user from drawing and record the current state of the canvas
 */
canvas.addEventListener("mouseup", () => {
    mouseIsDown = false;
    ctx.beginPath();

    // record the current stroke
    currentIndex++;
    imageHistory[currentIndex] = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // destroy all future history if a new change has been made
    if(currentIndex < (imageHistory.length - 1)) {
        imageHistory.splice(currentIndex + 1, imageHistory.length);
    }
})

/**
 * Listener for keyboard shortcuts
 * 
 * Shortcuts:
 * ctrl + z -> undo
 * ctrl + y -> redo
 * c -> clear
 */
addEventListener("keydown", (e) => {
    // undo last stroke
    if(e.ctrlKey && e.key === "z") {
        undo();
    }

    // redo last stroke
    else if(e.ctrlKey && e.key === "y") {
        redo();
    }

    else if(e.key === "c") {
        clear();
    }
})

clearBtn.addEventListener("click", clear);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

/**
 * Get the current color selected
 * @returns the hex code of the current color
 */
function getCurrentColor() {
    // grab the current color
    const currentColor = currentColorSpan.innerHTML.toLowerCase();

    // try to convert to hex
    try {
        return COLORS[currentColor];
    } catch (err) {
        // return the default color if an error occurs
        alert("Something went wrong, assuming default color")
        return COLORS.black;
    }
}

/**
 * Get the current mouse position in the canvas
 * @param e event 
 * @returns the accurate x and y position
 */
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    return {
      x: (e.clientX - rect.left) * scaleX,  
      y: (e.clientY - rect.top) * scaleY
    }
}

/**
 * Draw in the canvas
 * @param pos the current mouse position 
 */
function draw(pos) {
    ctx.strokeStyle = getCurrentColor();
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

/**
 * Clear the canvas
 */
function clear() {
    ctx.fillStyle = COLORS.white;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    currentIndex = -1;
}

/**
 * Undo the last stroke
 */
function undo() {
    // nothing to undo
    if(currentIndex < 1) {
        clear();
        return;
    }

    currentIndex--;
    ctx.putImageData(imageHistory[currentIndex], 0, 0);
}

/**
 * Redo the last stroke
 */
function redo() {
    // nothing to redo
    if(currentIndex === imageHistory.length - 1) {
        return;
    }

    currentIndex++;
    ctx.putImageData(imageHistory[currentIndex], 0, 0);
}