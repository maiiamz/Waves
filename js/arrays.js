// Los arreglos son estructuras de datos que pueden almacenar múltiples valores en una sola variable. En JavaScript, los arreglos se crean utilizando corchetes [] y pueden contener cualquier tipo de dato, incluyendo números, cadenas de texto, objetos e incluso otros arreglos.
let arreglo = ["guayaba", "manfo", "piña", "fresa"];
let nombre = "maia";
let offset = 0;

const PALETTE = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"];
const radio = 300;
//alert(arreglo[0]);
//alert(PALETTE[1]);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(PALETTE[2]);
}

function draw(){
    background(PALETTE[0]);
    
    //beginShape();
    noFill();
    strokeWeight(2);
    stroke(PALETTE[1]);
    for (let i=0; i < width; i++){
        let angle = (i *0.02) + offset;
        let y = sin(angle) * radio + height/2;
        //vertex(i, y);
        rect(i, y, 1, 1);
    }
    //endShape();
    offset += 0.1;
}