const WIDTH = 600, HEIGHT = 600, INTERVALO_X_DC = [0, WIDTH], INTERVALO_Y_DC = [0, HEIGHT];

//Função que cria a tela
function newScreen() {
  clear();
  background(255);
  loadPixels();
  pixels = [];

  drawStraight(parseInt(WIDTH / 2), 0, -parseInt(WIDTH / 2), 0, "ponto-medio", "#ccc");
  drawStraight(0, -parseInt(HEIGHT / 2), 0, parseInt(HEIGHT / 2), "ponto-medio", "#ccc");

  updatePixels();
}

//Desenhar a figura no canvas
function drawFigure(pontos, cor = 'green') {

  var pointsConnected = [getPointsConnected(pontos[0]), getPointsConnected(pontos[1])], pointsX = [], pointsY = [],
    pontos = [];

  for (let i = 0; i < pointsConnected[0].length; i++) {
    pointsX.push(getPointsConnected(pointsConnected[0][i])[0])
    pointsY.push(getPointsConnected(pointsConnected[1][i])[0])
  }

  for (let i = 0; i < pointsX.length; i++) {
    pontos = pontos.concat(getRetaDDA(pointsX[i][0], pointsY[i][0], pointsX[i][1], pointsY[i][1]))
  }

  pontos.forEach(function (ponto, i) { drawPixel(ponto[0], ponto[1], cor); });

}

//Pegar e conectar os pontos
function getPointsConnected(list) {
  var result = []
  for (let i = 0; i < list.length; i++) {
    result.push([list[i], list[(i + 1) % list.length]])
  }
  return result

}

//Exibir reta no canvas
function drawStraight(xa, ya, xb, yb, algoritmo = "ponto-medio", cor = "green") {
  let pontos = [];

  if (algoritmo == "ponto-medio") { pontos = getRetaPontoMedio(xa, ya, xb, yb); }
  else if ("dda") { pontos = getRetaDDA(xa, ya, xb, yb); }
  else { return false; }

  pontos.forEach(function (ponto, i) { drawPixel(ponto[0], ponto[1], cor); });
}

//Desenhar pixel no canvas
function drawPixel(x, y, cor = "green") {
  [x, y] = convertToCartesian([x, y]);
  set(x, y, color(cor));
}

function translacaoOrigem(matriz, tx, ty, tz, dimension) {

  let matrizTranslacao;

  if (dimension === '2d') {
    matrizTranslacao = [[-tx], [-ty]];
  } else if (dimension === '3d') {
    matrizTranslacao = [[-tx], [-ty], [-tz]];
  }

  return sumMatrix(matrizTranslacao, matriz);
}

function translacaoParaInicio(matriz, tx, ty, tz, dimension) {
  let matrizTranslacao;

  if (dimension === '2d') {
    matrizTranslacao = [[tx], [ty]];
  } else if (dimension === '3d') {
    matrizTranslacao = [[tx], [ty], [tz]];
  }

  return sumMatrix(matrizTranslacao, matriz);
}

//Rotacionamento da matriz no eixo X
function rotacaoX(matriz, angulo, sx, sy, sz) {

  var result = []

  let tx = sx
  let ty = sy
  let tz = sz

  var ang = degreesToRadian(angulo)
  var matrizRotacao = [[1, 0, 0], [0, Math.cos(ang).toPrecision(3), -Math.sin(ang).toPrecision(3)], [0, Math.sin(ang).toPrecision(3), Math.cos(ang).toPrecision(3)]]
  result = translacaoOrigem(matriz, tx, ty, tz, '3d')
  result = multiplicationMatrix(matrizRotacao, result)
  result = translacaoParaInicio(result, tx, ty, tz, '3d')

  return result
}

//Rotacionamento da matriz no eixo Y
function rotacaoY(matriz, angulo, sx, sy, sz) {
  var result = []

  let tx = sx
  let ty = sy
  let tz = sz

  var ang = degreesToRadian(angulo)
  var matrizRotacao = [[Math.cos(ang).toPrecision(3), 0, Math.sin(ang).toPrecision(3)], [0, 1, 0], [-Math.sin(ang).toPrecision(3), 0, Math.cos(ang).toPrecision(3)]]

  result = translacaoOrigem(matriz, tx, ty, tz, '3d')
  result = multiplicationMatrix(matrizRotacao, result)
  result = translacaoParaInicio(result, tx, ty, tz, '3d')
  return result
}

//Rotacionamento da matriz no eixo Z
function rotacaoZ(matriz, angulo, sx, sy, sz) {
  var result = []

  let tx = sx
  let ty = sy
  let tz = sz

  var ang = degreesToRadian(angulo)
  var matrizRotacao = [[Math.cos(ang).toPrecision(3), -Math.sin(ang).toPrecision(3), 0], [Math.sin(ang).toPrecision(3), Math.cos(ang).toPrecision(3), 0], [0, 0, 1]]

  result = translacaoOrigem(matriz, tx, ty, tz, '3d')
  result = multiplicationMatrix(matrizRotacao, result)
  result = translacaoParaInicio(result, tx, ty, tz, '3d')

  return result
}

//Reflexão da matriz no plano XY
function reflectionXY(matriz, dimension = '3d') {
  var result = []

  if (dimension == '3d') {
    var matrizReflexaoXY = [[1, 0, 0], [0, 1, 0], [0, 0, -1]]
    result = multiplicationMatrix(matrizReflexaoXY, matriz)
  }

  return result
}

//Reflexão da matriz no plano YZ
function reflectionYZ(matriz, dimension = '3d') {
  var result = []

  if (dimension == '3d') {
    var matrizReflexaoYZ = [[-1, 0, 0], [0, 1, 0], [0, 0, 1]]
    result = multiplicationMatrix(matrizReflexaoYZ, matriz)
  }

  return result
}

//Reflexão da matriz no plano XZ
function reflectionXZ(matriz, dimension = '3d') {
  var result = []

  if (dimension == '3d') {
    var matrizReflexaoXZ = [[1, 0, 0], [0, -1, 0], [0, 0, 1]]
    result = multiplicationMatrix(matrizReflexaoXZ, matriz)
  }

  return result
}

//Reflexão da matriz em X
function reflectionX(matriz, dimension = '2d') {
  var result = []

  if (dimension == '2d') {
    var matrizReflexaoX = [[1, 0], [0, -1]]
    result = multiplicationMatrix(matrizReflexaoX, matriz)
  }

  return result
}

//Reflexão da matriz em Y
function reflectionY(matriz, dimension = '2d') {
  var result = []

  if (dimension == '2d') {
    var matrixReflexaoY = [[-1, 0], [0, 1]]
    result = multiplicationMatrix(matrixReflexaoY, matriz)
  }

  return result
}

//Reflexão da matriz em torno da reta
function reflectionStraight(matriz, m, b, dimension = '2d') {
  var result = []

  if (dimension == '2d') {
    var matrixReflexaoReta = [[(1 - pow(m, 2)) / (pow(m, 2) + 1), (2 * m) / (pow(m, 2) + 1), (-2 * b * m) / (pow(m, 2) + 1)], [(2 * m) / (pow(m, 2) + 1), (pow(m, 2) - 1) / (pow(m, 2) + 1), b - (b / (pow(m, 2) + 1)) + ((b * pow(m, 2)) / (pow(m, 2) + 1))], [0, 0, 1]]
    result = multiplicationMatrix(matrixReflexaoReta, matriz)
  }

  return result
}

function escala(matriz, sx, sy, sz = 1, dimension = '2d', x = 0, y = 0, z = 0) {
  let result = [];

  if (dimension === '2d') {
    let matrizEscala = [[sx, 0], [0, sy]];
    result = translacaoOrigem(matriz, x, y, 0, '2d');
    result = multiplicationMatrix(matrizEscala, result);
    result = translacaoParaInicio(result, x, y, 0, '2d');
  } else if (dimension === '3d') {
    let matrizEscala = [[sx, 0, 0], [0, sy, 0], [0, 0, sz]];
    result = translacaoOrigem(matriz, x, y, z, '3d');
    result = multiplicationMatrix(matrizEscala, result);
    result = translacaoParaInicio(result, x, y, z, '3d');
  }

  return result;
}

//Translação da matriz
function translacao(matriz, tx, ty, tz, dimension = '2d') {

  var result = []

  if (dimension == '2d') {
    var matrizTranslação = [[tx], [ty]]
    result = sumMatrix(matrizTranslação, matriz)
  }

  else if (dimension == '3d') {
    var matrizTranslação = [[tx], [ty], [tz]]
    result = sumMatrix(matrizTranslação, matriz)
  }

  return result
}

function cisalhamentoX(matriz, a, b, dimension = '2d', x = 0, y = 0, z = 0) {
  let result = [];

  if (dimension === '2d') {
    let matrizCisalhamentoX = [[1, a], [0, 1]];

    // result = translacaoOrigem(matriz, x, y, 0, '2d');

    result = multiplicationMatrix(matrizCisalhamentoX, matriz);

    // result = translacaoParaInicio(result, x, y, 0, '2d');
  } else if (dimension === '3d') {
    let matrizCisalhamentoX = [ [1,0,0] , [a,1 , 0] , [b,0,1]];
    // result = translacaoOrigem(matriz, x, y, z, '3d');
    result = multiplicationMatrix(matrizCisalhamentoX, matriz);
    // result = translacaoParaInicio(result, x, y, z, '3d');
  }
  if (!result || result.length === 0) {
    console.error('Matriz após cisalhamento está vazia ou inválida:', result);
  }

  return result;
}

function cisalhamentoY(matriz, a, b, dimension = '2d', x = 0, y = 0, z = 0) {
  let result = [];

  if (dimension === '2d') {
    let matrizCisalhamentoY = [[1, 0], [b, 1]];
    // result = translacaoOrigem(matriz, x, y, 0, '2d');
    result = multiplicationMatrix(matrizCisalhamentoY, matriz);
    // result = translacaoParaInicio(result, x, y, 0, '2d');
  } else if (dimension === '3d') {
    let matrizCisalhamentoY = [ [1 , a ,0] , [0 ,1,0] , [0,b,1]];
    // result = translacaoOrigem(matriz, x, y, z, '3d');
    result = multiplicationMatrix(matrizCisalhamentoY, matriz);
    // result = translacaoParaInicio(result, x, y, z, '3d');
  }

  return result;
}

function cisalhamentoZ(matriz, a, b, dimension = '3d', x = 0, y = 0, z = 0) {
  let result = [];

  if (dimension === '3d') {
    let matrizCisalhamentoZ = [[1, 0, a], [0, 1, b], [0, 0, 1]];
    result = translacaoOrigem(matriz, x, y, z, '3d');
    result = multiplicationMatrix(matrizCisalhamentoZ, result);
    result = translacaoParaInicio(result, x, y, z, '3d');
  } else {
    throw new Error("Cisalhamento no eixo Z não é válido em 2D");
  }

  return result;
}

//Sentido antihorario da matriz
function counterclockwiseRotation(matriz, angulo, dimension = '2d') {
  var result = []

  if (dimension == '2d') {
    var ang = degreesToRadian(angulo)
    var matrizRotacaoAntiHoraria = [[Math.cos(ang).toPrecision(3), -Math.sin(ang).toPrecision(3)], [Math.sin(ang).toPrecision(3), Math.cos(ang).toPrecision(3)]]
    result = multiplicationMatrix(matrizRotacaoAntiHoraria, matriz)

  }

  return result
}

//Sentido horario da matriz
function clockwiseRotation(matriz, angulo, dimension = '2d') {
  var result = []

  if (dimension == '2d') {
    var ang = degreesToRadian(angulo)
    var matrizRotacaoHoraria = [[Math.cos(ang).toPrecision(3), Math.sin(ang).toPrecision(3)], [-Math.sin(ang).toPrecision(3), Math.cos(ang).toPrecision(3)]]
    result = multiplicationMatrix(matrizRotacaoHoraria, matriz)

  }

  return result
}

//Multiplicacao das matrizes
function multiplicationMatrix(a, b) {

  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) { throw new Error('Formato invalido'); }

  let x = a.length, z = a[0].length, y = b[0].length;

  if (b.length !== z) { return null }

  let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
  let product = new Array(x);

  for (let p = 0; p < x; p++) { product[p] = productRow.slice(); }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return product;
}

//Soma das matrizes
function sumMatrix(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) { throw new Error('Formato invalido'); }

  let l1 = a.length, c1 = a[0].length, l2 = b.length, c2 = b[0].length

  var line = [], result = []

  for (let i = 0; i < l2; i++) {
    line = []
    for (let j = 0; j < c2; j++) {
      if (i == 0) { line.push(a[0][0] + b[i][j]) }
      else if (i == 1) { line.push(a[1][0] + b[i][j]) }
      else { line.push(a[2][0] + b[i][j]) }
    }
    result.push(line)
  }

  return result;
}

//Conversão graus para radianos
function degreesToRadian(angulo) {
  var result = angulo * (3.14 / 180)
  return result.toPrecision(3)
}

//Converter a tela para o cartesiano do canvas
function convertToCartesian(point) {
  let [pointScreenX, pointScreenY] = [point[0], point[1]];
  let [screenXMin, screenXMax] = INTERVALO_X_DC;
  let [screenYMin, screenYMax] = INTERVALO_Y_DC;
  let [screenWidth, screenHeight] = [screenXMax - screenXMin, screenYMax - screenYMin,];

  return [pointScreenX - parseInt(screenWidth / 2), -pointScreenY + parseInt(screenHeight / 2),];
}

//Calcular a reta
function getRetaPontoMedio(x0, y0, x1, y1) {
  [x0, y0] = [round(x0), round(y0)];
  [x1, y1] = [round(x1), round(y1)];
  let [x, y] = [x0, y0];


  let incX = x1 > x0 ? 1 : x1 < x0 ? -1 : 0;
  let incY = y1 > y0 ? 1 : y1 < y0 ? -1 : 0;


  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);

  let steep = false;


  if (dy > dx) {
    steep = true;
    [x, y] = [y, x];
    [dx, dy] = [dy, dx];
    [incX, incY] = [incY, incX];
  }


  let d = dx - (2 * dy);

  const pontos = [];

  if (steep) { pontos.push([y, x]); }
  else { pontos.push([x, y]); }

  for (let count = 1; count <= dx; ++count) {
    if (d <= 0) {
      y += incY;
      d += 2 * dx;
    }

    x += incX;
    d -= 2 * dy;

    if (steep) { pontos.push([y, x]); }
    else { pontos.push([x, y]); }
  }

  return pontos;
}

// Calcular reta
function getRetaDDA(x0, y0, xEnd, yEnd) {
  var pontos = [];

  let dx = xEnd - x0, dy = yEnd - y0, steps, k, xIncrement, yIncrement, x = x0, y = y0;

  //declive
  if (abs(dx) > abs(dy)) { steps = abs(dx); }
  else { steps = abs(dy); }

  //incremento
  xIncrement = float(dx) / float(steps);
  yIncrement = float(dy) / float(steps);

  pontos.push([x, y]);

  for (k = 0; k < steps; k++) {
    x += xIncrement;
    y += yIncrement;
    pontos.push([x, y]);
  }

  return pontos;
}
