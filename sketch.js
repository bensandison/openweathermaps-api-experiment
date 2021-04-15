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
	background(50);
	calcCoords();	//calculate x and y positions of cities
	calcAverages();
	
	image(mapImg, 0, 0);	//draw map image
	
	createCells();	//creates cells and calcs weather values for each

	for (var i = 0; i < 100; i++){
		particles[i] = new Particle();
	}
}

function draw(){
	strokeWeight(2);
	background(50, 20);
	for (var i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].show();
		particles[i].edges();
	}
	image(mapImg, 0, 0);	//draw map image
}

function createCells(){		/* function creates cells and gives them weater values */
	for(let x = 0; mapData.mapX.length / 50; x++){		/* loop through x axis of grid */
		for(let y = 0; mapData.mapY.length / 50; y++){	/* loop through y axis of grid */
			let windSpeed = 0, windDirection = 0, temprature = 0, distanceMultiplier = 0;		/* temp variables store totals (to be used for averages later) */
			for(let c = 0; data.list[i].length; c++){	/* loop throgh all cities in dataset */
				distance = dist(x*50, y*50, data.list.mapX, data.list.mapY);	/* calculate distance between the current point and the city */
				if(distance > 200)continue;		/* break from loop if distance is more than 200px */
				/* else: */
				windSpeed += data.list[i].speed
			}
		}
	}
}