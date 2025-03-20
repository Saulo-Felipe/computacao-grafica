// Obtendo referências aos elementos do DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// Evento para o botão "Plotar"
document.getElementById("handle-plot").addEventListener("click", plot);

// Função plot que desenha o pixel
function plot() {
    // Captura as coordenadas X e Y
    const x = Number(document.getElementById("x-1").value);
    const y = Number(document.getElementById("y-1").value);
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    // Captura os valores de X-Min, Y-Min, X-Max e Y-Max
    const xMin = Number(document.getElementById("x-min").value);
    const xMax = Number(document.getElementById("x-max").value);
    const yMin = Number(document.getElementById("y-min").value);
    const yMax = Number(document.getElementById("y-max").value);

    // Verifica se os valores são válidos
    if (!isNaN(x) && !isNaN(y) && !isNaN(xMin) && !isNaN(xMax) && !isNaN(yMin) && !isNaN(yMax)) {

        // Calcula as coordenadas NDC
        const { ndc_x, ndc_y } = user_to_ndc(x, y, xMin, xMax, yMin, yMax);
        console.log(`NDC: (${ndc_x}, ${ndc_y})`);

        // Converte de NDC para coordenadas de dispositivo (DC)
        const ndh = canvasHeight; // altura do canvas
        const ndv = canvasWidth; // largura do canvas
        const { dcx, dcy } = ndc_to_dc(ndc_x, ndc_y, ndh, ndv);
        console.log(`DC: (${dcx}, ${dcy})`);
        // Desenha o pixel no canvas
        drawPixel(dcx, dcy);

    } else {
        alert("Por favor, insira valores válidos para X, Y, X-Min, X-Max, Y-Min e Y-Max!");
    }
    console.log("canvasWidth: " + canvasWidth);
    console.log("canvasHeight: " + canvasHeight);
}

// Função para desenhar um pixel no canvas
function drawPixel(x, y, adjusteToCenter = true) {
    ctx.fillStyle = "red";

    if (adjusteToCenter) {
        const canvasX = Math.round(canvasWidth / 2 + x);
        const canvasY = Math.round(canvasHeight / 2 - y);
        return ctx.fillRect(canvasX, canvasY, 0, 0);
    }

    ctx.fillRect(x, canvasHeight - y - 1, 1, 1);
}

// Função para converter coordenadas do usuário para NDC
function user_to_ndc(x, y, x_min, x_max, y_min, y_max) {
    const ndc_x = 2 * (x - x_min) / (x_max - x_min) - 1;
    const ndc_y = 2 * (y - y_min) / (y_max - y_min) - 1;
    return { ndc_x, ndc_y };
}

// Função para converter NDC para DC
function ndc_to_dc(ndc_x, ndc_y, ndh, ndv) {
    const dcx = Math.round((ndc_x + 1) * (canvasWidth / 2));
    const dcy = Math.round((ndc_y + 1) * (canvasHeight / 2));

    return { dcx, dcy };
}

// Configuração do evento para definir a resolução do canvas
document.getElementById("btn-definir-resolucao").addEventListener("click", function () {
    // Pegando os valores digitados nos inputs
    const largura = document.getElementById("largura").value;
    const altura = document.getElementById("altura").value;
    const divContainer = canvas.parentElement; // Obtém a div que envolve o canvas

    // Verifica se os valores são válidos
    if (largura > 0 && altura > 0) {
        // Modifica o tamanho do canvas
        canvas.width = largura;
        canvas.height = altura;

        // Ajusta o tamanho visualmente (CSS)
        canvas.style.width = `${largura}px`;
        canvas.style.height = `${altura}px`;

        // Modifica também o tamanho da div que contém o canvas
        divContainer.style.width = `${largura}px`;
        divContainer.style.height = `${altura}px`;

        // Limpa o canvas ao modificar o tamanho
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        alert("Por favor, insira valores válidos para a largura e altura.");
    }
});
