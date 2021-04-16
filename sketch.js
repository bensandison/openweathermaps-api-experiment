let data;
let mapImg;
const mapData = {	//data about map coordinates
	lonMid : -2.1,
	latMid : 50.7,
	mapZoom : 6.2,
	mapX : 800,
	mapY : 350,
}
var fr;		//framerate

let cellWidth = 50, cellHeight = 50;	//vars used for defining cells
let cells = [];	//2D array of cells
let particles = [];	//array of particles

function preload(){
	loadMap();
	loadWeather();
}

function setup() {
	createCanvas(mapData.mapX, mapData.mapY);
	fr = createP('');

	background(50);

	//call data class functions
	calcCoords();	//calculate x and y positions of cities
	toRadians();
	calcAverages();
	
	print(data);

	image(mapImg, 0, 0);	//draw map image
	
	createCells();	//creates cells and calcs weather values for each

	for (var i = 0; i < 100; i++){		/* create array of particles */
		particles[i] = new Particle();
	}
}

function draw(){
	strokeWeight(2);
	background(50, 20);

	for (let i = 0; i<cells.length; i++){
		cells[i].draw();
	}

	for (let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].show();
		particles[i].edges();
	}
	image(mapImg, 0, 0);	//draw map image

	fr.html("Frame Rate: " + floor(frameRate()));
}

function createCells(){		/* function creates cells and gives them weather values */
	for(let x = 0; x < mapData.mapX; x+=cellWidth){		/* loop through x axis of grid */
		for(let y = 0; y < mapData.mapY; y+=cellHeight){	/* loop through y axis of grid */
			let xInd = x / cellWidth;	//calc x index
			let yInd = y / cellHeight;

			cells[(mapData.mapY / cellHeight) * xInd + yInd] = new Cell(x, y);	//here we map a 2d data structure into a 1d array
		}
	}

	
}