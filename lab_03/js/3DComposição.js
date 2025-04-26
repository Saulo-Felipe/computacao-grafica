var buttonTransform, buttonDraw, buttonClean, putTrail = false, pointsX = [], pointsY = [], pontosZ = [],
  transformacoes, valores1, valores2, valores3, permissionToDraw = false, transforma = false, tx, ty, tz, rotationX, rotationY,
  rotationZ, rotationPlan, axisCissalhamento, cisalhamentoValue, valorCisalhamento2, graus, sentido, angleX, angleY,
  angleZ, x, y, z, l, c, a;

//Configura o canvas e associa botões e eventos a funções específicas.
function setup() {
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("#screen");

  buttonTransform = select("#transformar");
  buttonTransform.mousePressed(transform);

  buttonDraw = select("#desenhar-figura");
  buttonDraw.mousePressed(drawAuthorization);

  optionSelected = "vazio";
  setValorSliders('#slider-eixo-x', 10)
  setValorSliders('#slider-eixo-y', 10)
  setValorSliders('#slider-eixo-z', 3)
  
}

/*
    Responsável por renderizar os gráficos.
    Obtém valores dos controles na página e atualiza arrays de pontos.
    Aplica rotações e transformações 3D aos pontos.
    Desenha linhas no canvas com base nos pontos transformados.
    Atualiza a visualização.
*/
function draw() {
  x = Number(document.getElementsByName('x-figura')[0].value)
  y = Number(document.getElementsByName('y-figura')[0].value)
  z = Number(document.getElementsByName('z-figura')[0].value)
  l = Number(document.getElementsByName('largura')[0].value)
  c = Number(document.getElementsByName('comprimento')[0].value)
  a = Number(document.getElementsByName('altura')[0].value)
  putTrail = document.querySelector("#deixa-rastro").checked;

  // Valores padrão para um cubo
  x = 0;
  y = 0;
  z = 0;
  l = 100;
  c = 100;
  a = 100;

  pointsX = [x, x + c, x + c, x, x, x + c, x + c, x];
  pointsY = [y, y, y + l, y + l, y, y, y + l, y + l];
  pontosZ = [z, z, z, z, z + a, z + a, z + a, z + a];

  angleX = Number(document.querySelector('#slider-eixo-x').value)
  angleY = Number(document.querySelector('#slider-eixo-y').value)
  angleZ = Number(document.querySelector('#slider-eixo-z').value)


  var matrixPoint = [pointsX, pointsY, pontosZ], result = [pointsX, pointsY, pontosZ];
  transformacoes = getValues("transformacoes[]");
  valores1 = getValues("valor1-transformacoes[]");
  valores2 = getValues("valor2-transformacoes[]");
  valores3 = getValues("valor3-transformacoes[]");

  rotationX = getXRotationMatrix(angleX);
  rotationY = getYRotationMatrix(angleY);
  rotationZ = getZRotationMatrix(angleZ);
  // console.log("Z value:", document.querySelector('#slider-eixo-z').value);
  newScreen3d();

  if (transforma) {
    for (let i = 0; i < transformacoes.length; i++) {
      var t = transformacoes[i].toLowerCase();

      if (t == "escala") {
        sx = Number(valores1[i]);
        sy = Number(valores2[i]);
        sz = Number(valores3[i]);
        result = escala(result, sx, sy, sz, "3d", x, y, z);
      }

      else if (t == "translacao") {
        tx = Number(valores1[i]);
        ty = Number(valores2[i]);
        tz = Number(valores3[i]);
        result = translacao(result, tx, ty, tz, "3d");
      }

      else if (t == "rotacao") {
        sx = Number(valores1[i]);
        sy = Number(valores2[i]);
        sz = Number(valores3[i]);
        graus = Number(valores1[i]);
        sentido = valores2[i];

        if (sentido == "x") {
          result = rotacaoX(result, graus, x, y, z)
        } else if (sentido == "y") {
          result = rotacaoY(result, graus, x, y, z)
        }
        else if (sentido == "z") {
          result = rotacaoZ(result, graus, x, y, z)
        }
      }

      else if (t == "cisalhamento") {
        cisalhamentoValue = Number(valores1[i]);
        valorCisalhamento2 = Number(valores2[i]);
        axisCissalhamento = valores3[i];

        if (axisCissalhamento == "x") {result = cisalhamentoX(result, cisalhamentoValue, valorCisalhamento2, "3d",x, y, z);}
        else if (axisCissalhamento == "y") {result = cisalhamentoY(result, cisalhamentoValue, valorCisalhamento2, "3d", x, y, z);}
        else if (axisCissalhamento == "z") {result = cisalhamentoZ(result, cisalhamentoValue, valorCisalhamento2, "3d", x, y, z);}
      }

      else if (t == "reflexao") {
        rotationPlan = valores1[i];
        if (rotationPlan == "xy") {result = reflectionXY(result, "3d");}
        else if (rotationPlan == "yz") {result = reflectionYZ(result, "3d");}
        else if (rotationPlan == "xz") {result = reflectionXZ(result, "3d");}
      }
    }
  }

  if (permissionToDraw) {drawSquareOnScreen(matrixPoint);}
  if (!putTrail && transforma) {newScreen3d()}
  if (transforma) {drawSquareOnScreen(result, 'pink');}

  updatePixels();
}

//Define valores para controles deslizantes.
function setValorSliders(name, valor) {document.querySelector(name).value = valor}

///Autoriza a transformação.
function transform() {
  transforma = true;
  draw();
}

//Autoriza o desenho da figura quando o botão correspondente é pressionado.
function drawAuthorization() {
  permissionToDraw = true;
  draw();
}

//Desenha a figura no canvas.
function drawSquareOnScreen(figure, cor = "orange") {
  var squareTranslatedProjection = getSquareProjection(figure,rotationX,rotationY,rotationZ);

  formSquare(squareTranslatedProjection, cor);
}

//Projeta os pontos da figura em um plano 2D.
function getSquareProjection(figure) {
  let projectedFigure;
  const projection = [[1, 0, 0],[0, 1, 0],[0, 0, 1],];

  let rotated = matrixMultiplication(rotationY, figure);

  rotated = matrixMultiplication(rotationX, rotated);

  rotated = matrixMultiplication(rotationZ, rotated);

  let projected2d = matrixMultiplication(projection, rotated);

  projectedFigure = projected2d;
  return projectedFigure;

}


//Desenha as retas da figura a partir da função drawStraight
function formSquare(projectedFigure, cor = "#orange") {
  drawStraight(projectedFigure[0][0], projectedFigure[1][0],projectedFigure[0][1],projectedFigure[1][1],"dda",cor);
  drawStraight(projectedFigure[0][1],projectedFigure[1][1],projectedFigure[0][2],projectedFigure[1][2],"dda",cor);
  drawStraight(projectedFigure[0][2],projectedFigure[1][2],projectedFigure[0][3],projectedFigure[1][3],"dda",cor);
  drawStraight(projectedFigure[0][3],projectedFigure[1][3],projectedFigure[0][0],projectedFigure[1][0],"dda",cor);
  drawStraight(projectedFigure[0][0],projectedFigure[1][0],projectedFigure[0][3],projectedFigure[1][3],"dda",cor);
  drawStraight(projectedFigure[0][3],projectedFigure[1][3],projectedFigure[0][7],projectedFigure[1][7],"dda",cor);
  drawStraight(projectedFigure[0][7],projectedFigure[1][7],projectedFigure[0][4],projectedFigure[1][4],"dda",cor);
  drawStraight(projectedFigure[0][4],projectedFigure[1][4],projectedFigure[0][0],projectedFigure[1][0],"dda",cor);
  drawStraight(projectedFigure[0][0],projectedFigure[1][0],projectedFigure[0][4],projectedFigure[1][4],"dda",cor);
  drawStraight(projectedFigure[0][4],projectedFigure[1][4],projectedFigure[0][5],projectedFigure[1][5],"dda",cor);
  drawStraight(projectedFigure[0][5],projectedFigure[1][5],projectedFigure[0][1],projectedFigure[1][1],"dda",cor);
  drawStraight(projectedFigure[0][1],projectedFigure[1][1],projectedFigure[0][0],projectedFigure[1][0],"dda",cor);
  drawStraight(projectedFigure[0][1],projectedFigure[1][1],projectedFigure[0][2],projectedFigure[1][2],"dda",cor);
  drawStraight(projectedFigure[0][2],projectedFigure[1][2],projectedFigure[0][6],projectedFigure[1][6],"dda",cor);
  drawStraight(projectedFigure[0][6],projectedFigure[1][6],projectedFigure[0][5],projectedFigure[1][5],"dda",cor);
  drawStraight(projectedFigure[0][5],projectedFigure[1][5],projectedFigure[0][1],projectedFigure[1][1],"dda",cor);
  drawStraight(projectedFigure[0][4],projectedFigure[1][4],projectedFigure[0][5],projectedFigure[1][5],"dda",cor);
  drawStraight(projectedFigure[0][5],projectedFigure[1][5],projectedFigure[0][6],projectedFigure[1][6],"dda",cor);
  drawStraight(projectedFigure[0][6],projectedFigure[1][6],projectedFigure[0][7],projectedFigure[1][7],"dda",cor);
  drawStraight(projectedFigure[0][7],projectedFigure[1][7],projectedFigure[0][4],projectedFigure[1][4],"dda",cor);
  drawStraight(projectedFigure[0][2],projectedFigure[1][2],projectedFigure[0][3],projectedFigure[1][3],"dda",cor);
  drawStraight(projectedFigure[0][3],projectedFigure[1][3],projectedFigure[0][7],projectedFigure[1][7],"dda",cor);
  drawStraight(projectedFigure[0][7],projectedFigure[1][7],projectedFigure[0][6],projectedFigure[1][6],"dda",cor);
  drawStraight(projectedFigure[0][6],projectedFigure[1][6],projectedFigure[0][2],projectedFigure[1][2],"dda",cor);
}

//Gera a janela 3D
function newScreen3d() {
  clear();

  const projection = [[1, 0, 0],[0, 1, 0],[0, 0, 1],];

  background(0);
  var lineAxis = [];
  lineAxis[0] = createVector(-WIDTH / 2, 0, 0);
  lineAxis[1] = createVector(WIDTH / 2, 0, 0);
  lineAxis[2] = createVector(0, -WIDTH / 2, 0);
  lineAxis[3] = createVector(0, WIDTH / 2, 0);
  lineAxis[4] = createVector(0, 0, -WIDTH / 2);
  lineAxis[5] = createVector(0, 0, WIDTH / 2);

  loadPixels();
  pixels = [];

  let lineProjected = [];
  for (let i = 0; i < lineAxis.length; i++) {
    let rotated = matrixMultiplication(rotationY, lineAxis[i]);
    rotated = matrixMultiplication(rotationX, rotated);
    rotated = matrixMultiplication(rotationZ, rotated);
    let projected2d = matrixMultiplication(projection, rotated);
    lineProjected[i] = projected2d;
  }

  connectLine(0, 1, lineProjected, "green");
  connectLine(2, 3, lineProjected, "blue");
  connectLine(5, 4, lineProjected, "red");

  updatePixels();
}

//conecta as linhas
function connectLine(i, j, points, cor) {
  const a = points[i];
  const b = points[j];
  strokeWeight(1);
  stroke(cor);
  drawStraight(a.x, a.y, b.x, b.y, "ponto-medio", cor);
}

//Convertem entre vetores e matrizes e exibem matrizes.
function vecToMatrix(v) {
  let vector = [];
  for (let i = 0; i < 3; i++) {vector[i] = [];}
  vector[0][0] = v.x;
  vector[1][0] = v.y;
  vector[2][0] = v.z;

  return vector;
}

//Matriz para vetor
function matrixToVector(matrix) {
  return createVector(matrix[0][0], matrix[1][0], matrix.length > 2 ? matrix[2][0] : 0);
}

//Multiplicação matriz por vector
function matrixMultiplicationToVector(a, vec) {
  let matrix = vecToMatrix(vec);
  let r = matrixMultiplication(a, matrix);
  return matrixToVector(r);
}

//Multiplicação de matriz
function matrixMultiplication(a, b) {
  if (b instanceof p5.Vector) {return matrixMultiplicationToVector(a, b);}

  let colsA = a[0].length;
  let rowsA = a.length;
  let colsB = b[0].length;
  let rowsB = b.length;

  if (colsA !== rowsB) {
    console.error("Columns of A must match rows of B");
    return null;
  }

  result = [];
  for (let j = 0; j < rowsA; j++) {
    result[j] = [];
    for (let i = 0; i < colsB; i++) {
      let sum = 0;
      for (let n = 0; n < colsA; n++) {
        sum += a[j][n] * b[n][i];
      }
      result[j][i] = sum;
    }
  }

  return result;
}

//Retorna uma matriz de rotação em torno do eixo X dado um ângulo.
function getXRotationMatrix(angle) {
  return (rotationX = [[1, 0, 0],[0, cos(angle), -sin(angle)],[0, sin(angle), cos(angle)],]);
}

//Retorna uma matriz de rotação em torno do eixo Y dado um ângulo.
function getYRotationMatrix(angle) {
  return (rotationY = [[cos(angle), 0, sin(angle)],[0, 1, 0],[-sin(angle), 0, cos(angle)],]);
}

//Retorna uma matriz de rotação em torno do eixo Z dado um ângulo.
function getZRotationMatrix(angle) {
  return (rotationZ = [[cos(angle), -sin(angle), 0],[sin(angle), cos(angle), 0],[0, 0, 1],]);
}

//Obtém os valores numéricos dos elementos de entrada HTML com um determinado nome.
function getPoints(name) {
  var input = document.getElementsByName(name);
  var pontos = [];

  for (var i = 0; i < input.length; i++) {
    var a = input[i];
    var k = Number(a.value);
    pontos.push(k);
  }

  return pontos;
}

//Obtém os valores dos elementos de entrada HTML com um determinado nome.
function getValues(name) {
  var input = document.getElementsByName(name);
  var pontos = [];

  for (var i = 0; i < input.length; i++) {
    var a = input[i];
    var k = a.value;
    pontos.push(k);
  }

  return pontos;
}

//Remove o último filho de um elemento HTML com o ID "pontos-figura".
function remove3dField() {
  var line = document.querySelector("#pontos-figura");
  var elementRemove = line.lastChild;
  line.removeChild(elementRemove);
}

//Adiciona campos de entrada para coordenadas X, Y e Z a um elemento HTML com o ID "pontos-figura".
function add3DField() {
  var container = document.querySelector("#pontos-figura");

  var line = document.createElement("div");
  line.setAttribute("class", "row");

  var column1 = document.createElement("div");
  column1.setAttribute("class", "col");
  var column2 = document.createElement("div");
  column2.setAttribute("class", "col");
  var column3 = document.createElement("div");
  column3.setAttribute("class", "col");

  var newFieldX = document.createElement("input");
  newFieldX.setAttribute("name", "x-figura[]");
  newFieldX.setAttribute("class", "form-control");
  newFieldX.setAttribute("type", "text");
  newFieldX.setAttribute("placeholder", "X do ponto");

  var newFieldY = document.createElement("input");
  newFieldY.setAttribute("name", "y-figura[]");
  newFieldY.setAttribute("class", "form-control");
  newFieldY.setAttribute("type", "text");
  newFieldY.setAttribute("placeholder", "Y do ponto");

  var novoCampoZ = document.createElement("input");
  novoCampoZ.setAttribute("name", "z-figura[]");
  novoCampoZ.setAttribute("class", "form-control");
  novoCampoZ.setAttribute("type", "text");
  novoCampoZ.setAttribute("placeholder", "Z do ponto");

  column1.appendChild(newFieldX);
  column2.appendChild(newFieldY);
  column3.appendChild(novoCampoZ);

  line.appendChild(column1);
  line.appendChild(column2);
  line.appendChild(column3);

  container.appendChild(line);
}

//Remove o último filho de um elemento HTML com o ID "opcoes-transformacao".
function removerCampoTransformacao() {
  var line = document.querySelector("#opcoes-transformacao");
  var elementRemove = line.lastChild;
  line.removeChild(elementRemove);
}

//Adiciona campos de entrada para transformação e seus valores a um elemento HTML com o ID "opcoes-transformacao".
function adicionarCampoTransformacao() {
  var container = document.querySelector("#opcoes-transformacao");

  var line = document.createElement("div");
  line.setAttribute("class", "flex flex-col gap-10 items-center");

  var column1 = document.createElement("div");
  column1.setAttribute("class", "col");
  var column2 = document.createElement("div");
  column2.setAttribute("class", "col");
  var column3 = document.createElement("div");
  column3.setAttribute("class", "col");
  var column4 = document.createElement("div");
  column4.setAttribute("class", "col");

  var newFieldTransform = document.createElement("input");
  newFieldTransform.setAttribute("name", "transformacoes[]");
  newFieldTransform.setAttribute("class", "border border-gray-300 rounded-md");
  newFieldTransform.setAttribute("type", "text");
  newFieldTransform.setAttribute("placeholder", "Transformacao");

  // Cria a linha com os três inputs
  const valoresDiv = document.createElement("div");
  valoresDiv.setAttribute("class", "flex flex-row gap-2");

  var newField1 = document.createElement("input");
  newField1.setAttribute("name", "valor1-transformacoes[]");
  newField1.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");
  newField1.setAttribute("type", "text");
  newField1.setAttribute("placeholder", "Valor 1");

  var newField2 = document.createElement("input");
  newField2.setAttribute("name", "valor2-transformacoes[]");
  newField2.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");
  newField2.setAttribute("type", "text");
  newField2.setAttribute("placeholder", "Valor 2");

  var newField3 = document.createElement("input");
  newField3.setAttribute("name", "valor3-transformacoes[]");
  newField3.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");
  newField3.setAttribute("type", "text");
  newField3.setAttribute("placeholder", "Valor 3");

  valoresDiv.appendChild(newField1);
  valoresDiv.appendChild(newField2);
  valoresDiv.appendChild(newField3);

  column1.appendChild(newFieldTransform);
  column2.appendChild(valoresDiv);

  line.appendChild(column1);
  line.appendChild(column2);

  container.appendChild(line);
}
