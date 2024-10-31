function straightMidpoint(defaultX1, defaultY1, defaultX2, defaultY2) {
  
  let x1 = Number(document.getElementById("x-1")?.value);
  let y1 = Number(document.getElementById("y-1")?.value);
  let x2 = Number(document.getElementById("x-2")?.value);
  let y2 = Number(document.getElementById("y-2")?.value);
  
  if (defaultX1) {
    x1 = Number(defaultX1)
    x2 = Number(defaultX2)
    y1 = Number(defaultY1)
    y2 = Number(defaultY2)
  }

  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let p = 2 * dy - dx;
  let twoDy = 2 * dy;
  let twoDyMinusDx = 2 * (dy - dx);

  let x, y;

  if (x1 > x2) {
    x = x2;
    y = y2;
    x2 = x1;
  } else {
    x = x1;
    y = y1;
  }

  drawPixel(x, y, true);

  while (x < x2) {
    x += 1;
    if (p < 0) {
      p += twoDy;
    } else {
      y += 1;
      p += twoDyMinusDx;
    }

    drawPixel(x, y, true);
  }
}
