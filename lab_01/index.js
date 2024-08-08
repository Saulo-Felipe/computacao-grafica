const screen_width = 720;
const screen_height = 480;

const canvaElement = document.querySelector("#screen");
const ctx = canvaElement.getContext("2d");

// resolução de saída DC (screen)
const INTERVALO_X_DC = [0, LARGURA];
const INTERVALO_Y_DC = [0, ALTURA];


// Preenche o fundo do canvas com uma cor cinza
ctx.fillStyle = "#cfcfcf";
ctx.fillRect(0, 0, canvaElement.width, canvaElement.height);

function drawPixel(x, y, color = 'red') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 3, 3); // Tamanho do pixel (5x5)
  console.log(`Drawn at (x, y): (${x}, ${y})`);
}

function user_to_ndc(x, y, x_min, x_max, y_min, y_max) {
  const ndc_x = (2 * (x - x_min) / (x_max - x_min)) - 1;
  const ndc_y = (2 * (y - y_min) / (y_max - y_min)) - 1;
  return { ndc_x, ndc_y };
}

function ndc_to_dc(ndc_x, ndc_y, ndh, ndv) {
  const dcx = Math.round(((ndc_x + 1) / 2) * (ndh - 1));
  const dcy = Math.round(((ndc_y + 1) / 2) * (ndv - 1));
  return { dcx, dcy };
}

function user_to_dc(x, y, intervalo_inp_x, intervalo_inp_y) {
  const [ndcx, ndcy] = [user_to_ndc(x, y, intervalo_inp_x, intervalo_inp_y)[0], user_to_ndc(x, y, intervalo_inp_x, intervalo_inp_y)[1]];

  return user_to_dc(ndcx, ndcy, INTERVALO_X_DC, INTERVALO_Y_DC);
}


document.querySelector("#update-cord").addEventListener("click", () => {
  const user_x = Number(document.querySelector("#x").value);
  const user_y = Number(document.querySelector("#y").value);

  // Atualiza o display com as coordenadas fornecidas
  document.querySelector("#display-x").textContent = user_x;
  document.querySelector("#display-y").textContent = user_y;

  const ndc = user_to_ndc(user_x, user_y, 0, 100, 0, 100);
  const dc = ndc_to_dc(ndc.ndc_x, ndc.ndc_y, screen_width, screen_height);
  drawPixel(dc.dcx, dc.dcy);
});
