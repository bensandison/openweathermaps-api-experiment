function Particle() {
	this.pos = createVector(random(width), random(height));	//position
	this.vel = p5.Vector.random2D();	//velocity
	this.acc = createVector(0, 0);	//acceleration

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);	//reset acceleration
	}

this.applyForce = function(force){
	this.acc.add(force);
}

this.show = function(force) {
	this.acc.add(force);
}

this.show = function() {
	stroke(200);
	point(this.pos.x, this.pos.y);
}

this.edges = function() {
	if (this.pos.x > width) this.pos.x = 0;
	if (this.pos.x < 0) this.pos.x = width;
	if (this.pos.y > height) this.pos.y = 0;
	if (this.pos.y < 0) this.pos.x = width;
}

}