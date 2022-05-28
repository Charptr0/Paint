import {COLORS, generateRandomColor} from "./colors.js";

const canvas = document.querySelector("canvas");
const clearBtn = document.getElementById("clear-btn");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const increaseCanvasHeightBtn = document.getElementById("increase-height-btn");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const randomColorBtn = document.getElementById("random");

const currentColorSpan = document.getElementById("current-color");
const currentPenSize = document.getElementById("change-pen-size");

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
let currentPage = 1;
let currentRandomColor = generateRandomColor();

const pages = {};

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
        return;
    }

    // redo last stroke
    else if(e.ctrlKey && e.key === "y") {
        redo();
        return;
    }

    switch(e.key) {
        case "c": // clear canvas shortcut
            clear();
            break;

        case "f": // random color shortcut
            currentRandomColor = generateRandomColor();
            currentColorSpan.innerHTML = "random";
            break;

        case "b": // change to default black
            currentColorSpan.innerHTML = "black";
            break;

        case "r": // change to red
            currentColorSpan.innerHTML = "red";
            break;

        case "g": // change to red
            currentColorSpan.innerHTML = "green";
            break;

        case "b": // change to default black
            currentColorSpan.innerHTML = "blue";
            break;

        case "z": // decrease the pen size by 5
            currentPenSize.value > 1 ? currentPenSize.value = parseInt(currentPenSize.value) - 5 : currentPenSize.value = 1;
            break;

        case "x": // increase the pen size by 5
            currentPenSize.value = parseInt(currentPenSize.value) + 5;
            break

        default:
            break;
    }
})

clearBtn.addEventListener("click", clear);
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

randomColorBtn.addEventListener("click", () => {
    currentRandomColor = generateRandomColor();
})

/**
 * Previous button listener
 */
prevPageBtn.addEventListener("click", () => {
    if(currentPage === 1) return;

    // saved the canvas from last page
    savePageData(currentPage);

    currentPage--;

    // restore the last page data
    restorePageData(currentPage);
})

/**
 * Increase the canvas height by 1.5x
 */
increaseCanvasHeightBtn.addEventListener("click", () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
    
    canvas.height *= 1.5;

    ctx.putImageData(imageData, 0, 0);
})

/**
 * Next button listener
 */
nextPageBtn.addEventListener("click", () => {
    // saved the canvas from last page
    savePageData(currentPage);

    // clear board and image history
    clear();
    imageHistory = [];

    currentPage++;
    currentPage in pages ? restorePageData(currentPage) : savePageData(currentPage);
})

/**
 * Get the current color selected
 * @returns the hex code of the current color
 */
function getCurrentColor() {
    // grab the current color
    const currentColor = currentColorSpan.innerHTML.toLowerCase();

    if(currentColor === "random") {
        return currentRandomColor;
    }

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
    ctx.lineWidth = currentPenSize.value;
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

/**
 * Restore the canvas from the previous page
 * @param page the page number
 */
function restorePageData(page) {
    imageHistory = pages[page]["history"];
    currentIndex = pages[page]["index"];
    ctx.putImageData(pages[page]["imageData"], 0, 0);
}

/**
 * Save the canvas on the current page
 * @param page the page number 
 */
function savePageData(page) {
    pages[page] = {
        "history" : imageHistory,
        "index" : currentIndex,
        "imageData" : ctx.getImageData(0, 0, canvas.width, canvas.height)
    } 
}