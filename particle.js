class Particle {
	constructor(){
		this.pos = createVector(random(width), random(height));	//position
		this.vel = p5.Vector.random2D();	//velocity
		this.acc = createVector(0, 0);	//acceleration
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);	//reset acceleration
	}

	applyForce(force){
		this.acc.add(force);
	}

	show(force) {
		this.acc.add(force);
	}

	show() {
		stroke(200);
		point(this.pos.x, this.pos.y);
	}

	edges() {
		if (this.pos.x > width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = width;
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.y < 0) this.pos.x = width;
	}
}