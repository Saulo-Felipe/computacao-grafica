let canvas;
let width = 1000, height = 500;
let initialPosition;
let electrocardiogram;
let isRunning = false;
let displayDuration = 10000;
let startTime; 


let heartbeatMax = 100; // Frequência máxima fixa
let heartbeatMin = 30;  // Frequência mínima fixa


const frequencies = {
    20: { min: 90, max: 150 },
};

const situations = {
    // 0: 90,
    // 1: 50,
    // 2: 30,
    3: 20,
    // 4: 10,
    // 5: 0
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Electrocardiogram {
    constructor(p) {
        this.points = [];
        this.currentPointIndex = 0;
        
        this.createPoints = () => {
            this.points.push(initialPosition);
            for (let i = 1; i < Math.floor(width / 10); i++) {
                let previousPoint = Object.assign({}, this.points[i - 1]);

                if (i % 20 == 0) {
                    let randomBottomPoint = Math.floor(Math.random() * (heartbeatMax - heartbeatMin + 1) + (previousPoint.y - heartbeatMax));
                    let randomTopPoint = Math.floor(Math.random() * (heartbeatMax - heartbeatMin + 1) + (previousPoint.y + heartbeatMin));
                    let bottomPoint = new Point(previousPoint.x + 10, randomBottomPoint);

                    this.points.push(bottomPoint);
                    let topPoint = new Point(bottomPoint.x + 10, randomTopPoint);
                    this.points.push(topPoint);
                    i++;
                } else {
                    this.points.push(new Point(previousPoint.x + 10, initialPosition.y));
                }
            }
        };
        this.reset = () => {
            this.points = [];
            this.createPoints();
            this.currentPointIndex = 0;
        };
        this.showPoints = () => {
            p.stroke(0, 200, 0);
            p.strokeWeight(1);
            p.noFill();
            for (let i = 1; i < this.currentPointIndex; i++) {
                p.line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y);            
            }
            this.currentPointIndex++;
            if (this.currentPointIndex >= this.points.length) {
                this.reset();
            }
        };
    }
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.style('border', '1px solid black');
    canvas.parent('canvas-container');
    frameRate(30);
    background(255);
    initialPosition = new Point(0, height / 2);
    electrocardiogram = new Electrocardiogram(this);
    electrocardiogram.createPoints();

    // Adiciona um ouvinte de evento ao botão existente
    document.getElementById("handle-draw")?.addEventListener("click", startElectrocardiogram);
}

function draw() {
    background(0);
    if (isRunning) {    
        electrocardiogram.showPoints();
        if (millis() - startTime >= displayDuration) {
            isRunning = false; // Para o eletrocardiograma após o tempo definido
            background(0); // Limpa a tela
            electrocardiogram.reset();
        }
    }
}

function startElectrocardiogram() {
    // Lê a duração do input, converte para milissegundos e define o valor
    const inputDuration = document.getElementById("duration").value;
    displayDuration = (parseInt(inputDuration) || 1) * 1000; // Converte para milissegundos ou usa 1000 ms como padrão
    startTime = millis(); // Armazena o tempo de início
    isRunning = true; // Inicia o eletrocardiograma
}

new p5();
