function straightDDA(defaultX1, defaultY1, defaultX2, defaultY2) {
  
  let x1 = Number(document.getElementById("x-1")?.value);
  let y1 = Number(document.getElementById("y-1")?.value);
  let x2 = Number(document.getElementById("x-2")?.value);
  let y2 = Number(document.getElementById("y-2")?.value);
  
  if (defaultX1 !== undefined) {
    x1 = Number(defaultX1)
    x2 = Number(defaultX2)
    y1 = Number(defaultY1)
    y2 = Number(defaultY2)
  }

  let length = Math.abs(x2 - x1);
  
  if (Math.abs(y2 - y1) > length) {
    length = Math.abs(y2 - y1);
  }

  // Verifica se o comprimento é zero, evitando divisão por zero
  if (length === 0) {
    drawPixel(Math.round(x1), Math.round(y1), true); // Desenha um único ponto
    return;
  }

  let Xinc = (x2 - x1) / length;
  let Yinc = (y2 - y1) / length;

  let x = x1;
  let y = y1;
  

  drawPixel(Math.round(x), Math.round(y), true);

  for (let i = 0; i < length; i++) {
    x += Xinc;
    y += Yinc;

    drawPixel(Math.round(x), Math.round(y), true);
  }
}
