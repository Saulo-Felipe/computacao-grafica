function midpoint() {
  const raio = Number(document.getElementById("radius").value);
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  // Chamar a função para desenhar a circunferência
  midpoint_circle(raio, centerXValue, centerYValue);
}

// Desenha uma circunferência usando o algoritmo do ponto médio.
function midpoint_circle(raio, centerXValue, centerYValue) {
  x = 0;
  y = raio;
  d = 1 - raio;

  // Desenha os pontos nos octantes
  drawCirclePoints(centerXValue, centerYValue, x, y);

  while (x < y) {
    if (d < 0) {
      d += 2 * x + 3;
    }
    else {
      d += 2 * (x - y) + 5;
      y -= 1;
    }
    x += 1;
    drawCirclePoints(centerXValue, centerYValue, x, y);
  }
}

// Desenha os pontos simétricos da circunferência para o ponto (x, y).
function drawCirclePoints(centerXValue, centerYValue, x, y) {

  draw_pixel(centerXValue + x, centerYValue + y)   //Octante E
  draw_pixel(centerXValue - x, centerYValue + y)  //#Octante W
  draw_pixel(centerXValue + x, centerYValue - y)  //#Octante S
  draw_pixel(centerXValue - x, centerYValue - y)  //#Octante N
  draw_pixel(centerXValue + y, centerYValue + x)  //#Octante NE
  draw_pixel(centerXValue - y, centerYValue + x)  //#Octante N
  draw_pixel(centerXValue + y, centerYValue - x)  //#Octante SE
  draw_pixel(centerXValue - y, centerYValue - x)  //#Octante SW
}