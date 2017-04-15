// Creating canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas)

// Background images
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
  bgReady = true;
}
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
  heroReady = true;
}
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
  monsterReady = true;
}
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
  speed: 256,
  x: 0,
  y: 0
}

var monster = {
  x: 0,
  y: 0
}

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e){
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
  delete keysDown[e.keyCode];
}, false);

// Reset game if player catches monster
var reset = function(){
  hero.x = canvas.width/2;
  hero.y = canvas.height/2;

  // Throw the monster on screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}

// Update game objects
var update = function(modifier){
  if(38 in keysDown){
    // Up
    hero.y -= hero.speed * modifier;
  }
  if(40 in keysDown){
    // Down
    hero.y += hero.speed * modifier;
  }
  if(37 in keysDown){
    // Left
    hero.x -= hero.speed * modifier;
  }
  if(39 in keysDown){
    // Right
    hero.x += hero.speed * modifier;
  }
  if(hero.x > canvas.width){
    hero.x = 0;
  } else if(hero.y > canvas.height){
    hero.y = 0;
  } else if (hero.x < 0){
    hero.x = canvas.width;
  } else if(hero.y < 0){
    hero.y = canvas.height;
  }
  if(
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ){
    ++monstersCaught;
    reset();
  }
};


// Rendering objects
var render = function(){
  if(bgReady){
    ctx.drawImage(bgImage, 0,0);
  }

  if(heroReady){
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if(monsterReady){
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Score
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseLine = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 32,32);
}

// Game loop
var main = function(){
  var now = Date.now();
  var delta = now - then;

  update(delta/1000);
  render();
  then = now;

  // Request to do this game Asap
  requestAnimationFrame(main);
};


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
