const canvas = document.querySelector("canvas");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const ctx = canvas.getContext("2d");

// set canvas height and width
canvas.width = windowWidth * 0.8;
canvas.height = windowHeight * 0.8;

// global variables
let mouseIsDown = false;
let userStrokes = [];
const strokeHistory = [];

/**
 * Draw a single shape when the user click their input device
 */
canvas.addEventListener("click", (e) => {
    const pos = getMousePos(canvas, e);
    draw(pos);
})

canvas.addEventListener("mousemove", (e) => {
    // only draw if the mouse is down
    if(mouseIsDown) {
        const pos = getMousePos(canvas, e);
        draw(pos);
    }
})

canvas.addEventListener("mousedown", (e) => {
    mouseIsDown = true;     
    ctx.beginPath();
})

canvas.addEventListener("mouseup", (e) => {
    mouseIsDown = false; // the user has let go of the 
    ctx.beginPath();
    strokeHistory.push(userStrokes);
    userStrokes = [];
})

addEventListener("keydown", (e) => {
    undo();
})

function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();

    scaleX = canvas.width / rect.width;
    scaleY = canvas.height / rect.height;
  
    return {
      x: (e.clientX - rect.left) * scaleX,  
      y: (e.clientY - rect.top) * scaleY
    }
}

function draw(mousePosition) {
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 20;
    
    ctx.lineTo(mousePosition.x, mousePosition.y);
    ctx.stroke();

    userStrokes.push(mousePosition);
}

function undo() {
    if(strokeHistory.length === 0) {
        alert("Nothing left to undo");
        return;
    }

    const lastStroke = strokeHistory.pop();

    Object.keys(lastStroke).forEach(key => {
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.lineTo(lastStroke[key].x, lastStroke[key].y);
        ctx.stroke();
        console.log(lastStroke[key]);
    })
}


