const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const width = 1000;
const height = 569;

canvas.height = height;
canvas.width = width;

let angle = 0;
let frame = 0;
let hue = 0;
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

class Spaceship {
  constructor() {
    this.x = 400;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.angle = 0;
    this.width = 100;
    this.height = 100;
    this.weight = 0.05;
    this.color = "black";
    this.engine1On = false;
    this.engine2On = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.fuel = 200;
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
    if(!this.destroyed){
      context.save();
      context.beginPath();
      context.translate(spaceship.x, spaceship.y);
      context.rotate(this.angle);
      context.rect(-25, -50, spaceship.width/2, spaceship.height/2);
      context.moveTo(-25, -50);
      context.lineTo(-50, 0);
      context.lineTo(-25, 0);
      context.lineTo(-25, -50);
      context.moveTo(25, -50);
      context.lineTo(50, 0);
      context.lineTo(25, 0);
      context.lineTo(25, -50);
      context.fillStyle = "white";
      context.fill();
      context.closePath();
      var gradient = context.createLinearGradient(-20,this.angle*200, 100,0);
      gradient.addColorStop(0, '#FBFF87');
      gradient.addColorStop(.5, 'orange');
      gradient.addColorStop(1, 'gold');
      context.beginPath();
      context.rect(-25, 0, spaceship.width/2, spaceship.height/4);
      context.rect(-50, 0, spaceship.width/4, spaceship.height/4);
      context.rect(25, 0, spaceship.width/4, spaceship.height/4);
      context.rect(-25, 25, spaceship.width/4, spaceship.height/4);
      context.rect(0, 25, spaceship.width/4, spaceship.height/4);
      context.fillStyle = gradient;
      context.fill();
      context.closePath();
      context.fillStyle = "#2B1B17";
      context.fillRect(-10.5,-25, spaceship.width/4-2, spaceship.height/4-2);

      context.fillStyle = "black";
      context.fillRect(-3.125,0, spaceship.width/16, spaceship.height/2+25);
      context.fillStyle = "black";
      context.fillRect(-75,0, spaceship.width*1.5, spaceship.height/16);
      context.fillStyle = "black";
      context.fillRect(50,0, spaceship.width/16, spaceship.height/4);
      context.fillStyle = "black";
      context.fillRect(-75,0, spaceship.width/16, spaceship.height/2+25);
      context.fillStyle = "black";
      context.fillRect(69,0, spaceship.width/16, spaceship.height/2+25);

      if(this.engine1On && this.fuel > 0 && this.oxygen > 0)
      {
          this.fuel -= 0.2;
          context.beginPath();
          context.moveTo(25, 25);
          context.lineTo(50, 25);
          context.lineTo(37.5, 40 + Math.random() * 5);
          context.lineTo(25, 25);
          context.closePath();
          context.fillStyle = "#F0FFFF";
          context.fill();
      }
    
      if(this.engine2On && this.fuel > 0 && this.oxygen > 0)
      {
          this.fuel -= 0.2;
          context.beginPath();
          context.moveTo(-25, 25);
          context.lineTo(-50, 25);
          context.lineTo(-37.5, 40 + Math.random() * 5);
          context.lineTo(-25, 25);
          context.closePath();
          context.fillStyle = "#F0FFFF";
          context.fill();
      }

      if(this.moveLeft && this.fuel > 0 && this.oxygen > 0)
      {
          this.fuel -= 0.3;
          context.beginPath();
          context.moveTo(50, 0);
          context.lineTo(50, 25);
          context.lineTo(70 + Math.random() * 5, 12.5);
          context.lineTo(50, 0);
          context.closePath();
          context.fillStyle = "#F0FFFF";
          context.fill();
      }

      if(this.moveRight && this.fuel > 0 && this.oxygen > 0)
      {
          this.fuel -= 0.3;
          context.beginPath();
          context.moveTo(-50, 0);
          context.lineTo(-50, 25);
          context.lineTo(-70 - Math.random() * 5, 12.5);
          context.lineTo(-50, 0);
          context.closePath();
          context.fillStyle = "#F0FFFF";
          context.fill();
      }
      context.fillStyle = "black";
      context.fillRect(25,25, spaceship.width/4, spaceship.height/16);
      context.fillStyle = "black";
      context.fillRect(-50,25, spaceship.width/4, spaceship.height/16);
      context.fillStyle = "black";
      context.fillRect(50,0, spaceship.width/16, spaceship.height/4);
      context.fillStyle = "black";
      context.fillRect(-56.25, 0, spaceship.width/16, spaceship.height/4);
    }
    
    context.restore();
  }
  
  engine1Works() {
    if(this.fuel > 0 && this.oxygen > 0){
      this.vx += 0.015 * Math.sin(-this.angle);
      this.vy += 0.015 * Math.cos(this.angle);
      this.angle -= Math.PI / 800;
      this.x -= this.vx;
      this.y -= ((17-speed)/2) + this.weight;
    }
  }

  engine2Works() {
    if(this.fuel > 0 && this.oxygen > 0){
      this.vx += 0.015 * Math.sin(-this.angle);
      this.vy += 0.015 * Math.cos(this.angle);
      this.angle += Math.PI / 800;
      this.x -= this.vx;
      this.y -= ((17-speed)/2) + this.weight;
    }
  }

  speedUp() {
    if(this.fuel > 0 && this.oxygen > 0){
      if(speed < 17){
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle += Math.PI / 600;
        speed += 0.2;
      }
    }
  }

  slowDown() {
    if(this.fuel > 0 && this.oxygen > 0){
      if(speed > 0.2){
        this.vx += 0.015 * Math.sin(-this.angle);
        this.vy += 0.015 * Math.cos(this.angle);
        this.angle -= Math.PI / 600;
        speed -= 0.2;
      }
    }
  }
}

const explosionArray = [];
class Explosion {
  constructor(i) {
    this.x = spaceship.x;
    this.y = spaceship.y;
    this.size = Math.random() * 4;
    this.speedY = (Math.random() * 1) - 1.2;
    this.color = "black";
    this.id = i;
  } 
  update() {
    if(this.id % 2 === 0){
      this.x += 10.5;
      this.y += this.speedY;
    } 
    else if (this.id % 5 === 0) {
      this.x -= 10.5;
      this.y += this.speedY;
    }
    else {
      this.x -= 6.5;
      this.y -= this.speedY
    }
  }

  createExplosion() {
    const colorArray = ["red", "white", "gold", "red", "white", "gold"];
    if(explosionArray.length < 6){
      context.fillStyle = colorArray[explosionArray.length];
      context.beginPath();
      context.arc(this.x,this.y,100,0,Math.PI * 2);
      context.fill()
    }
  }

  draw () {
    if(spaceship.destroyed){
      this.createExplosion();
      if(this.id % 5 === 0){
        if(this.id % 10 === 0){
          context.fillStyle = "gold";
          context.beginPath();
          context.rect(this.x-20,this.y+10, spaceship.width/2, spaceship.height/4);
          context.rect(this.x,this.y, spaceship.width/2, spaceship.height/4);
          context.fill()
        } else {
          context.fillStyle = "white";
          context.beginPath();
          context.rect(this.x-20,this.y, spaceship.width/4, spaceship.height/4);
          context.fill()
        }
      } else {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x-20,this.y,this.size,0,Math.PI * 2);
        context.fill()
      }
    }
  }
}

const handleExplosion = () => {
  if(explosionArray.length < 10){
  explosionArray.unshift(new Explosion(explosionArray.length));
  }
  for(let i =0; i< explosionArray.length; i++) {
      explosionArray[i].update();
      explosionArray[i].draw()
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
    this.angleX1 = width + Math.random() * 60;
    this.angleY1 = height - (spaceship.height) + Math.random() * 60;
    this.angleX2 = width;
    this.angleY2 = height; //not used
    this.angleX3 = width + 30 + Math.random() * 60;
    this.angleY3 = height - (spaceship.height) + Math.random() -40;
    this.angleX4 = width + 40 + Math.random() * 60;
    this.angleY4 = height - (spaceship.height) + Math.random() * 40;
    this.color ="gray";
    this.bottom = 70;
    this.width = 80;
    this.x = width + Math.random() * 30;
    this.y = height - (spaceship.height * 2) + Math.random() * 60;
  }   
  
  draw() {
    var gradient = context.createLinearGradient(-50,200, 320,-150);
      gradient.addColorStop(0, "#696969");
      gradient.addColorStop(.5, "#808080");
      gradient.addColorStop(1, "#696969");
      context.save();
      context.beginPath();
      context.rotate(this.angle);
      context.moveTo(this.x, this.y);
      context.lineTo(this.angleX2, this.y+this.bottom);
      context.lineTo(this.angleX3, this.angleY3);
      context.lineTo(this.x, this.y);
      context.fillStyle = gradient;
      context.fill();
      context.closePath();
      context.beginPath();
      context.fillStyle = "#5F5F5F";
      context.moveTo(this.angleX3, this.angleY3);
      context.lineTo(this.angleX1, this.angleY1);
      context.lineTo(this.angleX2, this.y+this.bottom);
      context.lineTo(this.angleX3, this.angleY3);
      context.moveTo(this.angleX3, this.angleY3);
      context.lineTo(this.angleX1, this.angleY1);
      context.lineTo(this.angleX4, this.angleY4);
      context.lineTo(this.angleX3, this.angleY3);
      context.fill();
      context.closePath();
      context.beginPath();
      context.fillStyle = "#818181";
      context.moveTo(this.x, this.y);
      context.lineTo(this.angleX2, this.y+this.bottom);
      context.lineTo(this.angleX1, this.angleY1);
      context.lineTo(this.x, this.y);
      context.fill();
      context.closePath();
  }

  paint() {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, 2, 2);
  }
  
  update() {
    this.x -= speed;
    this.angleX1 -= speed;
    this.angleX2 -= speed;
    this.angleX3 -= speed;
    this.angleX4 -= speed;
    this.draw()
  }
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
  if(obstacleArray.length > 50) {
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

const starArray =[];

class Star {
  constructor() {
    this.color = "white";
    this.size1 = Math.random();
    this.size2 = Math.random() * 2;
    this.size3 = Math.random() * 2;
    this.size4 = Math.random() * 2.5;
    this.x = width + Math.random() * 30;
    this.y = Math.random() * 60;
    this.x2 = width + Math.random() * 300;
    this.y2 = Math.random() * 80;
    this.x3 = width + Math.random() * 100;
    this.y3 = Math.random() * 200;
    this.x4 = width + Math.random() * 500;
    this.y4 = Math.random() * 400;
  }
  
  draw() {
    var gradient = context.createLinearGradient(-50,200, 320,-150);
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size1, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x2, this.y2, this.size2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x3, this.y3, this.size3, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x4, this.y4, this.size4, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }
  
  update() {
    if(frame > 4){
      this.x -= speed/40;
      this.x2 -= speed/40;
      this.x3 -= speed/40;
      this.x4 -= speed/40;
      this.draw();
    } else {
      this.x -= speed*13;
      this.x2 -= speed*15;
      this.x3 -= speed*20;
      this.x4 -= speed*15;
      this.draw();
    }
  }
}

const handleStars = () => {
  if(starArray.length < 1){

  }
  if(frame % (20-speed | 0) === 0) {
    if(frame < 4){
      for(let i = 0; i < 20; i++) {
        starArray.unshift(new Star)
      }
    }
    else if(speed >= 10 && Math.random() > 0.9){
      starArray.unshift(new Star)
    }
    else if(speed < 10 && Math.random() > 0.7){
      starArray.unshift(new Star)
    }
  }
  for(let i = 0; i < starArray.length; i++) {
    starArray[i].update()
  }
  if(starArray.length > 100) {
    starArray.pop()
  }
}

const handleSurface = () => {
  var gradient = context.createLinearGradient(-100,400, 320,-100);
  gradient.addColorStop(0, "#535353");
  gradient.addColorStop(.5, "#606060");
  gradient.addColorStop(1, "#535353");
  context.fillStyle = gradient;
  context.fillRect(0, height - (spaceship.height * 2), 1000, 300);
}

const rockArray =[];

class Rock {
  constructor() {
    this.size1 = Math.random() * 4;
    this.size2 = Math.random() * 5;
    this.size3 = Math.random() * 6;
    this.size4 = Math.random() * 7.5;
    this.x = width + Math.random() * 30;
    this.y = height - (spaceship.height*2) + Math.random() * 60;
    this.x2 = width + Math.random() * 300;
    this.y2 = height - (spaceship.height*2) + Math.random() * 80;
    this.x3 = width + Math.random() * 100;
    this.y3 = height - (spaceship.height *2) + Math.random();
    this.x4 = width + Math.random() * 500;
    this.y4 = height - (spaceship.height*2) + Math.random() * 200;
  }
  
  draw() {
    var gradient = context.createLinearGradient(-50,200, 320,-150);
    gradient.addColorStop(0, "#373737");
    gradient.addColorStop(.5, "#9C9C9C");
    gradient.addColorStop(1, "#373737");
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size1, Math.PI,1.8*Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x2, this.y2, this.size2, Math.PI,Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x3, this.y3, this.size3, Math.PI,2*Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x4, this.y4, this.size4,1.2 * Math.PI,1.8*Math.PI);
    context.fillStyle = gradient;
    context.fill();
    context.closePath();
  }
  
  update() {
    if(frame > 4){
        this.x -= speed;
        this.x2 -= speed;
        this.x3 -= speed;
        this.x4 -= speed;
        this.draw();
    } else {
      this.x -= speed*13;
      this.x2 -= speed*15;
      this.x3 -= speed*20;
      this.x4 -= speed*15;
      this.draw();
    }
  }
}

const handleRocks = () => {
  if(rockArray.length < 1){

  }
  if(frame % (20-speed | 0) === 0) {
    if(frame < 4){
      for(let i = 0; i < 20; i++) {
        rockArray.unshift(new Rock)
      }
    }
    else if(speed >= 10 && Math.random() > 0.2){
      rockArray.unshift(new Rock)
    }
    else if(speed < 10){
      rockArray.unshift(new Rock)
    }
  }
  for(let i = 0; i < rockArray.length; i++) {
    rockArray[i].update()
  }
  if(rockArray.length > 200) {
    rockArray.pop()
  }
}

const handleStat = () => {
  context.fillStyle = "#2B1B17";
  context.fillRect(0,0, 215, 30);
  if(spaceship.fuel > 25){
    context.fillStyle = "white";
  } else {
    context.fillStyle = "orange";
  }
  context.font = "20px Consolas";
  context.fillText("Fuel " + (spaceship.fuel | 0),5,20);

  
  if(spaceship.oxygen > 25){
    context.fillStyle = "white";
  } else {
    context.fillStyle = "orange";
  }
  context.font = "20px Consolas";
  context.fillText(" Oxygen " + (spaceship.oxygen | 0),100,20);

  context.fillStyle = "#2B1B17";
  context.fillRect(295,0, 98, 50);
  if(speed > 1){
    context.fillStyle = "orange";
    context.fillRect(300,30, 88, 30);
  } else {
    context.fillStyle = "green";
    context.fillRect(300,30, 88, 30);
    context.fillStyle = "white";
  }
  context.font = "20px Consolas";
  context.fillText("Speed " + (speed | 0),300,20);

  context.fillStyle = "#2B1B17";
  context.fillRect(495,0, 310, 50);
  if(spaceship.angle > 0.2 || spaceship.angle < -0.2){
    context.fillStyle = "orange";
    context.fillRect(500,30, 300, 30);
    context.fillStyle = "orange";
  } else if (spaceship.angle < 0.01 && spaceship.angle > -0.01) {
    context.fillStyle = "orange";
    context.fillRect(500,30, 25, 30);
    context.fillStyle = "black";
    context.fillRect(525,30, 100, 30);
    context.fillStyle = "green";
    context.fillRect(625,30, 50, 30);
    context.fillStyle = "black";
    context.fillRect(675,30, 100, 30);
    context.fillStyle = "orange";
    context.fillRect(775,30, 25, 30);
    context.fillStyle = "white";
    context.fillRect(650+spaceship.angle,30, 5, 40);
    context.fillStyle = "white";
  } else {
    context.fillStyle = "green";
    context.fillRect(500,30, 300, 30);
    context.fillStyle = "white";
  }
  context.fillStyle = "white";
    context.fillRect(650+(spaceship.angle*1000),30, 5, 40);
  context.font = "20px Consolas";
  context.fillText("Angle " + spaceship.angle,500,20);
}

const handleCrash = () => {
  if (spaceship.crashed > 0){
    spaceship.crashed -= 1;
  } else {
    handleGameOver();
  }
}

const handleGameOver = () => {
  spaceship.destroyed = true;
  context.fillStyle = "red";
  context.fillText("Game over", width * 50/100 , height * 50/100)
  onclick=location.reload();
}

const handleWin = () => {
  if(!spaceship.destroyed){
    context.fillStyle = "gold";
    context.fillText("Win", width * 50/100 , height * 50/100)
    context.fillText("Your score: " + (spaceship.fuel + spaceship.oxygen), width * 50/100 , height * 50/100)
  }
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

const animate = () => {
  context.clearRect(0, 0, width, height);

  handleStars();
  handleSurface();
  handleRocks();
  handleObstacle();
  handleCollision();
  spaceship.update();
  spaceship.draw();
  if(spaceship.crashed < 8 && !spaceship.destroyed){
    spaceship.oxygen -= 0.05;
    handleParticle();
  }
  else if (spaceship.destroyed){
    handleExplosion();
  }
  spaceship.oxygen -= 0.005;
  handleStat();

  requestAnimationFrame(animate);
  
  angle += 0.15;
  hue++;
  frame++;
};

animate();               