var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.beginPath();
context.rect(0, 0, 100, 100);
//context.fillStyle = "black";
context.strokeStyle = "green";
context.stroke();
//context.fill();


context.beginPath();
context.arc(100, 100, 20, 0, 2*Math.PI);
context.fillStyle = "black";
context.fill();

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.moveTo(100, 100);
context.lineTo(200, 100);
context.lineTo(100, 200);
context.lineTo(100, 100);

context.fillStyle = "black";
context.fill();


//context.clearRect(0,0,150,150);