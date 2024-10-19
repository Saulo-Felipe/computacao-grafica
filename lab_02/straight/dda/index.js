function straightDDA() {
  const x1 = Number(document.getElementById("x-1").value);
  const y1 = Number(document.getElementById("y-1").value);
  const x2 = Number(document.getElementById("x-2").value);
  const y2 = Number(document.getElementById("y-2").value);


  let length = Math.abs(x2 - x1);

  if (Math.abs(y2 - y1) > length) {
    length = Math.abs(y2 - y1);
  }

  let Xinc = (x2 - x1) / length;
  let Yinc = (y2 - y1) / length;

  let x = x1;
  let y = y1;

  draw_pixel(Math.round(x), Math.round(y), true);

  for (let i = 0; i < length; i++) {
    x += Xinc;
    y += Yinc;
    draw_pixel(Math.round(x), Math.round(y), true);
  }
}
