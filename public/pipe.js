function Pipe() {
	this.top = random(height/2) - 32;
	this.bottom = random(height/2) - 32;
	this.x = width;
	this.w = 20;
	this.speed = 3;

	this.highlight = 0;

	this.hits = function(bird) {
		if (bird.y-bird.size/3 < this.top || bird.y+bird.size/3 > height - this.bottom)  {
 			if (bird.x+bird.size/3 > this.x && bird.x+bird.size/3 < this.x + this.w) {
				if (bird.color == 0) {
					this.highlight = 1;
				} else {
					this.highlight = 2;
				}
				return true;
 			}
		}
		this.highlight = 0;
		return false;
	}

	this.show = function() {
		fill(255);
		if (this.highlight == 1) {
			fill(245, 20, 20);
		} else if (this.highlight == 2) {
			fill(20, 245, 20);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offscreen = function() {
		return (this.x < -this.w);
	}
}