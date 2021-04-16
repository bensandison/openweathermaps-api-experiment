class Cell{		/* cell class stores inportant info about the current cells */
	constructor(x, y){
		this.x = x;		//positions of the top right corner of the cells
		this.y = y;
		this.xCenter = x + cellWidth;
		this.yCenter = y + cellHeight;
		
		//these vars will be set in setWeather()
		this.temp = undefined;
		this.windSpeed = undefined;
		this.windDir = undefined;

		this.setWeather();
	}

	setWeather(){
		let valueFound = false;
		let multiplier = 0;		//keeps track of how many values have been added to totals (for avg)
		let tempTotal = 0, windSpeedTotal = 0;	//total values (for avg)
		let windDirArr = [];	//array of wind directions will be used to find average direction

		for(let i = 0; i < data.list.length; i++){	//loop through all cities in data array
			let disance = dist(this.xCenter, this.yCenter, data.list[i].xPos, data.list[i].yPos);
			if(disance > 300) continue;		//go to next city in the data array if its very far;

			valueFound = true;
			let weighting = 1		//multiplier is used to give each city weightings based on how close it is
			if(disance < 200) weighting = 2;
			if(disance < 100) weighting = 5;
			if(disance < 50) weighting = 10;	//closest citys are given a large multiplier
			
			for(let j = 0; j < weighting; j++){
				multiplier++;		//increment multiplier
				tempTotal += data.list[i].main.feels_like;	//add temp to total temp
				windSpeedTotal += data.list[i].wind.speed
				windDirArr.push(data.list[i].wind.rad);		//add wind direction to the array
			}
		}
		//calculate averages:
		this.temp = tempTotal / multiplier;		//calculate average temp
		this.windSpeed = windSpeedTotal / multiplier;
		this.windDir = averageAngle(windDirArr);	//pass array of wind directions to function to calc average wind direction

		if(!valueFound){	//if no weather values were nearby:
			this.temp = data.averageTemp;		//assign them average values
			this.windSpeed = data.averageWindSpeed;
			this.windDir = data.averageWindSpeed;
		}

		//round values:
		this.temp = Math.round((this.temp + Number.EPSILON) * 100) / 100;
		this.windSpeed = Math.round((this.windSpeed + Number.EPSILON) * 100) / 100;
		this.windDir = Math.round((this.windDir + Number.EPSILON) * 100) / 100;

		print("X: " + this.x + " Y: " + this.y);
		print("Temp: " + this.temp + "	Speed: " + this.windSpeed + "	Direc: " + this.windDir);
		print("------------------------------")
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
}