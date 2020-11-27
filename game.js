const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;

canvas.height = height;
canvas.width = width;


let isSpaceKeyPressed = false;
let angle = 0;
let frame = 0;
let hue = 0;
let score = 0;
let speed = 2;
let isOver = false
const handleKeyDown = event => {
      switch (event.keyCode) {
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
};

const handleKeyUp = event => {
  switch (event.keyCode) {
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
};

class Spaceship {
  constructor() {
    this.x = 500;
    this.y = 100;
    this.vy = 0;
    this.vx = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.angle = 0;
    this.width = 100;
    this.height = 100;
    this.weight = 0.1;
    this.color = "black";
    this.engine1On = false;
    this.engine2On = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.crashed = false;
  }

  update() {
    //let curve = Math.sin(angle) * 2;
    if(this.y > height - (this.height * 2)) {
      /*if(velocity is ok){
        win
      }
      if(velocity is not ok){
        game over
      }*/
      this.y = height - (this.height * 2);
      this.vy = 0;
    }  else {
      this.vy += this.weight;
      this.vy *= 0.8;
      this.y += this.vy;
      this.vx = 0;
      this.x += this.vx;
    }
    if(this.y < this.height) {
      this.y = this.height;
      this.vy = 0;
    }
    if(this.engine1On && this.y > this.height * 2) {
      this.engine1Works()
      //this.vy += this.weight;
    //this.vy *= 0.8;
    //this.y += this.vy;
    this.vx -= Math.sin(-this.angle);
    this.vy -= Math.cos(this.angle);
    this.angle -= Math.PI / 800;
    }

    /*var gravity = 0.01;
    spaceship.x += spaceship.velocityX;
    spaceship.y += spaceship.velocityY;
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
        //spaceship.velocityX -= 0.015 * Math.sin(-spaceship.angle);
       // spaceship.velocityY -= 0.015 * Math.cos(spaceship.angle);
       // spaceship.angle -= Math.PI / 800;
    }
    if(spaceship.engine2On)
    {
        spaceship.velocityX -= 0.015 * Math.sin(-spaceship.angle);
        spaceship.velocityY -= 0.015 * Math.cos(spaceship.angle);
        spaceship.angle += Math.PI / 800;
    }
    spaceship.velocityY += gravity*/
  }
  
  draw() {
    context.fillStyle ="black";
    /*context.fillRect(this.x,this.y,this.width,this.height);

    context.closePath();*/

    context.save();
    context.beginPath();
    context.translate(spaceship.x, spaceship.y);
    context.rotate(this.angle);
    context.fillRect(this.x,this.y, spaceship.width/2, spaceship.height/4);
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
    context.fillStyle = "white";
    context.fill();
    //context.lineWidth = 5;
    //context.strokeStyle = "white";
    //context.stroke();
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle ="white";
    /*context.fillRect(this.x,this.y,this.width,this.height);

    context.closePath();*/

    //context.save();
    //context.beginPath();
    //context.translate(spaceship.x, spaceship.y);
    //context.rotate(spaceship.angle);
    context.strokeRect(this.x,this.y, spaceship.width/2, spaceship.height/4);
    context.strokeRect(-50, 0, spaceship.width/4, spaceship.height/4);
    context.strokeRect(25, 0, spaceship.width/4, spaceship.height/4);
    context.strokeRect(-25, -50, spaceship.width/2, spaceship.height/2);
    context.moveTo(-25, -50);
    context.lineTo(-50, 100);
    context.lineTo(-25, 0);
    context.lineTo(-25, -50);
    context.moveTo(25, -50);
    context.lineTo(50, 0);
    context.lineTo(25, 0);
    context.lineTo(25, -50);
    context.strokeRect(-25, 25, spaceship.width/4, spaceship.height/4);
    context.strokeRect(0, 25, spaceship.width/4, spaceship.height/4);
   // context.lineWidth = 10;
   // context.moveTo(250, -50);
   // context.lineTo(100, 0);
    context.fillStyle = spaceship.color;
    context.fill();
    //context.lineWidth = 5;
    //context.strokeStyle = "white";
    //context.stroke();
    context.closePath();

    if(this.engine1On)
    {
        
        //context.fillStyle = "orange";
        //context.fillRect(this.x,this.y, spaceship.width/2, spaceship.height/4);
        //context.fill();
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
  
  engine1Works() {
    //this.vy += this.weight;
    //this.vy *= 0.8;
    //this.y += this.vy;

    //this.vx -= Math.sin(-this.angle);
    //this.vy -= Math.cos(this.angle);
    //this.angle -= Math.PI / 800;
  }

  engine2Works() {
    this.vx -= Math.sin(-this.angle);
    this.vy -= Math.cos(this.angle);
    this.angle += Math.PI / 800;
  }
}
const spaceship = new Spaceship()

/*const particleArray = [];
class Particle {
  constructor() {
    this.x = spaceship.x;
    this.y = spaceship.y;
    this.size = Math.random() * 5 + 3;
    this.speedY = (Math.random() * 1) - 0.5;
    this.color = `hsla(${hue}, 100%, 50%, 0.8)`;

  } 
  update() {
    this.x -= speed;
    this.y += this.speedY
  }
  draw () {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x,this.y,this.size,0,Math.PI * 2);
    context.fill()
  }
}

const handleParticle = () => {
  particleArray.unshift(new Particle);
  for(let i =0; i< particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw()
  }
  if(particleArray.legth > 201) {
    particleArray.splice(180, 20)
  }
}*/

const obstacleArray =[];

class Obstacle {
  constructor() {
    this.top = 30;
    this.bottom =  30;
    this.color ="white";
    this.width = 30;
    this.x = width;
    this.y = Math.random() * 500;
    this.counted = false
  }    
  
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.top);
    context.fillRect(this.x, height - this.bottom , this.width, this.bottom);
  }
  
  update() {
    this.x -= speed;
    if(!this.counted && this.x + this.width > spaceship.x) {
      score++;
      this.counted = true;
    }
    this.draw()
  }
}

const handleObstacle = () => {
  if(frame % 100 === 0) {
  obstacleArray.unshift(new Obstacle)
  }
  for(let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].update()
  }
  if(obstacleArray.length > 20) {
    obstacleArray.pop()
  }
}

const handleCollision = () => {
  for(let i =0; i< obstacleArray.length; i++) {
    if(spaceship.x + spaceship.width  >= obstacleArray[i].x && spaceship.x <= obstacleArray[i].x + obstacleArray[i].width && (spaceship.y < obstacleArray[i].top  && spaceship.y + spaceship.height > 0 || spaceship.y > height - obstacleArray[i].bottom)) {
      isOver = true;
      context.fillStyle = "black";
      context.fillText(`Game over, Your score is ${score}`, width * 50/100 , height * 50/100)
      return 
    }
  }
}

/*const handleStat = () => {
  context.fillStyle = "#fff";
  context.font = "20px Verdana";
  context.fillText("Frame : "+star.length,100,canvas.height-200);
}*/

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

const animate = () => {
  context.clearRect(0, 0, width, height);
  handleObstacle();
  handleCollision();
  spaceship.update();
  spaceship.draw();
  //handleParticle();
  //handleStat();

  if(!isOver) {
  requestAnimationFrame(animate);
  }
  angle += 0.15;
  hue++;
  frame++;
};

animate();               