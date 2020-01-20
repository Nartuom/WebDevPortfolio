var canvas = document.querySelector("canvas");

var innerWidth = window.innerWidth;
var innerHeight= window.innerHeight;
// no need for a resize event listener.
function renderLoop(){
    // innerWidth / height or containor size
    if(canvas.width !== innerWidth || canvas.height !== innerHeight){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }    
    // your code
    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);


var ctx = canvas.getContext("2d");

var x = 500;
var y = 800;
var dx;
var dy = -2;

function circles(x, y) {
	this.x = x;
	this.y = y;
	this.draw = function() {

	}
}

function draw(ctx) {
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	ctx.beginPath();
   	ctx.arc(x, y, 10, 0, Math.PI *2, false);
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	ctx.fill()	
	ctx.stroke();
	if(y < 200){
		dy = -dy;
		console.log(y, dy);
	}
	if(y > 800){
		dy = -2;
	}
	y += dy;
	x + 20;
}
var dotsArr =[];
for(var i =0; i <20; i++){
	dotsArr.push(new draw(ctx));
}

function animate(){
	requestAnimationFrame(animate);
	draw(ctx);
}
animate();




	 