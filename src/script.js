let defaultGraphArray = [];
let vertexIndex = 0;
const addVertexButton = document.createElement("edgeButton");
const maxValue = 2147483647;
document.getElementById("saveNewGraph").style.display = "none";

defaultGraph();

function defaultGraph() {
   defaultGraphArray = {
    0: {1: 12, 2: 25, 3: 2},
    1: {2: 15, 3: 7},
    2: {3: 8, 4: 17},
    3: {4: 21},
    4: {}
  }
  getGraph(defaultGraphArray)
}

/**
 * Function to get default graph
 * @param defaultGraphArray
 */
function getGraph(defaultGraphArray) {
  let graphString = "Граф: " + "\n";
  console.log(graphString);

  for (let vertex in defaultGraphArray) {
    for (let neighborVertex in defaultGraphArray[vertex]) {
      const weight = defaultGraphArray[vertex][neighborVertex];
      console.log(vertex, "та", neighborVertex, ": вага ",
          weight);
      graphString = graphString + vertex + " та "
          + neighborVertex
          + ": вага "
          + weight + "\n";
    }
  }
  document.getElementById("graph").textContent = graphString;
  document.getElementById("findDistances").addEventListener("click",
      function () {
        algorithmRealization(defaultGraphArray);
      });
}

/**
 * Function to add own graph
 */
function addGraph() {
  document.getElementById("findDistances").style.display = "none";
  document.getElementById("saveNewGraph").style.display = "block";
  vertexIndex = 0;
  document.getElementById("graph").textContent = null;
  document.getElementById("foundDistances").textContent = null;
  document.getElementById("addGraph").style.display = "none";
  for (let i = 0; i < 4; i++) {
    addVertexElements(vertexIndex);
  }

  addVertexButton.classList.add("myButton")
  addVertexButton.textContent = "Додати вершину";
  addVertexButton.addEventListener("click", function () {
    addVertexElements(vertexIndex);
  });

  document.getElementById("mainPanel").appendChild(addVertexButton);
}

/**
 * Function to add vertices to graph
 */
function addVertexElements() {
  const panelContainer = document.getElementById("panelContainer");

  const panel = document.createElement("div");
  panel.classList.add("panel");

  const vertexLabel = document.createElement("label");
  vertexLabel.textContent = "Вершина " + vertexIndex;
  vertexIndex++;

  const edgePanel = document.createElement("edgePanel");
  edgePanel.classList.add("edgePanel");

  const edgeButton = document.createElement("edgeButton");
  edgeButton.classList.add("myButton")
  edgeButton.textContent = "Додати ребро";
  edgeButton.addEventListener("click", function () {
    addEdgeElements(edgePanel);
  });

  panel.appendChild(vertexLabel);
  panel.appendChild(edgePanel)
  panel.appendChild(edgeButton);
  addEdgeElements(edgePanel);

  panelContainer.appendChild(panel);
}

function addEdgeElements(panel) {
  const edgeLabel = document.createElement("label");
  edgeLabel.textContent = " => ребро ";

  const edgeInput = document.createElement("input");

  const weightLabel = document.createElement("label");
  weightLabel.textContent = " вага: ";

  const weightInput = document.createElement("input");

  panel.appendChild(edgeLabel);
  panel.appendChild(edgeInput);
  panel.appendChild(weightLabel);
  panel.appendChild(weightInput);
}

/**
 * Function to read user's input
 * and create new graph from it
 */
function readInputData() {
  const panelContainer = document.getElementById("panelContainer");
  const panels = panelContainer.querySelectorAll(".panel");

  const inputData = {};

  panels.forEach((panel, index) => {
    const inputs = panel.querySelectorAll("input");

    inputData[index] = {};

    for (let i = 0; i < inputs.length; i = i + 2) {
      if (inputs[i].value === '' && inputs[i + 1].value === '') {
        alert("Введіть усі дані");
        break;
      }
      inputData[index][inputs[i].value] = inputs[i + 1].value;
    }
  });

  document.getElementById("findDistances").style.display = "block";
  document.getElementById("saveNewGraph").style.display = "none";
  document.getElementById("addGraph").style.display = "block";
  document.getElementById("panelContainer").textContent = null;
  addVertexButton.style.display = "none";

  getGraph(inputData);
}

/**
 * Dijkstra's Algorithm
 * @param graph
 */
function algorithmRealization(graph) {
  let graphLength = Object.keys(graph).length;
  let routes = new Array(graphLength).fill("0");
  let distances = new Array(graphLength).fill(maxValue);
  distances[0] = 0;
  let visitedVertices = new Array(graphLength).fill(false);
  visitedVertices[0] = true;

  console.log("Відстані ", distances);

  for (let i = 0; i < graphLength - 1; i++) {

    for (let neighborVertex in graph[i]) {
      let weight = parseInt(graph[i][neighborVertex]);

      if (!visitedVertices[neighborVertex] && distances[i] + weight
          < distances[neighborVertex]) {
        distances[neighborVertex] = distances[i] + weight;
        routes[neighborVertex] = routes[i] + "-" + neighborVertex;
      }
    }
    visitedVertices[i] = true
    console.log("Відстані ", distances);
  }

  let distancesString = "Найкоротші шляхи:" + "\n";
  for (let i = 1; i < distances.length; i++) {
    distancesString = distancesString + "Від 0 до " + i + " => " + distances[i] + "\n";
    document.getElementById("foundDistances").textContent = distancesString;
  }
}