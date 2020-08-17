// Distancia total
// Aqui vamos sumando la distancia total de el recorrido de las ciudades
function TotalDistancia(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityAIndex = order[i];
    let cityA = points[cityAIndex];
    let cityBIndex = order[i + 1];
    let cityB = points[cityBIndex];
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// Normalizamos todas las fitness
// asignamos porcentajes de un total de 100
function normalizamosElFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

// Obtenemos la mutacion
function genMutation(array, x, y) {
  let temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}

// creamos la poblacion
function creamosPoblacion(sizep, nCities) {
  let newOrder = [];
  let Population = [];
  for (let i = 0; i < sizep; i++) {
    for (let x = 0; x < nCities; x++) {
      newOrder[x] = x;
    }

    Population[i] = shuffle(newOrder);
  }
  return Population;
}

// generamos una nueva poblacion
//  los  mejores  de la funcion tomar uno tiene mas posibilidad de ser seleccionados
// los cruzamos en el metodo cruzamos para que tengan hijos
// despues al hijo lo metemos en Order y tiene chance de mutar al 5%
function siguienteGeneracion() {
  let nuevaPoblacion = [];
  for (let i = 0; i < Population.length; i++) {
    let OrderA = TomaUno(Population, fitness);
    let OrderB = TomaUno(Population, fitness);
    let Order = Cruzamos(OrderA, OrderB);
    Mutacion(Order, 0.05);
    nuevaPoblacion[i] = Order;
  }

  Population = nuevaPoblacion;
}

function TomaUno(list, prob) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function Cruzamos(OrderA, OrderB) {
  let start = floor(random(OrderA.length));
  let end = floor(random(start + 1, OrderA.length + 1));
  let newOrder = OrderA.slice(start, end);
  for (let i = 0; i < OrderB.length; i++) {
    let city = OrderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
    // console.log(newOrder);
  }
  return newOrder;
}

// muta aleatoriamente
function Mutacion(order, TasaDeMutacion) {
  if (random(1) < TasaDeMutacion) {
    let indexA = floor(random(order.length));
    let indexB = floor(random(order.length));
    genMutation(order, indexA, indexB);
  }
}
