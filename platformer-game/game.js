// Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 700;
document.body.appendChild(canvas);

function renderBackground() {
  var img = new Image();
  img.onload = function() {
    var patrn = ctx.createPattern(img, "repeat");
    ctx.fillStyle = patrn;
    ctx.fillRect(0,0, canvas.width, canvas.height);
  };
  img.src = 'images/tiles/Backgrounds/blue_land.png';
}


renderBackground();
