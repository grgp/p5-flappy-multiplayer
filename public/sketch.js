var socket;
var bird;
var enemy;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  background(0);

  socket = io.connect('http://localhost:3000');
  // event called 'mouse' and write an anonymous callback function
  socket.on('key',
    function(data) {
      console.log("Got: " + data.fc + ", CF: " + frameCount + ", diff:" + (data.cf-frameCount));
      enemy.up();
    }
  );

  bird = new Bird(0);
  enemy = new Bird(1);
	pipes.push(new Pipe());
}

function draw() {
  background(30);

	// for (var i = pipes.length-1; i >= 0; i--) {
	// 	pipes[i].show();
	// 	pipes[i].update();

	// 	if (pipes[i].hits(bird)) {
	// 		console.log("HIT");
	// 		bird.size++;
	// 	}

  //   if (pipes[i].hits(enemy)) {
	// 		console.log("HIT");
	// 		enemy.size++;
	// 	}

	// 	if (pipes[i].offscreen()) {
	// 		pipes.splice(i, 1);
	// 	}
	// }

	bird.update();
  enemy.update();
  bird.show();
  enemy.show();

	if (frameCount % 60 == 0) {
		pipes.push(new Pipe());
	}
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
    sendKey(frameCount);
	}
}

function mousePressed() {
  bird.up();
  sendKey(frameCount);
}

function sendKey(frameCount) {
  console.log("send key: " + frameCount);

  var data = {
    fc: frameCount
  };

  socket.emit('key', data);
}