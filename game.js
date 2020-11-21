var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var x = 0;

function draw() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.arc(x, 100, 25, 0, 2*Math.PI);
  context.fillStyle = "black";
  context.fill();

  x = x + 1;

  if (x > canvas.width) x = 0;

  requestAnimationFrame(draw);
}

draw();