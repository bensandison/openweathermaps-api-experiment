let data;
let mapImg;
const mapData = {	//data about map coordinates
	lonMid : -2.1,
	latMid : 50.7,
	mapZoom : 6.2,
	mapX : 800,
	mapY : 350,
}

var particles = [];

function preload(){
	loadMap();
	loadWeather();
}

function setup() {
	createCanvas(mapData.mapX, mapData.mapY);
	background(200);
	translate(width / 2, height/2);
	imageMode(CENTER);
	calculateCoords();	//calculate x and y positions of cities
	image(mapImg, 0, 0);	//draw map image

	for (var i = 0; i < 100; i++){
		particles[i] = new Particle();
	}

}

function draw(){
	strokeWeight(2);
	background(255, 10);
	for (var i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].show();
		particles[i].edges();
	}
}