const canvas = document.querySelector("canvas");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const ctx = canvas.getContext("2d");

// set canvas height and width
canvas.width = windowWidth * 0.8;
canvas.height = windowHeight * 0.8;

canvas.addEventListener("click", (e) => {
    const pos = getMousePos(canvas, e);

    draw(pos.x, pos.y);
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
    ctx.fillRect(posX, posY, 10, 10);
}


