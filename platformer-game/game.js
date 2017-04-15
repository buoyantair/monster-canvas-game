// Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 600;
document.body.appendChild(canvas);

var player = {
  x : 100,
  y : 450,
  speed: 10
}

function drawSky(){
  ctx.fillStyle = '#8CDAFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLand(){
  ctx.fillStyle = '#3E7057'
  ctx.fillRect(0, 500, canvas.width, 100);
}

function drawPlayer(){
  ctx.fillStyle = "#FFF"
  ctx.fillRect(player.x, player.y, 50, 50);
}


var keysDown = {};

addEventListener('keydown', function(e){
  keysDown[e.keyCode] = true;
}, false)

addEventListener('keyup', function(e){
  delete keysDown[e.keyCode]
}, false)

var jump = function(){
  for(var i =0; i < 100; i++){
    player.y--;
  }

}

var update = function(){
  if(38 in keysDown){
    // Jump
    jump();
  }
  if(37 in keysDown){
    // Left
    player.x -= player.speed;
  }
  if(39 in keysDown){
    // Right
    player.x += player.speed;
  }

  if(player.x > canvas.width){
    player.x = 0;
  } else if (player.x < 0){
    player.x = canvas.width;
  } 
}

var main = function(){
  drawSky();
  drawLand();
  update();
  drawPlayer();
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();
