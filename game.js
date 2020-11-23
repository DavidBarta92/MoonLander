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
    angle: 0,
    velocity:
    {
        x: 0,
        y: 0
    },
    engine1On: false,
    engine2On: false,
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

    if(spaceship.engine1On)
    {
        context.beginPath();
        context.moveTo(25, 25);
        context.lineTo(50, 25);
        context.lineTo(37.5, 40 + Math.random() * 5);
        context.lineTo(25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    
    if(spaceship.engine2On)
    {
        context.beginPath();
        context.moveTo(-25, 25);
        context.lineTo(-50, 25);
        context.lineTo(-37.5, 40 + Math.random() * 5);
        context.lineTo(-25, 25);
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

var gravity = 0.01;

function updateSpaceship()
{
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y += spaceship.velocity.y;
    if(spaceship.moveRight)
    {
        spaceship.angle += Math.PI / 180;
    }
    else if(spaceship.moveLeft)
    {
        spaceship.angle -= Math.PI / 180;
    }
    if(spaceship.engine1On)
    {
        spaceship.velocity.x -= 0.015 * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= 0.015 * Math.cos(spaceship.angle);
        spaceship.angle -= Math.PI / 180;
    }
    if(spaceship.engine2On)
    {
        spaceship.velocity.x -= 0.015 * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= 0.015 * Math.cos(spaceship.angle);
        spaceship.angle += Math.PI / 180;
    }
    spaceship.velocity.y += gravity
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSpaceship();


    drawSpaceship();

    requestAnimationFrame(draw);
}

function keyLetGo(event)
{
    console.log(spaceship);
    switch(event.keyCode)
    {
        case 37:
            spaceship.moveLeft = false;
            break;
        case 39:
            spaceship.moveRight = false;
            break;
        case 88:
            spaceship.engine1On = false;
            break;
        case 90:
            spaceship.engine2On = false;
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
            spaceship.moveLeft = true;
            break;
        case 39:
            spaceship.moveRight = true;
            break;
        case 88:
            spaceship.engine1On = true;
            break;
        case 90:
            spaceship.engine2On = true;
            break;
    }
}

document.addEventListener('keydown', keyPressed);

draw();