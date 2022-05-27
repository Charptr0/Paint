const optionsBtn = document.getElementById("option-btn");
const menu = document.querySelector("nav");
const closeOptionBtn = document.getElementById("close-option-btn");

setMenuVisibility("hidden");

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



