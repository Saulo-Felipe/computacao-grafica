function draw_ellipse_pixels(x, y) {
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  draw_pixel(centerXValue + x, centerYValue + y); //1º quadrante
  draw_pixel(centerXValue - x, centerYValue + y); //2º quadrante
  draw_pixel(centerXValue + x, centerYValue - y); //3º quadrante
  draw_pixel(centerXValue - x, centerYValue - y); //4º quadrante
}

function midpoint_ellipse(semiAxleMax, semiAxleMin) {
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
    draw_ellipse_pixels(x, y);
    
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

  while(y>= 0) {
    draw_ellipse_pixels(x, y);

    if(d2 > 0) {
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
  const semiAxleMax = Number(document.getElementById("semi-axle-max").value);
  const semiAxleMin = Number(document.getElementById("semi-axle-min").value);

  midpoint_ellipse(semiAxleMax, semiAxleMin);
}





