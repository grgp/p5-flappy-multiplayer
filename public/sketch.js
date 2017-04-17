var socket;
var bird;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  background(0);

  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('key',
    // When we receive data
    function(data) {
      console.log("Got: " + data.fc);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );

  bird = new Bird();
	pipes.push(new Pipe());
}

function draw() {
  background(30);

	for (var i = pipes.length-1; i >= 0; i--) {
		pipes[i].show();
		pipes[i].update();

		if (pipes[i].hits(bird)) {
			console.log("HIT");
			bird.size++;
		}

		if (pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}
	}

	bird.update();
	bird.show();

	if (frameCount % 60 == 0) {
		pipes.push(new Pipe());
	}
}

function keyPressed() {
	if (key == ' ') {
    console.log("SPACE");
		bird.up();
    sendKey(frameCount);
	}
}

// function mouseDragged() {
//   // Draw some white circles
//   fill(255);
//   noStroke();
//   ellipse(mouseX,mouseY,20,20);
//   // Send the mouse coordinates
//   sendmouse(mouseX,mouseY);
// }

function sendKey(frameCount) {
  console.log("send key: " + frameCount);

  var data = {
    fc: frameCount
  };

  socket.emit('key', data);
}

// Function for sending to the socket
// function sendmouse(xpos, ypos) {
//   // We are sending!
//   console.log("sendmouse: " + xpos + " " + ypos);
  
//   // Make a little object with  and y
//   var data = {
//     x: xpos,
//     y: ypos
//   };

//   // Send that object to the socket
//   socket.emit('mouse',data);
// }
