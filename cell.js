class Cell{		/* cell class stores inportant info about the current cells */
	constructor(x, y){
		this.x = x;		//positions of the top right corner of the cells
		this.y = y;
		this.xCenter = x + cellWidth;
		this.yCenter = y + cellHeight;
		this.active = this.cellActive();	//represents if the cell is active on the map (if it is on land)
		//this.temp = temp;
		//this.windSpeed = windSpeed;
		//this.windDir = windDir;
	}

	//getters
	getTemp(){
		return this.temp;
	}
	getWindSpeed(){
		return this.windSpeed;
	}
	getWindDir(){
		return this.windSpeed;
	}

	draw(){
		if(this.active) fill(0, 255, 0, 100);
		else fill(200, 0, 0, 100);
		square(this.x, this.y, cellWidth);
	}

	cellActive(){		/* function checks 5 pixels in each cell to see if it is on land */
		//if any of the pixels are not white the cell will be determined to be active:
		if(get(this.x, this.y)[0] < 100) return true;		//first checks each corner
		if(get(this.x + cellWidth, this.y)[0] < 100) return true;
		if(get(this.x, this.y + cellHeight)[0] < 100) return true;
		if(get(this.x + cellWidth, this.y + cellHeight)[0] < 100) return true;
		if(get(this.x + cellWidth / 2, this.y + cellHeight / 2)[0] < 100) return true;	//then checks center of cell
		else return false;	//if none of the pixels are dark the cell is determined to be inactive
	}
}