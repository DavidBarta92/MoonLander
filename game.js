const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const width = 1000;
const height = 569;

canvas.height = height;
canvas.width = width;

let angle = 0;
let frame = 0;
var timer = 0;
let hue = 0;
let score = 0;
let win = false;
var speed = 17;
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

const surface = () => {
  context.moveTo(-25, -50);
    context.lineTo(-50, 0);
    context.fillRect(100,100,this.width,this.height);
}

class Spaceship {
  constructor() {
    this.x = 400;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.angle = 0;
    this.width = 100;
    this.height = 100;
    this.weight = 0.1;
    this.color = "black";
    this.engine1On = false;
    this.engine2On = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.fuel = 100;
    this.oxygen = 100;
    this.crashed = 10;
    this.destroyed = false;
  }

  update() {
    if(this.y > height - (this.height * 2)) {
      if(speed <= 1 && this.angle < 0.01 && this.angle > -0.01 && this.oxygen > 0){
        handleWin();
      }
      else{
        handleGameOver();
      }
      this.y = height - (this.height * 2);
      this.vy = 0;
      speed = 0;
    } else {
      this.vy += ((17-speed)/20) + this.weight;
      this.vy *= 0.8;
      this.y += this.vy;
      this.vx = 0;
      this.x += this.vx;
    }
    if(this.angle > 0.3 || this.angle < -0.3){
      if(this.angle > 0.3){
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle += Math.PI / 200;
        this.x += this.vx;
        this.y += this.vy*1.5;
        speed +=0.2;
        this.vy *= 1.3;
      } else {
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle -= Math.PI / 400;
        this.x += this.vx;
        this.y += this.vy*1.5;
        speed -=0.2;
        this.vy *= 1.1;
      }
    }
    if(this.y < this.height) {
      this.y = this.height;
      this.vy = 0;
    }
    if(this.engine1On && this.y > this.height * 2) {
      this.engine1Works()
    }
    if(this.engine2On && this.y > this.height * 2) {
      this.engine2Works()
    }
    if(this.moveLeft && this.y > this.height * 2) {
      this.slowDown()
    }
    if(this.moveRight && this.y > this.height * 2) {
      this.speedUp()
    }
  }
  
  draw() {
    context.save();
    context.beginPath();
    context.translate(spaceship.x, spaceship.y);
    context.rotate(this.angle);
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
    context.fillStyle = "white";
    context.fill();
    //context.lineWidth = 5;
    //context.strokeStyle = "white";
    //context.stroke();
    context.closePath();

    context.fillStyle = "red";
    context.fillRect(this.x/8, this.y*2, 5, 5);
    context.lineWidth = 5;
    context.strokeStyle ="white";
    /*context.fillRect(this.x,this.y,this.width,this.height);


    
    context.closePath();*/

    //context.save();
    //context.beginPath();
    //context.translate(spaceship.x, spaceship.y);
    //context.rotate(spaceship.angle)
    /*context.strokeRect(this.x,this.y, spaceship.width/2, spaceship.height/4);
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
    context.closePath();*/

    if(this.engine1On && this.fuel > 0)
    {
        this.fuel -= 0.2;
        context.beginPath();
        context.moveTo(25, 25);
        context.lineTo(50, 25);
        context.lineTo(37.5, 40 + Math.random() * 5);
        context.lineTo(25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    
    if(this.engine2On && this.fuel > 0)
    {
        this.fuel -= 0.2;
        context.beginPath();
        context.moveTo(-25, 25);
        context.lineTo(-50, 25);
        context.lineTo(-37.5, 40 + Math.random() * 5);
        context.lineTo(-25, 25);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }

    if(this.moveLeft && this.fuel > 0)
    {
        this.fuel -= 0.3;
        context.beginPath();
        context.moveTo(50, 0);
        context.lineTo(50, 25);
        context.lineTo(70 + Math.random() * 5, 12.5);
        context.lineTo(50, 0);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }

    if(this.moveRight && this.fuel > 0)
    {
        this.fuel -= 0.3;
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
    if(this.fuel > 0){
      this.vx += 0.015 * Math.sin(-this.angle);
      this.vy += 0.015 * Math.cos(this.angle);
      this.angle -= Math.PI / 800;
      this.x -= this.vx;
      this.y -= this.weight*5;
    }
  }

  engine2Works() {
    if(this.fuel > 0){
      this.vx += 0.015 * Math.sin(-this.angle);
      this.vy += 0.015 * Math.cos(this.angle);
      this.angle += Math.PI / 800;
      this.x -= this.vx;
      this.y -= this.weight*5;
    }
  }

  speedUp() {
    if(this.fuel > 0){
      if(speed < 17){
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle += Math.PI / 600;
        speed += 0.2;
      }
    }
  }

  slowDown() {
    if(this.fuel > 0){
      if(speed > 0.2){
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle -= Math.PI / 600;
        speed -= 0.2;
      }
    }
  }
}

const spaceship = new Spaceship()

const particleArray = [];
class Particle {
  constructor() {
    this.x = spaceship.x;
    this.y = spaceship.y;
    this.size = Math.random() * 3;
    this.speedY = (Math.random() * 1) - 0.2;
    this.color = "#ADD8E6";

  } 
  update() {
    if(speed>1){
      this.x -= speed;
      this.y += this.speedY
    }else{
      if(Math.random() > 0.6){
        this.x += 0.5;
        this.y += this.speedY
      }
    }
  }
  draw () {
    if(spaceship.crashed < 8){
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x,this.y,this.size,0,Math.PI * 2);
      context.fill()
    }
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
}

const obstacleArray =[];

class Obstacle {
  constructor() {
    this.angleX = 0;
    this.angleY = 0;
    this.color ="white";
    this.bottom = 70;
    this.width = 80;
    this.x = width;
    this.y = height - (spaceship.height * 2) + Math.random() * 60;
  }   
  
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.bottom);
    context.fillStyle = "red";
    context.fillRect(this.x, this.y , 5, 5);
  }

  paint() {
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y, this.width, this.bottom);
  }
  
  update() {
    this.x -= speed;
    this.draw()
  }
}

var now = 0;

function getSec() {
  now += new Date() / 1000 | 0;
}

const handleObstacle = () => {
  if(frame % (20-speed | 0) === 0) {
    if(speed >= 10 && Math.random() > 0.8){
      obstacleArray.unshift(new Obstacle)
    }
    else if(speed < 10 && Math.random() > 0.6){
      obstacleArray.unshift(new Obstacle)
    }
  }
  for(let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].update()
  }
  if(obstacleArray.length > 200) {
    obstacleArray.pop()
  }
}

const handleCollision = () => {
  for(let i =0; i< obstacleArray.length; i++) {
    if(spaceship.y*1.1 >= obstacleArray[i].y
      && spaceship.x/10 > obstacleArray[i].x - spaceship.x
      && spaceship.x/10 < obstacleArray[i].x+obstacleArray[i].width - spaceship.x) {
        obstacleArray[i].paint();
      handleCrash();
      return
    }
  }
}

const handleSurface = () => {
  context.strokeStyle = 'white';
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(0, height - (spaceship.height * 2));
  context.lineTo(canvas.width, height - (spaceship.height * 2));
  context.stroke();
}

const handleStat = () => {
  /*context.strokeStyle = 'red';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.stroke();*/
  context.fillStyle = "blue";
  context.font = "20px Verdana";
  context.fillText("Fuel:" + spaceship.fuel + " Oxygen: " + spaceship.oxygen,700,20);
  if(speed > 1){
    context.fillStyle = "red";
  } else {
    context.fillStyle = "green";
  }
  context.font = "20px Verdana";
  context.fillText("Speed:" + speed,700,50);
  if(spaceship.angle > 0.2 || spaceship.angle < -0.2){
    context.fillStyle = "red";
  } else {
    context.fillStyle = "green";
  }
  context.font = "20px Verdana";
  context.fillText("Angle:" + spaceship.angle,700,80);
}

const handleCrash = () => {
  if (spaceship.crashed > 0){
    spaceship.crashed -= 1;
  } else {
    handleGameOver();
  }
}

const handleGameOver = () => {
  isOver = true;
  context.fillStyle = "red";
  context.fillText("Game over", width * 50/100 , height * 50/100)
}

const handleWin = () => {
  isOver = true;
  context.fillStyle = "orange";
  context.fillText("Win", width * 50/100 , height * 50/100)
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

const animate = () => {
  context.clearRect(0, 0, width, height);
  
  handleSurface();
  getSec();
  handleObstacle();
  handleCollision();
  spaceship.update();
  spaceship.draw();
  if(spaceship.crashed < 8){
    handleParticle();
  }
  handleStat();
  timer++;

  if(!isOver) {
  requestAnimationFrame(animate);
  }
  angle += 0.15;
  hue++;
  frame++;
};

animate();               