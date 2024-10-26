document.getElementById("handle-draw").addEventListener("click", draw_triangle);

function draw_triangle() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const x1 = document.getElementById("x1").value
  const x2 = document.getElementById("x2").value
  const x3 = document.getElementById("x3").value
  const x4 = document.getElementById("x4").value
  const y1 = document.getElementById("y1").value
  const y2 = document.getElementById("y2").value
  const y3 = document.getElementById("y3").value
  const y4 = document.getElementById("y4").value


  if (isInvalidTriangle(x1, y1, x2, y2, x3, y3, x4, y4)) {
    straightDDA(x1, y1, x2, y2);
    straightDDA(x2, y2, x3, y3);
    straightDDA(x3, y3, x4, y4);
    straightDDA(x4, y4, x1, y1);
  } else {
    alert("Suas cordenadas não formam um triângulo válido!")
  }
}

function isInvalidTriangle(x1, y1, x2, y2, x3, y3, x4, y4) {
    const area = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);

    return area !== 0;
}

