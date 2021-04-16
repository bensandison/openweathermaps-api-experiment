class Particle {
	constructor(){		/* creates vectors for each variable */
		this.pos = createVector(random(width), random(height));	//position
		this.vel = createVector(0, 0);	//velocity
		this.acc = createVector(0, 0);	//acceleration
		this.maxSpeed = 1;
	}

	reset(){	/* resets particle to random place */
		this.pos = createVector(random(width), random(height));	//position
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);	//reset acceleration
	}

	follow(){
		//gets index of grid that the particle is inside
		let xInd = floor(this.pos.x / cellWidth);
		let yInd = floor(this.pos.y / cellHeight);

		//gets force from the current cell
		var force = cells[(mapData.mapY / cellHeight) * xInd + yInd].getVect();

		this.applyForce(force);		//apply force from vect
	}

	applyForce(force){		/* changes acceleration based off wind */
		this.acc.add(force);
	}

	draw() {
		stroke(200);
		point(this.pos.x, this.pos.y);
	}

	edges() {		/* edge detection */
		if (this.pos.x > mapData.mapX) this.reset();
		if (this.pos.x < 0) this.reset();
		if (this.pos.y > mapData.mapY) this.reset();
		if (this.pos.y < 0) this.reset();
	}
}