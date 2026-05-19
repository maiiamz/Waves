let wave = []; //arreglo
let samples = 30;

//llenamos el arreglo
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i=0; i < samples; i++){
        let value = random(-1,1); //valores aleatorios
        wave.push(value); //agregamos sample (push sirve para agregar un elemento al final del arreglo)
    }
}

function draw() {
    background (10);
    stroke(0, 255, 120);
    noFill();
    beginShape();
    for (let i=0; i < wave.length; i++){
        let x = map(i, 0, wave.length, 0, width); //mapear el indice a la pantalla
        let y = map(wave[i], -1, 1, height, 0); //mapear el valor a la pantalla
        vertex(x, y); //dibujar el punto
    }
    endShape();
}