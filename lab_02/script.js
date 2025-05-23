// events
document.getElementById("handle-plot").addEventListener("click", plot);
document.getElementById("form-type").addEventListener("change", handleChangeSelect);
document.getElementById("x-1").addEventListener("change", handleChangeX1AndX2)
document.getElementById("y-1").addEventListener("change", handleChangeX1AndX2)
document.getElementById("transformation-type").addEventListener("change", () => handleChangeSelect(true));

// global variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let systemData = {
  transformationType: null,
  sx: 0, sy: 0,
  tx: 0, ty: 0,
  radius: 0,
  shx: 0, shy: 0,
  x1: 0, y1: 0
}

const hiddenMenu = new URLSearchParams(window.location.search).get("hidden-menu");
const systemDataDefault = new URLSearchParams(window.location.search).get("systemData");

if (systemDataDefault) {
  systemData = JSON.parse(systemDataDefault)
  plot()
}

if (hiddenMenu) {
  document.querySelector("#menu").remove()
}


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
    "pixel": pixel,
    "elipse": elipse, // elipse
    "midpoint": midpoint, // Ponto médio
    "explicit-equation": explicit, // Equação explicita +18
    "trigonometric": trigonometric, // Trigonometrico
    "straight-dda": straightDDA, // reta dda
    "straight-midpoint": straightMidpoint // reta midpoint
  }[formType]();
}

function handleChangeSelect(isTransformation = false) {
  const formType = document.getElementById(
    typeof isTransformation === "boolean" ? "transformation-type" : "form-type"
  ).value;

  if (isTransformation) {
    systemData.transformationType = formType;
    console.log("alterado com success: ", systemData)
  }

  document.querySelectorAll(
    `#${typeof isTransformation === "boolean" ? "alterable2" : "alterable"} > :not(.${formType})`
  ).forEach(element => element.classList.add("hidden"));

  document.querySelectorAll(`.${formType}`)
    .forEach(element => element.classList.remove("hidden"));
}

function handleChangeX1AndX2() {
  systemData.x1 = Number(document.querySelector("#x-1").value)
  systemData.y1 = Number(document.querySelector("#y-1").value)

  console.log({ systemData })
}

function drawPixel(x, y, adjusteToCenter = false) {
  ctx.fillStyle = "#000";

  if (adjusteToCenter) {
    const canvasX = Math.round(canvasWidth / 2 + x);
    const canvasY = Math.round(canvasHeight / 2 - y);
    return ctx.fillRect(canvasX, canvasY, 1, 1);
  }

  ctx.fillRect(x, canvasHeight - y - 1, 1, 1);
}
