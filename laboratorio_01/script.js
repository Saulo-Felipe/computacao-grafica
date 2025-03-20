
function changeFullScreen(isFullScreen) {
  const container = document.querySelector("#full-screen-container");

  if (isFullScreen) {
    container.style.position = "fixed"
    container.style.top = "0px"
    container.style.left = "0px"
    container.style.background = "rgb(0,0,0,0.8)"
    container.style.width = "100%"
    container.style.height = "100%"
  } else {
    container.style.removeProperty("position")
    container.style.removeProperty("top")
    container.style.removeProperty("left")
    container.style.removeProperty("background")
    container.style.removeProperty("width")
    container.style.removeProperty("height")
  }

}

document.querySelector("#open-full-screen").addEventListener("click", () => changeFullScreen(true))
document.querySelector("#full-screen-container").addEventListener("click", () => changeFullScreen(false))


// clear
document.querySelector("#clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})