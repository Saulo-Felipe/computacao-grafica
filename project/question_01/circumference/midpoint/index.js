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
  
  draw_pixel(centerXValue + x, centerYValue + y, false, color)   //Octante E
  draw_pixel(centerXValue - x, centerYValue + y, false, color)  //#Octante W
  draw_pixel(centerXValue + x, centerYValue - y, false, color)  //#Octante S
  draw_pixel(centerXValue - x, centerYValue - y, false, color)  //#Octante N
  draw_pixel(centerXValue + y, centerYValue + x, false, color)  //#Octante NE
  draw_pixel(centerXValue - y, centerYValue + x, false, color)  //#Octante N
  draw_pixel(centerXValue + y, centerYValue - x, false, color)  //#Octante SE
  draw_pixel(centerXValue - y, centerYValue - x, false, color)  //#Octante SW

  // draw_pixel(Math.round(centerXValue + x), Math.round(centerYValue + y), false, color)   //Octante E
  // draw_pixel(Math.round(centerXValue - x), Math.round(centerYValue + y), false, color)  //#Octante W
  // draw_pixel(Math.round(centerXValue + x), Math.round(centerYValue - y), false, color)  //#Octante S
  // draw_pixel(Math.round(centerXValue - x), Math.round(centerYValue - y), false, color)  //#Octante N
  // draw_pixel(Math.round(centerXValue + y), Math.round(centerYValue + x), false, color)  //#Octante NE
  // draw_pixel(Math.round(centerXValue - y), Math.round(centerYValue + x), false, color)  //#Octante N
  // draw_pixel(Math.round(centerXValue + y), Math.round(centerYValue - x), false, color)  //#Octante SE
  // draw_pixel(Math.round(centerXValue - y), Math.round(centerYValue - x), false, color)  //#Octante SW
}