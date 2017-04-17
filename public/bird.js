function Bird(color) {
	this.color = -1;
	
	if (color == 0)
		this.color = 0;
	else
		this.color = 1;

	this.y = height/2;
	this.x = 50;
	this.size = 32;

	this.gravity = 0.6 * 0.6;
	this.lift = -15 * 0.6;
	this.velocity = 0;

	this.show = function() {
		if (this.color == 0)
			fill(255);
		else
			fill(255, 60, 60);
		ellipse(this.x, this.y, this.size, this.size);
	}

	this.up = function() {
		this.velocity += this.lift;
	}

	this.update = function() {
		this.velocity += this.gravity;
		this.velocity *= 0.96;
		this.y += this.velocity;

		if (this.y > height) {
			this.y = height;
			this.velocity = 0;
		}

		if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}
}