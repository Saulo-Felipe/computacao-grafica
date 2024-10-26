function midpoint() {
  var raio = Number(document.getElementById("radius").value);
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  // Chamar a função para desenhar a circunferência
  midpoint_circle(raio, centerXValue, centerYValue);

  if (systemData.transformationType === "scale") {
    raio *= Number(document.getElementById("sx").value)

    midpoint_circle(raio, centerXValue, centerYValue, "#FF0000");
  }
}

// Desenha uma circunferência usando o algoritmo do ponto médio.
function midpoint_circle(raio, centerXValue, centerYValue, color="#000") {
  x = 0;
  y = raio;
  d = 1 - raio;

  // Desenha os pontos nos octantes
  drawCirclePoints(centerXValue, centerYValue, x, y, color);

  while (x < y) {
    if (d < 0) {
      d += 2 * x + 3;
    }
    else {
      d += 2 * (x - y) + 5;
      y -= 1;
    }
    x += 1;
    drawCirclePoints(centerXValue, centerYValue, x, y, color);
  }
}

// Desenha os pontos simétricos da circunferência para o ponto (x, y).
function drawCirclePoints(centerXValue, centerYValue, x, y, color) {
  drawPixel(centerXValue + x, centerYValue + y, false, color)   //Octante E
  drawPixel(centerXValue - x, centerYValue + y, false, color)  //#Octante W
  drawPixel(centerXValue + x, centerYValue - y, false, color)  //#Octante S
  drawPixel(centerXValue - x, centerYValue - y, false, color)  //#Octante N
  drawPixel(centerXValue + y, centerYValue + x, false, color)  //#Octante NE
  drawPixel(centerXValue - y, centerYValue + x, false, color)  //#Octante N
  drawPixel(centerXValue + y, centerYValue - x, false, color)  //#Octante SE
  drawPixel(centerXValue - y, centerYValue - x, false, color)  //#Octante SW

  if (systemData.transformationType === "translation") {
    centerXValue += Number(document.getElementById("tx").value);
    centerYValue += Number(document.getElementById("ty").value);

    drawPixel(centerXValue + x, centerYValue + y, false, "#FF0000")  //Octante E  tranlation
    drawPixel(centerXValue - x, centerYValue + y, false, "#FF0000")  //#Octante W tranlation
    drawPixel(centerXValue + x, centerYValue - y, false, "#FF0000")  //#Octante S tranlation
    drawPixel(centerXValue - x, centerYValue - y, false, "#FF0000")  //#Octante N tranlation
    drawPixel(centerXValue + y, centerYValue + x, false, "#FF0000")  //#Octante NE tranlation
    drawPixel(centerXValue - y, centerYValue + x, false, "#FF0000")  //#Octante N tranlation
    drawPixel(centerXValue + y, centerYValue - x, false, "#FF0000")  //#Octante SE tranlation
    drawPixel(centerXValue - y, centerYValue - x, false, "#FF0000")  //#Octante SW tranlation
  }
}