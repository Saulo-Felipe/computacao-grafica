function midpoint() {
  var raio = Number(document.getElementById("radius").value);
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  // Chamar a função para desenhar a circunferência
  midpoint_circle(raio, centerXValue, centerYValue);

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
}