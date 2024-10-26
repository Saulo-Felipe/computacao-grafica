function straightMidpoint() {
  const x1 = Number(document.getElementById("x-1").value);
  const y1 = Number(document.getElementById("y-1").value);
  const x2 = Number(document.getElementById("x-2").value);
  const y2 = Number(document.getElementById("y-2").value);

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
