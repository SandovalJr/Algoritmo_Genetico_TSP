//Ciudades
let cities = [];
let NCities = 15;
//Poblacion
let Population = [];
let poblacionMedida = 250;
//Contador de generacion
let generacion = 1;
let fitness = [];
let recordDistance = Infinity;
let mejorRuta;
let mejorActual;

// Mostrar ciudades
function setup() {
  createCanvas(600, 600);
  // Creamos las ciudades aleatoriamente en el html
  for (let i = 0; i < NCities; i++) {
    let v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }

  // Creamos la nueva poblacion y enviamos como parametros la medida de la poblacion
  Population = creamosPoblacion(poblacionMedida, NCities);
}

function draw() {
  background(0);
  frameRate(5);
  fill(255);

  measureFitness(Population, cities);
  normalizamosElFitness();
  siguienteGeneracion();

  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  //aqui dibujamos las lineas que conectan las ciudades
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < mejorRuta.length; i++) {
    let n = mejorRuta[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 13, 13);
  }
  endShape();

  //aqui dibujamos la mejor ruta en color azul
  translate(0, height / 2 - 30);
  stroke(116, 162, 221);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < mejorActual.length; i++) {
    let n = mejorActual[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 12, 12);
  }
  endShape();

  generacion++;
  if (generacion == 500) {
    noLoop();
    console.log("Finalizado , Se alcanzo la ultima generacion");
  }
}

// Medida para sacar la fitness
// se utiliza el metodo de la ruleta
// se le asigna una calificación basado en que tan largo o corto es su distancia
function measureFitness(Population, cities) {
  let registroRecord = Infinity;
  for (let i = 0; i < Population.length; i++) {
    let d = TotalDistancia(cities, Population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      mejorRuta = Population[i];
    }
    if (d < registroRecord) {
      registroRecord = d;
      mejorActual = Population[i];
    }
    fitness[i] = 1 / (d + 1);
  }
}
