const optionsBtn = document.getElementById("option-btn");
const menu = document.querySelector("nav");
const closeOptionBtn = document.getElementById("close-option-btn");
const colorSelection = document.getElementsByClassName("color");
const currentColor = document.getElementById("current-color");

setMenuVisibility("visible");

/**
 * Set a click listener on every color square and update the current color
 */
Object.keys(colorSelection).forEach((key) => {
    const id = colorSelection.item(key).id;

    document.getElementById(id).addEventListener("click", () => {
        currentColor.innerHTML = id;
        currentColor.style.color = id;
    })
})

/**
 * Return whether the menu GUI is currently opened
 * @returns true if the menu is visible, else otherwise
 */
function menuVisible() {
    return menu.style.visibility === "visible";
}

/**
 * Set the menu GUI's visibility
 * @param visibility set the attribute for the visibility
 */
function setMenuVisibility(visibility) {
    menu.style.visibility = visibility;
}

/**
 * Open the menu GUI on click
 */
optionsBtn.addEventListener("click", () => {
    setMenuVisibility("visible");
})

/**
 * Close the menu GUI on click on the X
 */
closeOptionBtn.addEventListener("click", () => {
    setMenuVisibility("hidden");
})

/**
 * Add a listener to the key e for opening and closing the menu
 */
addEventListener("keydown", (e) => {
    if(e.key === "e") {
        menuVisible() ? setMenuVisibility("hidden") : setMenuVisibility("visible");
    }
})