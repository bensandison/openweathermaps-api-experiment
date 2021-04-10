let data;
let mapImg;
let lonMid = '-2', latMid = '51', mapZoom = '6.2';  //central lat/lon and zoom level for map

function preload(){
  //weather api
	let weatherKey = '5e48243f4e2c1794ffeb1248ec1503a7';   //api key
	let lonLeft = '-6', latBottom = '49.8', lonRight = '3', latTop  = '51.5', weatherZoom = '10';  //API call bounding box coords
	let weatherUrl = 'http://api.openweathermap.org/data/2.5/box/city?bbox=' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ',' + weatherZoom + '&appid=' + weatherKey + '&units=metric';
	data = loadJSON(weatherUrl);


	let mapKey = 'pk.eyJ1IjoiYmVuLXNhbmRpc29uIiwiYSI6ImNrbXdzcmZoazBpNzkydm52bXk4dG5wNW0ifQ.qZTYDoEcLJSjYow5OWIqqQ';
	//lonMid, latMid and mapZoom are declared above
	let mapUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + lonMid + ',' + latMid + ',' + mapZoom + ',0/800x400?access_token=' + mapKey;
	mapImg = loadImage(mapUrl);


	// console logs:
	print(weatherUrl);
	print(mapUrl);
}

function setup() {
	createCanvas(800, 600);
	background(220);
	translate(width / 2, height/2);
	imageMode(CENTER);

	//draw map image
	image(mapImg, 0, 0);

	// let lon = -1, lat = 51.5;

	let cx = mercX(lonMid);
	let cy = mercY(latMid);

	// let x = mercX(lon) - cx;
	// let y = mercY(lat) - cy;

	// fill(255, 0, 255, 200);
	// ellipse(x, y, 20, 20);

	for(i=0; i<data.list.length; i++){
		x = mercX(data.list[i].coord.Lon) - cx;
		y = mercY(data.list[i].coord.Lat) - cy;

		//draw place name
		fill(255, 255, 255);
		text(data.list[i].name, x, y);

		let radius = map(data.list[i].main.temp, 5, 30, 30, 70);
		let red = map(data.list[i].main.temp, 5, 10, 50, 255);

		//draw temp circle
		fill(red, 200, 0, 50);
		noStroke();
		ellipse(x, y, radius);
	}
}

function mercX(lon) {
	lon = radians(lon);
	let a = (256 / PI) * pow(2, mapZoom);
	let b = lon + PI;
	return a * b;
}

function mercY(lat){
	lat = radians(lat);
	let a = (256 / PI) * pow(2, mapZoom);
	let b = tan(PI/4 + lat/2);
	let c = PI - log(b);
	return a * c;
}