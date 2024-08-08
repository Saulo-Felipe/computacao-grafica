const screen_width = 720;
const screen_height = 480;

const canvasElement = document.querySelector("#screen");
const ctx = canvasElement.getContext("2d");

// Resolução de saída DC (screen)
const INTERVALO_X_DC = [0, screen_width];
const INTERVALO_Y_DC = [0, screen_height];

// Preenche o fundo do canvas com uma cor cinza
ctx.fillStyle = "#cfcfcf";
ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

function drawPixel(x, y, color = 'red') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1); // Tamanho do pixel (3x3)
    console.log(`Drawn at (x, y): (${x}, ${y})`);
}

// INP para NDC (Intervalo [0, 1])
function inp_to_ndc(x, y, x_min, x_max, y_min, y_max) {
    const ndc_x = (x - x_min) / (x_max - x_min);
    const ndc_y = (y - y_min) / (y_max - y_min);
    return { ndc_x, ndc_y };
}

// NDC para INP (Intervalo [0, 1])
function ndc_to_inp(ndc_x, ndc_y, x_min, x_max, y_min, y_max) {
    const x = ndc_x * (x_max - x_min) + x_min;
    const y = ndc_y * (y_max - y_min) + y_min;
    return { x, y };
}

// INP para NDC (Intervalo [-1, 1])
function inp_to_ndc_centered(x, y, x_min, x_max, y_min, y_max) {
    const ndc_x = (2 * (x - x_min) / (x_max - x_min)) - 1;
    const ndc_y = (2 * (y - y_min) / (y_max - y_min)) - 1;
    return { ndc_x, ndc_y };
}

// NDC para INP (Intervalo [-1, 1])
function ndc_to_inp_centered(ndc_x, ndc_y, x_min, x_max, y_min, y_max) {
    const x = ((ndc_x + 1) / 2) * (x_max - x_min) + x_min;
    const y = ((ndc_y + 1) / 2) * (y_max - y_min) + y_min;
    return { x, y };
}

// NDC para DC
function ndc_to_dc(ndc_x, ndc_y, dc_width, dc_height) {
    const dcx = Math.round(ndc_x * (dc_width - 1));
    const dcy = Math.round((1 - ndc_y) * (dc_height - 1)); // invert y-axis for canvas
    return { dcx, dcy };
}

// DC para NDC
function dc_to_ndc(dcx, dcy, dc_width, dc_height) {
    const ndc_x = dcx / (dc_width - 1);
    const ndc_y = 1 - dcy / (dc_height - 1); // invert y-axis for canvas
    return { ndc_x, ndc_y };
}

// Manipulação dos inputs
document.querySelector("#update-cord").addEventListener("click", () => {
    const x = parseFloat(document.querySelector("#x").value);
    const y = parseFloat(document.querySelector("#y").value);
    
    // Defina os intervalos do sistema de entrada (INP)
    const INTERVALO_X_INP = [0, 100];
    const INTERVALO_Y_INP = [0, 100];

    // Coordenadas NDC normalizadas [0, 1]
    const { ndc_x, ndc_y } = inp_to_ndc(x, y, ...INTERVALO_X_INP, ...INTERVALO_Y_INP);
    document.querySelector("#inp_to_ndc").innerHTML = `NDC (Normalizada): X = ${ndc_x.toFixed(2)}, Y = ${ndc_y.toFixed(2)}`;

    // Coordenadas DC do dispositivo (tela)
    const { dcx, dcy } = ndc_to_dc(ndc_x, ndc_y, ...INTERVALO_X_DC, ...INTERVALO_Y_DC);
    document.querySelector("#ndc_to_dc").innerHTML = `DC (Dispositivo): X = ${dcx}, Y = ${dcy}`;

    // Desenha o pixel na tela
    // drawPixel(dcx, dcy);
    drawPixel(x, y);
    
    // Coordenadas INP diretamente para DC
    const { dcx: dcx_inp, dcy: dcy_inp } = inp_to_dc(x, y, ...INTERVALO_X_INP, ...INTERVALO_Y_INP, ...INTERVALO_X_DC, ...INTERVALO_Y_DC);
    document.querySelector("#inp_to_dc").innerHTML = `DC (Dispositivo) direto: X = ${dcx_inp}, Y = ${dcy_inp}`;
    
    document.querySelector("#display-x").innerHTML = x;
    document.querySelector("#display-y").innerHTML = y;
});

// INP para DC diretamente
function inp_to_dc(x, y, x_min_inp, x_max_inp, y_min_inp, y_max_inp, x_min_dc, x_max_dc, y_min_dc, y_max_dc) {
    const { ndc_x, ndc_y } = inp_to_ndc(x, y, x_min_inp, x_max_inp, y_min_inp, y_max_inp);
    return ndc_to_dc(ndc_x, ndc_y, x_max_dc - x_min_dc, y_max_dc - y_min_dc);
}
