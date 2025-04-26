var transformacoes, valores1, valores2, valores2, buttonTransform, buttonDraw, buttonClean, transforma = false,
  permissionToDraw = false, putTrail = false, pointsX = [], pointsY = [], sx, sy, tx, ty, sentido, graus, CisalhamentoValue,
  axisCissalhamento, axisRotation;

//Configura a tela do canvas e define os botões de transformação e desenho.
function setup() {
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("#screen");
  buttonTransform = select("#transformar");
  buttonTransform.mousePressed(transform);
  buttonDraw = select("#desenhar-figura");
  buttonDraw.mousePressed(drawAuthorization);
  // buttonClean = select("#limpar");
  // buttonClean.mousePressed(cleanScreen);
  optionSelected = "vazio";
  noLoop();
}

/*
    Atualiza a tela do canvas e obtém valores dos elementos HTML.
    Aplica transformações aos pontos da figura com base nos valores fornecidos.
    Desenha a figura original e a transformada, se autorizado.
*/
function draw() {
  newScreen();
  putTrail = document.querySelector("#deixa-rastro").checked;

  // Valores padrão para um quadrado
  let defaultX = [0, 100, 100, 0];
  let defaultY = [0, 0, 100, 100];

  // Tenta pegar dos inputs, senão usa os padrões
  pointsX = getPoints("x-figura[]", defaultX);
  pointsY = getPoints("y-figura[]", defaultY);

  transformacoes = getValues("transformacoes[]");
  valores1 = getValues("valor1-transformacoes[]");
  valores2 = getValues("valor2-transformacoes[]");
  valores3 = getValues("valor3-transformacoes[]");

  var matrixPoint = [pointsX, pointsY], result = [pointsX, pointsY];

  if (transforma) {
    for (let i = 0; i < transformacoes.length; i++) {
      var t = transformacoes[i].toLowerCase();

      if (t == "escala") {
        sx = Number(valores1[i]);
        sy = Number(valores2[i]);
        result = escala(result, sx, sy, 0, "2d");
      } else if (t == "translacao") {
        tx = Number(valores1[i]);
        ty = Number(valores2[i]);
        result = translacao(result, tx, ty, 0, "2d");
      } else if (t == "rotacao") {
        graus = Number(valores1[i]);
        sentido = valores2[i];

        if (sentido == "horario") {
          result = clockwiseRotation(result, graus, "2d");
        } else if (sentido == "antihorario") {
          result = counterclockwiseRotation(result, graus, "2d");
        }
      } else if (t == "cisalhamento") {
        CisalhamentoValue = Number(valores1[i]);
        axisCissalhamento = valores2[i];

        if (axisCissalhamento == "x") {
          result = cisalhamentoX(result, CisalhamentoValue, 0, "2d");
        } else if (axisCissalhamento == "y") {
          result = cisalhamentoY(result, 0, CisalhamentoValue, "2d");
        }
      } else if (t == "reflexao") {
        axisRotation = valores1[i];
        if (axisRotation == "x") {
          result = reflectionX(result, "2d");
        } else if (axisRotation == "y") {
          result = reflectionY(result, "2d");
        } else if (axisRotation == "reta") {
          mReta = Number(valores2[i]);
          bReta = Number(valores3[i]);
          var auxComplement = Array(pointsX.length).fill(0);
          result = [result[0], result[1], auxComplement];
          drawStraight(-300, mReta * -300 + bReta, 300, mReta * 300 + bReta, "fff");

          result = reflectionStraight(result, mReta, bReta);
        }
      }
    }
  }

  if (permissionToDraw) { drawFigure([pointsX, pointsY]); }

  if (!putTrail && transforma) { newScreen(); }

  if (transforma) { drawFigure(result, "pink"); }

  background(0);
  updatePixels();
  transforma = false;
}

//Autoriza o desenho da figura quando o botão correspondente é pressionado.
function drawAuthorization() {
  permissionToDraw = true;
  draw();
}

//Ativa o modo de transformação quando o botão correspondente é pressionado.
function transform() {
  transforma = true;
  draw();
}

//Obtém os valores dos pontos da figura com base no nome do elemento HTML.
function getPoints(name, defaultValues = []) {
  var input = document.getElementsByName(name);
  var pontos = [];

  for (var i = 0; i < input.length; i++) {
    var a = input[i];
    var valor = a.value.trim();
    pontos.push(valor === "" ? NaN : Number(valor));
  }

  const todosInvalidos = pontos.length === 0 || pontos.every(isNaN);
  return todosInvalidos ? defaultValues : pontos;
}


//Obtém os valores associados a um determinado nome de elemento HTML.
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

//Remove o último campo de entrada de pontos da figura.
function removeField() {
  var line = document.querySelector("#pontos-figura");
  var elementRemove = line.lastChild;
  line.removeChild(elementRemove);
}

//Adiciona um novo par de campos de entrada para pontos da figura.
function addField() {
  var container = document.querySelector("#pontos-figura");

  var line = document.createElement("div");
  line.setAttribute("class", "flex flex-row gap-2");

  var column1 = document.createElement("div");
  column1.setAttribute("class", "col");
  var column2 = document.createElement("div");
  column2.setAttribute("class", "col");

  var newFieldX = document.createElement("input");
  newFieldX.setAttribute("name", "x-figura[]");
  newFieldX.setAttribute("class", "w-32 border border-gray-300 rounded-md px-2");
  newFieldX.setAttribute("type", "text");
  newFieldX.setAttribute("placeholder", "X do ponto");

  var newFieldY = document.createElement("input");
  newFieldY.setAttribute("name", "y-figura[]");
  newFieldY.setAttribute("class", "w-32 border border-gray-300 rounded-md px-2");
  newFieldY.setAttribute("type", "text");
  newFieldY.setAttribute("placeholder", "Y do ponto");

  column1.appendChild(newFieldX);
  column2.appendChild(newFieldY);

  line.appendChild(column1);
  line.appendChild(column2);

  container.appendChild(line);
}

//Adiciona um novo conjunto de campos de entrada para transformações.
function adicionarCampoTransformacao() {
  const container = document.querySelector("#opcoes-transformacao");

  // Cria o wrapper principal (flex-col)
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "flex flex-col gap-10 items-center");

  // Cria o input de transformação
  const transformDiv = document.createElement("div");
  const inputTransform = document.createElement("input");
  inputTransform.setAttribute("name", "transformacoes[]");
  inputTransform.setAttribute("type", "text");
  inputTransform.setAttribute("placeholder", "Transformacao");
  inputTransform.setAttribute("class", "border border-gray-300 rounded-md");
  transformDiv.appendChild(inputTransform);

  // Cria a linha com os três inputs
  const valoresDiv = document.createElement("div");
  valoresDiv.setAttribute("class", "flex flex-row gap-2");

  const input1 = document.createElement("input");
  input1.setAttribute("name", "valor1-transformacoes[]");
  input1.setAttribute("type", "text");
  input1.setAttribute("placeholder", "Valor 1");
  input1.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");

  const input2 = document.createElement("input");
  input2.setAttribute("name", "valor2-transformacoes[]");
  input2.setAttribute("type", "text");
  input2.setAttribute("placeholder", "Valor 2");
  input2.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");

  const input3 = document.createElement("input");
  input3.setAttribute("name", "valor3-transformacoes[]");
  input3.setAttribute("type", "text");
  input3.setAttribute("placeholder", "Valor 3");
  input3.setAttribute("class", "w-24 border border-gray-300 rounded-md px-2");

  valoresDiv.appendChild(input1);
  valoresDiv.appendChild(input2);
  valoresDiv.appendChild(input3);

  // Junta tudo no wrapper
  wrapper.appendChild(transformDiv);
  wrapper.appendChild(valoresDiv);

  // Adiciona ao container principal
  container.appendChild(wrapper);
}


//Remove o último conjunto de campos de entrada para transformações.
function removerCampoTransformacao() {
  var line = document.querySelector("#opcoes-transformacao");
  var elementRemove = line.lastChild;
  line.removeChild(elementRemove);
}
