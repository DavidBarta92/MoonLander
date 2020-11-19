<canvas id="gc" width="400" height="400"></canvas>
  window.onload=function(){
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    documet.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);
  }
  px=py=10;
  gs=tc=20;
  ax=ay=15;
  xy=yv=0;
  function game() {
    px+=xv;
    py+=yv;
    if(px<0){
      px= tc-1;
    }
    if(px>tc-1){
      px= 0;
    }
    if(px<0){
      py= tc-1;
    }
    if(py>tc-1){
      py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";
    for(var i=0; i<trail.lenghth;i++){
      ctx.fillRect((trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
      if(trail[i].x==px && trail[i].y==py){
        tail = 5;
      }
    }

    ctx.fillStyle="red";
    ctx.fillRect(ax*gs, ay*gs, gs-2);
  }
  function keyPush(evt){
      SVGSwitchElement(evt,keyCode){
        case 37:
          xv=-1;yv=0;
          break;
        case 38:
          xv=0;yv=-1;
          break;
        case 39:
          xv=1;yv=0;
          break;
        case 40:
          xv=0;yv=1;
          break;

      }
  }