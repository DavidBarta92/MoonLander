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

var star = [{
    x: 2,
    y: 0
}];

class Crater {
    constructor() {
      this.top = Math.random() * height/2.5 + 30;
      this.bottom = Math.random() * height/2.5 + 30;
      this.color =`hsl(${hue}, 100%, 50%)`;
      this.width = 30;
      this.x = width;
      this.counted = false
    }    
    
    draw() {
      context.fillStyle = this.color;
      context.fillRect(this.x, 0, this.width, this.top);
      context.fillRect(this.x, height - this.bottom , this.width, this.bottom);
    }
    
    update() {
      this.x -= speed;
      if(!this.counted && this.x + this.width > bird.x) {
        score++;
        this.counted = true;
      }
      this.draw()
    }
  }

  const handleCrater = () => {
    if(frame % 100 === 0) {
    craterArray.unshift(new Obstacle)
    }
    for(let i = 0; i < craterArray.length; i++) {
      craterArray[i].update()
    }
    if(craterArray.length > 20) {
      craterArray.pop()
    }
  }

function drawStar(i){
    context.save();
    context.beginPath();
    context.arc(document.getElementById("game").innerHTML = star[i].x, document.getElementById("game").innerHTML = star[i].y, Math.random() * 2, 0, 2*Math.PI);
    context.fillStyle = star.color;
    context.fill();
    context.closePath();

    context.restore();
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
        context.moveTo(50, 0);
        context.lineTo(50, 25);
        context.lineTo(70 + Math.random() * 5, 12.5);
        context.lineTo(50, 0);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }

    if(spaceship.moveRight)
    {
        context.beginPath();
        context.moveTo(-50, 0);
        context.lineTo(-50, 25);
        context.lineTo(-70 - Math.random() * 5, 12.5);
        context.lineTo(-50, 0);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    
    context.restore();
}

function updateStar(){
    for(var i = 0; i < star.length; i++){
        document.getElementById("game").innerHTML = star[i].x++;
    }
}

var gravity = 0.01;

function updateSpaceship()
{
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y += spaceship.velocity.y;
    if(spaceship.moveRight)
    {
        spaceship.angle += Math.PI / 1800;
    }
    else if(spaceship.moveLeft)
    {
        spaceship.angle -= Math.PI / 1800;
    }
    if(spaceship.engine1On)
    {
        spaceship.velocity.x -= 0.015 * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= 0.015 * Math.cos(spaceship.angle);
        spaceship.angle -= Math.PI / 800;
    }
    if(spaceship.engine2On)
    {
        spaceship.velocity.x -= 0.015 * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= 0.015 * Math.cos(spaceship.angle);
        spaceship.angle += Math.PI / 800;
    }
    spaceship.velocity.y += gravity
}

var frame = 0;

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    frame++;

    updateSpaceship();
    drawSpaceship();

    for(var i = 0; i < star.length; i++){
    
        star[i].x--;

        if( star.length % 150 == 0){
            star.push({
                x : 2,
                y : Math.random() * 2
            }); 
        }

        context.fillStyle = "#fff";
        context.font = "20px Verdana";
        context.fillText("Frame : "+i,300,canvas.height-20);
    }

    //for(var i = 0; i < star.length; i++){
    //    canvas.drawStar(star[i].position.x,star[i].position.y);
    //         
    //    star[i].x--;
    //}

    context.fillStyle = "#fff";
    context.font = "20px Verdana";
    context.fillText("Frame : "+star.length,10,canvas.height-20);

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

if(!spaceship.crashed){
    draw();
}