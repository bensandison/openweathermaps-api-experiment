let data;
let mapImg;
const mapData = {	//data about map coordinates
	lonMid : -2.1,
	latMid : 50.7,
	mapZoom : 6.2,
	mapX : 800,
	mapY : 350,
}
let state = {
	wind : true,
	temp : false,
	labels : false,
}

var fr;		//framerate

let cellWidth = 50, cellHeight = 50;	//vars used for defining cells
let cells = [];	//2D array of cells
let particles = [];	//array of particles
let particlesNo = 600, particleResetNo = 3;

function preload(){
	loadMap();
	loadWeather();
}

function setup() {
	createCanvas(mapData.mapX, mapData.mapY);
	
	let desc = createElement("h2", "Toggle Buttons:");
	let windBtn = createButton("Toggle Wind");
	windBtn.mousePressed(toggleWind);
	let tempBtn = createButton("Toggle Heat Map");
	tempBtn.mousePressed(toggleTemp);
	let labelBtn = createButton("Toggle Labels");
	labelBtn.mousePressed(toggleLabels);

	fr = createP('');

	background(50);

	//call data class functions
	calcCoords();	//calculate x and y positions of cities
	toRadians();
	calcAverages();
	
	print(data);

	image(mapImg, 0, 0);	//draw map image
	
	createCells();	//creates cells and calcs weather values for each

	for (var i = 0; i < particlesNo; i++){		/* create array of particles */
		particles[i] = new Particle();
	}
}

function draw(){
	strokeWeight(2);
	background(50, 20);

	//check state throughout draw loop
	if(state.temp){
		for (let i = 0; i < cells.length; i++){
			cells[i].drawTemp();
		}
	}

	if(state.wind){		/* check if wind state is active */
		for(let i = 0; i < particleResetNo; i++){	/* reset the position of a few particles per frame */
			particles[floor(Math.random() * particles.length)].reset();		//selects a random particle to reset position
		}
		for (let i = 0; i < particles.length; i++){
			particles[i].update();
			particles[i].draw();
			particles[i].edges();
			particles[i].follow();
		}
	}

	image(mapImg, 0, 0);	//draw map image

	if(state.labels){
		stroke(0);
		fill(255);
		for(let i = 0; i<data.list.length; i++){
			textSize(10);
			text(data.list[i].name, data.list[i].xPos + width / 2, data.list[i].yPos + height / 2);
		}
	}

	

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

function toggleWind(){
	state.wind = state.wind== true ? false : true;
}
function toggleTemp(){
	state.temp = state.temp==true ? false : true;
}
function toggleLabels(){
	state.labels = state.labels==true ? false : true;
}