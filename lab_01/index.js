const screen_width = 720;
const screen_height = 480;

const canvaElement = document.querySelector("#screen");
const ctx = canvaElement.getContext("2d");

// Resolução de saída DC (screen)
const INTERVALO_X_DC = [0, screen_width];
const INTERVALO_Y_DC = [0, screen_height];

// Preenche o fundo do canvas com uma cor cinza
ctx.fillStyle = "#cfcfcf";
ctx.fillRect(0, 0, canvaElement.width, canvaElement.height);

function drawPixel(x, y, color = 'red') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1); // Tamanho do pixel (3x3)
  console.log(`Drawn at (x, y): (${x}, ${y})`);
}

function user_to_ndc(x, y, x_min, x_max, y_min, y_max) {
  const ndc_x = (2 * (x - x_min) / (x_max - x_min)) - 1;
  const ndc_y = (2 * (y - y_min) / (y_max - y_min)) - 1;
  return { ndc_x, ndc_y };
}

function ndc_to_dc(ndc_x, ndc_y, ndh, ndv) {
  const dcx = Math.round(((ndc_x + 1) / 2) * (ndh - 1));
  const dcy = Math.round(((1 - ndc_y) / 2) * (ndv - 1)); // invert y-axis for canvas
  return { dcx, dcy };
}

function user_to_dc(x, y, x_min, x_max, y_min, y_max, ndh, ndv) {
  const { ndc_x, ndc_y } = user_to_ndc(x, y, x_min, x_max, y_min, y_max);
  return ndc_to_dc(ndc_x, ndc_y, ndh, ndv);
}

document.querySelector("#update-cord").addEventListener("click", () => {
  const user_x = Number(document.querySelector("#x").value);
  const user_y = Number(document.querySelector("#y").value);

  // Convertendo os valores
  const { ndc_x: user_to_ndc_x, ndc_y: user_to_ndc_y } = user_to_ndc(user_x, user_y, 0, 100, 0, 100);
  const { dcx: ndc_to_dc_x, dcy: ndc_to_dc_y } = ndc_to_dc(user_to_ndc_x, user_to_ndc_y, screen_width, screen_height);
  const { dcx: user_to_dc_x, dcy: user_to_dc_y } = user_to_dc(user_x, user_y, 0, 100, 0, 100, screen_width, screen_height);

  // Atualiza o display com as coordenadas fornecidas
  document.querySelector("#display-x").textContent = user_x;
  document.querySelector("#display-y").textContent = user_y;

  document.querySelector('#inp_to_ndc').textContent = `(${user_to_ndc_x.toFixed(2)}, ${user_to_ndc_y.toFixed(2)})`;
  document.querySelector('#ndc_to_dc').textContent = `(${ndc_to_dc_x}, ${ndc_to_dc_y})`;
  document.querySelector('#inp_to_dc').textContent = `(${user_to_dc_x}, ${user_to_dc_y})`;

  drawPixel(user_to_dc_x, user_to_dc_y);
});
