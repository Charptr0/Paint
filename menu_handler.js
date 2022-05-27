const optionsBtn = document.getElementById("option-btn");
const menu = document.querySelector("nav");
const closeOptionBtn = document.getElementById("close-option-btn");
const colorSelection = document.getElementsByClassName("color");
const currentColor = document.getElementById("current-color");

setMenuVisibility("visible");

Object.keys(colorSelection).forEach((key) => {
    const id = colorSelection.item(key).id;

    document.getElementById(id).addEventListener("click", () => {
        currentColor.innerHTML = id;
        currentColor.style.color = id;
    })
})

function menuVisible() {
    return menu.style.visibility === "visible";
}

function setMenuVisibility(visibility) {
    menu.style.visibility = visibility;
}

optionsBtn.addEventListener("click", () => {
    setMenuVisibility("visible");
})

closeOptionBtn.addEventListener("click", () => {
    setMenuVisibility("hidden");
})

addEventListener("keydown", (e) => {
    if(e.key === "e") {
        menuVisible() ? setMenuVisibility("hidden") : setMenuVisibility("visible");
    }
})

export function getPenSize() {
    const penSize = document.getElementById("pen-size").value;
    
    if(penSize < 1) {
        penSize = 1;
    }

    return penSize;
}



