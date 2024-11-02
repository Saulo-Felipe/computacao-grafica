document.getElementById("handle-draw").addEventListener("click", rectangle);

let isDrawn = false

function rectangle() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  let x1 = Number(document.getElementById("x1").value);
  let x2 = Number(document.getElementById("x2").value);
  let x3 = Number(document.getElementById("x3").value);
  let x4 = Number(document.getElementById("x4").value);
  let y1 = Number(document.getElementById("y1").value);
  let y2 = Number(document.getElementById("y2").value);
  let y3 = Number(document.getElementById("y3").value);
  let y4 = Number(document.getElementById("y4").value);
  // x1 = 0, y1 = 0;
  // x2 = 0, y2 = 100;
  // x3 = 100, y3 = 100;
  // x4 = 100, y4 = 0;
  // console.log("(" +x1+ ", " +y1+ ") (" +x2+ ", " +y2+ ") (" +x3+ ", " +y3+ ") (" +x4+ ", " +y4+ ")");

  if (!isDrawn) {
    draw_rectangle(x1, x2, x3, x4, y1, y2, y3, y4);
    isDrawn = true
  }

  let centerX = x1; 
  let centerY = y1; 

  if (systemData.transformationType === "translation") {

    let tx = Number(document.getElementById("tx").value);
    let ty = Number(document.getElementById("ty").value);

    x1 += tx; y1 += ty;
    x2 += tx; y2 += ty;
    x3 += tx; y3 += ty;
    x4 += tx; y4 += ty;

    draw_rectangle_transformed(x1, x2, x3, x4, y1, y2, y3, y4);
  }

  else if (systemData.transformationType === "rotation") {
    let theta = -Number(document.getElementById("transformation-radius").value) * (Math.PI / 180);

    // Rotaciona cada ponto do retângulo
    let [x1New, y1New] = [x1, y1]; 
    let [x2New, y2New] = rotatePoint(x2, y2, centerX, centerY, theta);
    let [x3New, y3New] = rotatePoint(x3, y3, centerX, centerY, theta);
    let [x4New, y4New] = rotatePoint(x4, y4, centerX, centerY, theta);

    draw_rectangle_transformed(x1New, x2New, x3New, x4New, y1New, y2New, y3New, y4New);
  }
  else if (systemData.transformationType === "rotation-anti") {
    let theta = Number(document.getElementById("transformation-radius").value) * (Math.PI / 180);

    // Rotaciona cada ponto do retângulo
    let [x1New, y1New] = [x1, y1]; 
    let [x2New, y2New] = rotatePoint(x2, y2, centerX, centerY, theta);
    let [x3New, y3New] = rotatePoint(x3, y3, centerX, centerY, theta);
    let [x4New, y4New] = rotatePoint(x4, y4, centerX, centerY, theta);

    draw_rectangle_transformed(x1New, x2New, x3New, x4New, y1New, y2New, y3New, y4New);
  }

  else if (systemData.transformationType === "scale") {

    let sx = Number(document.getElementById("sx").value);
    let sy = Number(document.getElementById("sy").value);

    if(sx != 0) {
      x1 *= sx; x2 *= sx; x3 *= sx; x4 *= sx; 
    }
    if(sy != 0) {
      y1 *= sy; y2 *= sy; y3 *= sy; y4 *= sy;
    }
    draw_rectangle_transformed(x1, x2, x3, x4, y1, y2, y3, y4);
  }

  else if (systemData.transformationType === "shear") {

    let sh = Number(document.getElementById("sh").value);
    let sv = Number(document.getElementById("sv").value);

    let newX1 = x1 + sh * y1; let newY1 = y1 + sv * x1;
    let newX2 = x2 + sh * y2; let newY2 = y2 + sv * x2;
    let newX3 = x3 + sh * y3; let newY3 = y3 + sv * x3;
    let newX4 = x4 + sh * y4; let newY4 = y4 + sv * x4;

    x1 = newX1; y1 = newY1;
    x2 = newX2; y2 = newY2;
    x3 = newX3; y3 = newY3;
    x4 = newX4; y4 = newY4;

    draw_rectangle_transformed(x1, x2, x3, x4, y1, y2, y3, y4);
  }

  else if (systemData.transformationType === "reflection") {

    const selectedRadio = document.querySelector('input[name="eixo"]:checked');
    const selectedValue = selectedRadio.id;
    console.log(selectedValue);

    if(selectedValue == "eixo-x") {
      draw_rectangle_transformed(x1, x2, x3, x4, -y1, -y2, -y3, -y4);
    }
    if(selectedValue == "eixo-y") {
      draw_rectangle_transformed(-x1, -x2, -x3, -x4, y1, y2, y3, y4);
    }
    if(selectedValue == "origin") {
      draw_rectangle_transformed(-x1, -x2, -x3, -x4, -y1, -y2, -y3, -y4);
    }
    if(selectedValue == "straight") {

    let m = Number(document.getElementById("m").value);
    let b = Number(document.getElementById("b").value);

    straightDDA(-300, m * -300 + b, 300, m * 300 + b);

    let [x1New, y1New] = reflectPoint(x1, y1, m, b); 
    let [x2New, y2New] = reflectPoint(x2, y2, m, b);
    let [x3New, y3New] = reflectPoint(x3, y3, m, b);
    let [x4New, y4New] = reflectPoint(x4, y4, m, b);

    draw_rectangle_transformed(x1New, x2New, x3New, x4New, y1New, y2New, y3New, y4New);

    }
  }
}

function draw_rectangle(x1, x2, x3, x4, y1, y2, y3, y4) {
  console.log("(" +x1+ ", " +y1+ ") (" +x2+ ", " +y2+ ") (" +x3+ ", " +y3+ ") (" +x4+ ", " +y4+ ")");
  
  if (isValidRectangle(x1, y1, x2, y2, x3, y3, x4, y4)) {
    straightDDA(x1, y1, x2, y2); // Lado esquerdo
    straightDDA(x2, y2, x3, y3); // Lado inferior
    straightDDA(x3, y3, x4, y4); // Lado direito
    straightDDA(x4, y4, x1, y1); // Lado superior

  } else {
    alert("Suas coordenadas não formam um retângulo válido!");
  }
}

function draw_rectangle_transformed(x1, x2, x3, x4, y1, y2, y3, y4) {
  console.log("(" +x1+ ", " +y1+ ") (" +x2+ ", " +y2+ ") (" +x3+ ", " +y3+ ") (" +x4+ ", " +y4+ ")");

    straightDDA(x1, y1, x2, y2); // Lado esquerdo
    straightDDA(x2, y2, x3, y3); // Lado inferior
    straightDDA(x3, y3, x4, y4); // Lado direito
    straightDDA(x4, y4, x1, y1); // Lado superior

}


function distanceSquared(x1, y1, x2, y2) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}

function isValidRectangle(x1, y1, x2, y2, x3, y3, x4, y4) {
  const d12 = distanceSquared(x1, y1, x2, y2);
  const d23 = distanceSquared(x2, y2, x3, y3);
  const d34 = distanceSquared(x3, y3, x4, y4);
  const d41 = distanceSquared(x4, y4, x1, y1);
  const diag1 = distanceSquared(x1, y1, x3, y3);
  const diag2 = distanceSquared(x2, y2, x4, y4);

  // Condição para ser um retângulo:
  // - Dois lados curtos iguais
  // - Dois lados longos iguais
  // - Diagonais iguais
  return (
    d12 > 0 &&
    d12 === d34 &&
    d23 === d41 &&
    diag1 === diag2
  );
}

function rotatePoint(x, y, centerX, centerY, theta) {
  let xNew = centerX + (x - centerX) * Math.cos(theta) - (y - centerY) * Math.sin(theta);
  let yNew = centerY + (x - centerX) * Math.sin(theta) + (y - centerY) * Math.cos(theta);
  return [xNew, yNew];
}

function reflectPoint(x, y, m, b) {
    const xPrime = (x + m * (y - b)) / (1 + m * m);
    const yPrime = m * xPrime + b;

    const xReflect = 2 * xPrime - x;
    const yReflect = 2 * yPrime - y;

    return [xReflect, yReflect];
}



