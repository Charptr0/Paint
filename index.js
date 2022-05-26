const canvas = document.querySelector("canvas");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const ctx = canvas.getContext("2d");

// set canvas height and width
canvas.width = windowWidth * 0.8;
canvas.height = windowHeight * 0.8;

let mouseIsDown = false;

/**
 * Draw a single shape when the user click their input device
 */
canvas.addEventListener("click", (e) => {
    const pos = getMousePos(canvas, e);
    draw(pos.x, pos.y);
})

canvas.addEventListener("mousemove", (e) => {
    // only draw if the mouse is down
    if(mouseIsDown) {
        const pos = getMousePos(canvas, e);
        draw(pos.x, pos.y);
    }
})

canvas.addEventListener("mousedown", (e) => {
    mouseIsDown = true;     
    ctx.beginPath();
})

canvas.addEventListener("mouseup", (e) => {
    mouseIsDown = false; // the user has let go of the 
    ctx.beginPath();
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

function draw(posX, posY) {
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 20;
    
    ctx.lineTo(posX, posY);
    ctx.stroke();

}


