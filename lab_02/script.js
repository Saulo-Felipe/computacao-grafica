// events
document.getElementById("handle-plot").addEventListener("click", plot);
document.getElementById("form-type").addEventListener("change", handleChangeFormType)

// global variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

function getUpdatedCenteredValues() {
  return {
    centerXValue: canvasWidth / 2 + Number(document.getElementById("center-x").value),
    centerYValue: canvasHeight / 2 + Number(document.getElementById("center-y").value)
  }
}

function plot() {
  const formType = document.getElementById("form-type").value;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  const data = {
    "elipse": elipse, // elipse
    "midpoint": midpoint, // Ponto médio
    "explicit-equation": () => "Equação", // Equação explicita +18
    "trigonometric": trigonometric, // Trigonometrico
    "straight-dda": straightDDA, // reta dda
    "straight-midpoint": straightMidpoint // reta midpoint
  }[formType]();
}

function handleChangeFormType() {
  const formType = document.getElementById("form-type").value;

  document.querySelectorAll(`#alterable > :not(.${formType})`).forEach(element => {
    element.classList.add("hidden");
  });
  document.querySelectorAll(`.${formType}`).forEach(element => {
    element.classList.remove("hidden");
  });
}

function draw_pixel(x, y, adjusteToCenter=false) {
  ctx.fillStyle = "#000";

  if (adjusteToCenter) {
    const canvasX = Math.round(canvasWidth / 2 + x);
    const canvasY = Math.round(canvasHeight / 2 - y);
    return ctx.fillRect(canvasX, canvasY, 1, 1);
  }

  ctx.fillRect(x, canvasHeight - y - 1, 1, 1);
}
