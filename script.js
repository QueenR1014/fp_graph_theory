

console.log('map script loaded')
//Algoritmo de búsqueda de camino
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }   

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift().element;
        }
        return null;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

function dijkstra(graph, start, end) {
    const distances = {};
    const visited = {};
    const predecessors = {}; // No need for initialization here
    const priorityQueue = new PriorityQueue();

    for (const edge of graph) {
        const [node1, node2, weight] = edge;
        if (!distances[node1]) distances[node1] = Infinity;
        if (!distances[node2]) distances[node2] = Infinity;
    }

    distances[start] = 0;
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const currentNode = priorityQueue.dequeue();
        if (visited[currentNode]) continue;
        visited[currentNode] = true;

        if (currentNode === end) {
            const path = [];
            let backtrackNode = end; // Start from the destination
            while (backtrackNode !== start) { // Stop when reaching the start
                path.unshift(backtrackNode); // Add node to the beginning of the path
                backtrackNode = predecessors[backtrackNode];
            }
            path.unshift(start); // Add the start node to complete the path

            return { path, distance: distances[end] };
        }

        for (const [node1, node2, weight] of graph) {
            if (node1 === currentNode || node2 === currentNode) {
                const neighborNode = node1 === currentNode ? node2 : node1;
                const totalDistance = distances[currentNode] + weight;

                if (totalDistance < distances[neighborNode]) {
                    distances[neighborNode] = totalDistance;
                    predecessors[neighborNode] = currentNode;
                    priorityQueue.enqueue(neighborNode, totalDistance);
                }
            }
        }
    }



    return null; // Path not found
}

const mapGraph = [
    ['A', 'ABE', 2.5], ['ABE', 'B', 2.5], ['ABE', 'E', 3.5],
    ['BD','B', 1.5], ['BDC','BD',1.5] , ['C','BDC',1],
    ['D','BDC',2], ['D', 'DJI', 3], ['DJI','HI',1],
    ['D', 'G', 4], ['DJI', 'IJ', 3], ['HI', 'I', 1.5], 
    ['IJ', 'J', 1.5], ['F', 'E', 2], ['G', 'F', 1],
    ['HI', 'H', 2.5]
];

const path_coordinates = {
    "A": [-20, -34], //checked
    "B": [-13, -30],
    "C": [-3, -17],
    "D": [-9, -10],
    "E": [-32, -30],
    "F": [-32, -18],
    "G": [-32, -10],
    "H": [-6, 16],
    "I": [-4, 10],
    "J": [-25, 16],
    "BD": [-9, -30],
    "IJ": [-25, 10],
    "HI": [-6, 10],
    "ABE": [-20, -30],
    "BDC": [-9, -17],
    "DJI": [-9, 10]
};

const names = [ ['A', 'Entrada'], ['B', 'Escalera Caldas'], 
                ['C', 'Baños Claustro'], ['D', 'Entrada Teatrino'], 
                ['E', 'Síndico'], ['F', 'Aula Mutis'], 
                ['G','La Bordadita'], ['H','Cuenteros'], 
                ['I', 'Escaleras Casur'], ['J','Comedor']];


const names_dic = {
    "A": "Entrada",
    "B": "Escalera Caldas",
    "C": "Baños Claustro",
    "D": "Entrada Teatrino",
    "E": "Síndico",
    "F": "Aula Mutis",
    "G": "La Bordadita",
    "H": "Cuenteros",
    "I": "Escaleras Casur",
    "J": "Comedor"
};

// Map visualization



var map = L.map("map",{
    minZoom: 2, // Minimum zoom level
    maxZoom: 5  // Maximum zoom level
}).setView([-5, 0], 4);
var imageMap = 'maps/map.png';

console.log("imagen cargada");

// Load the image overlay with specific bounds
var imageUrl = imageMap;
var aspectRatio = 3000 / 3000; // Width / Height of your image
var mapHeight = 100; // Set the desired map height in map units (e.g., degrees of latitude)
var mapWidth = aspectRatio * mapHeight; // Calculate the corresponding width based on the aspect ratio

var imageBounds = [[-mapHeight / 2, -mapWidth / 2], [mapHeight / 2, mapWidth / 2]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Set the maximum bounds of the map to restrict panning
map.setMaxBounds(imageBounds);

// Posibles tamaños de los iconos

const iconSizes = {
    "S":[30,30],
    "M":[50,50],
    "L":[70,70]
};

//Tamaños para cada visualización de botón

const relationSizes = {
    "m2": "L",
    "m3": "L",
    "m4": "M",
    "m5": "M",
    "m6": "L",
    "m7": "M",
    "m8": "L",
    "m9": "S",
    "m10": "S",
    "m11": "S"
};



//Establecemos el icono con el tamaño mediano
let Icon = L.icon({
    iconUrl: 'markers/Pablo.png',
    iconSize: iconSizes['M']
});

//Añadimos el marcador con el icono
var marker = L.marker([-34, -20], { icon: Icon }).addTo(map);


//set dynamic icon size
// Listen for the zoomend event
map.on('zoomend', function() {
    var zoomLevel = map.getZoom();
    if(zoomLevel <= 3){
        let newIcon = L.icon({
            iconUrl: 'markers/Pablo.png',
            iconSize: iconSizes['S']
        });

        marker.setIcon(newIcon);
    }else if(zoomLevel < 5){
        let newIcon = L.icon({
            iconUrl: 'markers/Pablo.png',
            iconSize: iconSizes['M']
        });

        marker.setIcon(newIcon);
    }

});

//Actualizar el tamaño del icono
function updateMarkerIcon(sizeKey) {
    if (!iconSizes[sizeKey]) {
        console.error("Invalid size key provided");
        return;
    }
    
    // Create a new icon with the updated size
    let newIcon = L.icon({
        iconUrl: 'markers/Pablo.png',
        iconSize: iconSizes[sizeKey]
    });
    
    // Update the marker's icon
    marker.setIcon(newIcon);
};


console.log("flag");


let polyline = null;
let switchChecked = false; // Estado inicial del switch

function locateMarker(start){
    marker.setLatLng([path_coordinates[start][1],path_coordinates[start][0]]);
}

function visualization(start, end,id) {
    var path = dijkstra(mapGraph, start, end)["path"];
    var polyline_coord = [];
    
    for (let i = 0; i < path.length; i++) {
        polyline_coord.push([path_coordinates[path[i]][1], path_coordinates[path[i]][0]]);
    }

    if (polyline) {
        map.removeLayer(polyline);
    }
    
    // Crear la polilínea con el color correspondiente al estado del switch
    polyline = L.polyline(polyline_coord, { color: (switchChecked ? "#00A3FF" : "#ba0620"), weight: 5 }).addTo(map);
    
    polyline.bindTooltip(names_dic[end]);

    polyline.on('mouseover', function(e) {
        this.openTooltip();
    });

    polyline.on('mouseout', function(e) {
        this.closeTooltip();
    });

    var length = polyline_coord.length;
    var index = 0;
    var interval = setInterval(function() {
        var segment = polyline_coord.slice(0, index + 1);
        polyline.setLatLngs(segment);
        polyline.setStyle({ opacity: (index + 1) / length });
        index++;
        if (index >= length) {
            clearInterval(interval);
        }
    }, 250);

    //actualización del marcador
    locateMarker(start);
    updateMarkerIcon(relationSizes[id]);
    map.fitBounds(polyline.getBounds());
}

// Agregar evento de cambio para el switch
/*document.getElementById('switch-color').addEventListener('change', function() {
    // Actualizar el estado del switch
    switchChecked = this.checked;

    // Cambiar el color de la polilínea
    if (polyline) {
        var newColor = (switchChecked) ? "#00A3FF" : "#ba0620";
        polyline.setStyle({ color: newColor });
    }
});*/