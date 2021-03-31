let data;
let mapImg;

function preload(){
  let weatherKey = '5e48243f4e2c1794ffeb1248ec1503a7';   //api key
  let lonLeft = '-6', latBottom = '49.8', lonRight = '3', latTop  = '51.5', zoom = '10';  //API call bounding box coords
  let weatherUrl = 'http://api.openweathermap.org/data/2.5/box/city?bbox=' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ',' + zoom + '&appid=' + weatherKey + '&units=metric';
  data = loadJSON(weatherUrl);

  let mapKey = 'pk.eyJ1IjoiYmVuLXNhbmRpc29uIiwiYSI6ImNrbXdzcmZoazBpNzkydm52bXk4dG5wNW0ifQ.qZTYDoEcLJSjYow5OWIqqQ';
  let mapUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[' + lonLeft + ',' + latBottom + ',' + lonRight + ',' + latTop + ']/1000x800?access_token=' + mapKey;
  mapImg = loadImage(mapUrl);
}

function setup() {
  createCanvas(1000, 800);

  for(i=0; i<data.list.length; i++){
    print(data.list[i].name)
    print(data.list[i].main.temp)
  }

}

function draw() {
  background(220);
  
  image(mapImg, 0, 0, 1000, 800);

}