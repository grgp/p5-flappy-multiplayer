var socket;
var bird;
var enemy;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  background(0);

  // socket = io.connect('http://localhost:5000');
  socket = io.connect('https://p5jumpy.herokuapp.com');
  
  // event called 'mouse' and write an anonymous callback function
  socket.on('key',
    function(data) {
      // console.log("Got: " + data.fc + ", CF: " + frameCount + ", diff:" + (data.cf-frameCount));
      enemy.y = data.y;
      enemy.up();
      enemy.size = data.size;
    }
  );

  socket.on('hit',
    function(data) {
      console.log("Got enemy's hit: " + data.size);
      enemy.size = data.size;
    }
  );

  socket.on('clean',
    function() {
        pipes = [];
        bird = new Bird(0);
        enemy = new Bird(1);
        pipes.push(new Pipe());
    }
  );

  bird = new Bird(0);
  enemy = new Bird(1);
	pipes.push(new Pipe());
}

function draw() {
  background(30);

	for (var i = pipes.length-1; i >= 0; i--) {
		pipes[i].show();
		pipes[i].update();

		if (pipes[i].hits(bird)) {
      if (bird.color == 0) {
        bird.size += 0.8;
        // frameCount = 0;
        // sendHit(bird.size, frameCount);
      }
		}

		if (pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}
	}

  enemy.update();
	bird.update();
  enemy.show();
  bird.show();

  frameCounter();

	if (frameCount % 5 == 0) {
		pipes.push(new Pipe());
    if (bird.size > 40)
      bird.size -= 0.005 * bird.size;
	}
}

function frameCounter() {
  noStroke();
  fill(255);
  textSize(24);
  text("FC: " + frameCount, 400-140, 600-20);
}

function keyPressed() {
	if (key == ' ') {
    console.log("sendKey " + frameCount);
		bird.up();
    sendKey(frameCount, bird);
	}
}

function mousePressed() {
  console.log("sendKey " + frameCount);
  bird.up();
  sendKey(frameCount, bird);
}

function sendKey(frameCount, bird) {
  console.log("send key: " + frameCount);

  var data = {
    fc: frameCount,
    size: bird.size,
    y: bird.y
  };

  socket.emit('key', data);
}

function sendHit(size, framePos) {
  var data = {
    size: size,
    fp: framePos
  };
  console.log("send hit: " + size);
  socket.emit('hit', data);
}