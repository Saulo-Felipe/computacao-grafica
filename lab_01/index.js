const canvaElement = document.querySelector("#screen");
const ctx = canvaElement.getContext("2d");

ctx.fillStyle = "gray"
ctx.fillRect(0, 0, canvaElement.width, canvaElement.height);

console.log(ctx);

