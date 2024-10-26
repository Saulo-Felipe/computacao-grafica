function draw_ellipse_pixels(x, y, color) {
  let { centerXValue, centerYValue } = getUpdatedCenteredValues();

  drawPixel(centerXValue + x, centerYValue + y, false, color); //1º quadrante
  drawPixel(centerXValue - x, centerYValue + y, false, color); //2º quadrante
  drawPixel(centerXValue + x, centerYValue - y, false, color); //3º quadrante
  drawPixel(centerXValue - x, centerYValue - y, false, color); //4º quadrante

  if (systemData.transformationType === "translation") {
    centerXValue += Number(document.getElementById("tx").value);
    centerYValue += Number(document.getElementById("ty").value);

    drawPixel(centerXValue + x, centerYValue + y, false, "#FF0000");
    drawPixel(centerXValue - x, centerYValue + y, false, "#FF0000");
    drawPixel(centerXValue + x, centerYValue - y, false, "#FF0000");
    drawPixel(centerXValue - x, centerYValue - y, false, "#FF0000");
  }

  else if (systemData.transformationType === "rotation") {
    // Rotacionando para cada ponto individualmente
    let theta = Number(document.getElementById("transformation-radius").value) * (Math.PI / 180); // Convertendo para radianos

    // Rotaciona o ponto de cada quadrante individualmente
    let x1 = x * Math.cos(theta) - y * Math.sin(theta);
    let y1 = x * Math.sin(theta) + y * Math.cos(theta);
    let x2 = -x * Math.cos(theta) - y * Math.sin(theta);
    let y2 = -x * Math.sin(theta) + y * Math.cos(theta);
    let x3 = x * Math.cos(theta) + y * Math.sin(theta);
    let y3 = x * Math.sin(theta) - y * Math.cos(theta);
    let x4 = -x * Math.cos(theta) + y * Math.sin(theta);
    let y4 = -x * Math.sin(theta) - y * Math.cos(theta);

    // Desenha os quatro pontos rotacionados
    drawPixel(centerXValue + x1, centerYValue + y1, false, "#FF0000"); // 1º quadrante
    drawPixel(centerXValue + x2, centerYValue + y2, false, "#FF0000"); // 2º quadrante
    drawPixel(centerXValue + x3, centerYValue + y3, false, "#FF0000"); // 3º quadrante
    drawPixel(centerXValue + x4, centerYValue + y4, false, "#FF0000"); // 4º quadrante
  }
}

function midpoint_ellipse(semiAxleMax, semiAxleMin, color = "#000") {
  let x = 0;
  let y = semiAxleMin;
  const semiAxleMaxSquared = semiAxleMax * semiAxleMax; // a
  const semiAxleMinsquared = semiAxleMin * semiAxleMin; // b
  const semiAxleMaxSquared2 = semiAxleMaxSquared * 2; // a
  const semiAxleMinsquared2 = semiAxleMinsquared * 2; // b
  let d1 = semiAxleMinsquared - (semiAxleMaxSquared * semiAxleMin) + (0.25 * semiAxleMaxSquared);
  let dx = semiAxleMinsquared2 * x;
  let dy = semiAxleMaxSquared2 * y;

  // Regiao 1
  while (dx < dy) {
    draw_ellipse_pixels(x, y, color);

    if (d1 < 0) {
      x++;
      dx += semiAxleMinsquared2;
      d1 += dx + semiAxleMinsquared;
    } else {
      x++;
      y--;
      dx += semiAxleMinsquared2;
      dy -= semiAxleMaxSquared2;
      d1 += dx - dy + semiAxleMinsquared
    }
  }

  // Regiao 2
  d2 = semiAxleMinsquared * (x + 0.5) * (x + 0.5) + semiAxleMaxSquared * (y - 1) * (y - 1) - semiAxleMaxSquared * semiAxleMinsquared;

  while (y >= 0) {
    draw_ellipse_pixels(x, y, color);

    if (d2 > 0) {
      y -= 1;
      dy -= semiAxleMaxSquared2;
      d2 += semiAxleMaxSquared - dy;
    } else {
      y -= 1;
      x += 1;
      dx += semiAxleMinsquared2;
      dy -= semiAxleMaxSquared2;
      d2 += dx - dy + semiAxleMaxSquared;
    }
  }

}

function elipse() {
  let semiAxleMax = Number(document.getElementById("semi-axle-max").value);
  let semiAxleMin = Number(document.getElementById("semi-axle-min").value);

  midpoint_ellipse(semiAxleMax, semiAxleMin);

  if (systemData.transformationType === "scale") {
    semiAxleMax *= Number(document.getElementById("sx").value)
    semiAxleMin *= Number(document.getElementById("sy").value)

    midpoint_ellipse(semiAxleMax, semiAxleMin, "#FF0000");
  }
}