var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var spaceship =
{
    color: "black",
    width: 100,
    height: 100,
    position:
    {
        x: 200,
        y: 200
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    angle: 0,
    engineOn: false,
    moveLeft: false,
    moveRight: false,
    crashed: false
}

function drawSpaceship()
{
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(-25, 0, spaceship.width/2, spaceship.height/4);
    context.rect(-50, 0, spaceship.width/4, spaceship.height/4);
    context.rect(25, 0, spaceship.width/4, spaceship.height/4);
    context.rect(-25, -50, spaceship.width/2, spaceship.height/2);
    context.moveTo(-25, -50);
    context.lineTo(-50, 0);
    context.lineTo(-25, 0);
    context.lineTo(-25, -50);
    context.moveTo(25, -50);
    context.lineTo(50, 0);
    context.lineTo(25, 0);
    context.lineTo(25, -50);
    context.rect(-25, 25, spaceship.width/4, spaceship.height/4);
    context.rect(0, 25, spaceship.width/4, spaceship.height/4);
   // context.lineWidth = 10;
   // context.moveTo(250, -50);
   // context.lineTo(100, 0);
    context.fillStyle = spaceship.color;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "white";
    context.stroke();
    context.closePath();

    // Draw the flame if engine is on
    if(spaceship.engineOn)
    {
        context.beginPath();
        context.moveTo(-25, 25);
        context.lineTo(-50, 25);
        context.lineTo(-37.5, 40 + Math.random() * 5);
        context.lineTo(-25, 25);
        context.moveTo(25, 25);
        context.lineTo(50, 25);
        context.lineTo(37.5, 40 + Math.random() * 5);
        context.lineTo(25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }

    if(spaceship.moveLeft)
    {
        context.beginPath();
        context.moveTo(25, 25);
        context.lineTo(50, 25);
        context.lineTo(37.5, 50);
        context.lineTo(25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }

    if(spaceship.moveRight)
    {
        context.beginPath();
        context.moveTo(25, 25);
        context.lineTo(50, 25);
        context.lineTo(37.5, 50);
        context.lineTo(25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    
    context.restore();
}

function updateSpaceship()
{
    if(spaceship.moveRight)
    {
        spaceship.angle += Math.PI / 180;
    }
    else if(spaceship.moveLeft)
    {
        spaceship.angle -= Math.PI / 180;
    }

    if(spaceship.engineOn)
    {
        spaceship.position.x += Math.sin(spaceship.angle);
        spaceship.position.y -= Math.cos(spaceship.angle);
    }
}


function draw()
{
    // Clear entire screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSpaceship();

    // Begin drawing
    drawSpaceship();
    /* other draw methods (to add later) */

    requestAnimationFrame(draw);
}

function keyLetGo(event)
{
    console.log(spaceship);
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.moveLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.moveRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

function keyPressed(event)
{
    console.log(spaceship);
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.moveLeft = true;
            break;
        case 39:
            // Right Arrow key
            spaceship.moveRight = true;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = true;
            break;
    }
}

document.addEventListener('keydown', keyPressed);

draw();