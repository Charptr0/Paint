// default colors
export const COLORS = {
    white : "#FFFFFF",
    black : "#000000",
    red : "#FF0000",
    blue : "#0000FF",
    green : "#00FF00",
    yellow : "#FFFF00",
    orange : "#FFA500",
    pink : "#FFC0CB",
    purple : "#A020F0",
    grey: "#808080",
    magenta : "#FF00FF",
}

export function generateRandomColor() {
   let hexCode = "#";

   const hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    for(let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * (hexadecimal.length - 1));
        hexCode += hexadecimal[index];
    }

    return hexCode;
}
