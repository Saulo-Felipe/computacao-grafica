const screen_width = 720;
const screen_height = 480;

const canvaElement = document.querySelector("#screen");
const ctx = canvaElement.getContext("2d");

ctx.fillStyle = "#cfcfcf"
ctx.fillRect(0, 0, canvaElement.width, canvaElement.height);

function drawPixel(x, y, color = 'black') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 5, 5);
  console.log(`Drawn at (x, y): (${x}, ${y})`);
}

// function user_to_ndc(x, y, x_min, x_max, y_min, y_max) { // wc_to_ndc
//    const ndc_x = (x - x_min) / (x_max - x_min);
//    const ndc_y = (y - y_min) / (y_max - y_min);
   
//    return { ndc_x, ndc_y };
// }

// function ndc_to_user(ndc_x, ndc_y, x_min, x_max, y_min, y_max) {
//  const x = ndc_x * (x_max - x_min) - x_min;
//  const y = ndc_y * (y_max - y_min) - y_min;
//  return { x, y };
// }

// function ndc_to_dc(ndc_x, ndc_y, ndh, ndv) {
//  const dcx = Math.round(ndc_x * (ndh - 1));
//  const dcy = Math.round(ndc_y * (ndv - 1));
//  return { dcx, dcy };
// }
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
 
document.querySelector("#update-cord").addEventListener("click", () => {
  const user_x = Number(document.querySelector("#x").value);
  const user_y = Number(document.querySelector("#y").value);

  const ndc = user_to_ndc(user_x, user_y, 0, 100, 0, 100);
  const dc = ndc_to_dc(ndc.ndc_x, ndc.ndc_y, 720, 480);
  drawPixel(dc.dcx, dc.dcy);
});