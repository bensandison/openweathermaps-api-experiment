let data;
let mapImg;
const mapData = {	//data about map coordinates
	lonMid : -2,
	latMid : 51,
	mapZoom : 6.2,
	mapX : 800,
	mapY : 600,
}

function preload(){
	loadMap();
	loadWeather();
}

function setup() {
	createCanvas(mapData.mapX, mapData.mapY);
	background(255);
	translate(width / 2, height/2);
	imageMode(CENTER);

	calculateCoords();	//calculate x and y positions of cities

	image(mapImg, 0, 0);	//Draws map image
}