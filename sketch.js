let data;
let mapImg;

function preload(){
  let weatherKey = '5e48243f4e2c1794ffeb1248ec1503a7';   //api key
  let lonLeft = '-6', latBottom = '49.8', lonRight = '3', latTop  = '51.5', zoom = '10';  //API call bounding box coords
  let weatherUrl = 'http://api.openweathermap.org/data/2.5/box/city?bbox=' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ',' + zoom + '&appid=' + weatherKey + '&units=metric';
  data = loadJSON(weatherUrl);

  let mapKey = 'pk.eyJ1IjoiYmVuLXNhbmRpc29uIiwiYSI6ImNrbXdzcmZoazBpNzkydm52bXk4dG5wNW0ifQ.qZTYDoEcLJSjYow5OWIqqQ';
  let mapUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/[' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ']/800x600?access_token=' + mapKey;
  mapImg = loadImage(mapUrl);


  // console logs:
  print(weatherUrl);
  print(mapUrl);
}

function setup() {
  createCanvas(800, 600);

}

function draw() {
  background(220);
  
  image(mapImg, 0, 0, 800, 600);

  for(i=0; i<data.list.length; i++){
    x = map(data.list[i].coord.Lon, -6, 3, 0, 800);
    y = map(data.list[i].coord.Lat, 51.5, 49.8, 0, 600);

    fill(255, 255, 255);
    text(data.list[i].name, x, y);
  }

}