function draw_ellipse_pixels(x, y, color) {
  let { centerXValue, centerYValue } = getUpdatedCenteredValues();

  draw_pixel(centerXValue + x, centerYValue + y, false, color); //1º quadrante
  draw_pixel(centerXValue - x, centerYValue + y, false, color); //2º quadrante
  draw_pixel(centerXValue + x, centerYValue - y, false, color); //3º quadrante
  draw_pixel(centerXValue - x, centerYValue - y, false, color); //4º quadrante

  if (systemData.transformationType === "translation") {
    centerXValue += Number(document.getElementById("tx").value);
    centerYValue += Number(document.getElementById("ty").value);

    draw_pixel(centerXValue + x, centerYValue + y, false, "#FF0000");
    draw_pixel(centerXValue - x, centerYValue + y, false, "#FF0000");
    draw_pixel(centerXValue + x, centerYValue - y, false, "#FF0000");
    draw_pixel(centerXValue - x, centerYValue - y, false, "#FF0000");
  }
}

function midpoint_ellipse(semiAxleMax, semiAxleMin, color="#000") {
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
