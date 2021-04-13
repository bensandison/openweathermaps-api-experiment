function loadMap(){		/* constructs mapBox api uri and loads map as an image */
	mapKey = "pk.eyJ1IjoiYmVuLXNhbmRpc29uIiwiYSI6ImNrbXdzb25ucDBpNTMyb252NWUxZDJpMzAifQ.VihZeh8XW1EXJ3HDCTi6Yg"
	styleUrl = "ben-sandison/cknf0a2vx3ibf17o753pyt5ep"		/* url for my custom styling */
	mapUrl = "https://api.mapbox.com/styles/v1/" + styleUrl + "/static/" + mapData.lonMid + "," + mapData.latMid + "," + mapData.mapZoom + ",0/" + mapData.mapX + "x" + mapData.mapY + "?access_token=" + mapKey;
	
	mapImg = loadImage(mapUrl);		// load map to "mapImage"
}

function loadWeather(){		/* constructs openWeatherMaps api uri and loads data */
	let weatherKey = '5e48243f4e2c1794ffeb1248ec1503a7';   //api key
	let lonLeft = '-6', latBottom = '49.8', lonRight = '3', latTop  = '51.5', weatherZoom = '10';  //API call bounding box coords
	let weatherUrl = 'http://api.openweathermap.org/data/2.5/box/city?bbox=' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ',' + weatherZoom + '&appid=' + weatherKey + '&units=metric';

	data = loadJSON(weatherUrl);	//load weather data to "data" object
}

function calculateCoords(){		/* Calculates X and Y position of cities */
	//These functions are used to convert Longitude and Latitude to X and Y positions
	//They use 'Mercator projection'
	function mercX(lon) {
		lon = radians(lon);
		let a = (256 / PI) * pow(2, mapData.mapZoom);
		let b = lon + PI;
		return a * b;
	}
	function mercY(lat){
		lat = radians(lat);
		let a = (256 / PI) * pow(2, mapData.mapZoom);
		let b = tan(PI/4 + lat/2);
		let c = PI - log(b);
		return a * c;
	}

	//These variables give us the central position of our map
	let cx = mercX(mapData.lonMid);
	let cy = mercY(mapData.latMid);

	//We then loop through and add the X and Y positions as properties of the data object
	for(let i=0; i<data.list.length; i++){
		data.list[i].xPos = mercX(data.list[i].coord.Lon) - cx;	//calculate x position
		data.list[i].yPos = mercY(data.list[i].coord.Lat) - cy;
	}
}

