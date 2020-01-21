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


function circles(x, y, dy, f, fall,spd) {
	this.x 	= x;
	this.y 	=  y;
	this.dy = dy;
	this.spd = spd ;
	this.draw = function() {
		ctx.beginPath();
		ctx.globalAlpha = f;
   		ctx.arc(this.x, this.y, 2, 0, Math.PI *2, false);
		ctx.strokeStyle = "rgba(68, 151, 141, 1)";
		ctx.fillStyle = "rgba(68, 151, 141, 1)";
		ctx.fill()
		ctx.shadowColor = "rgba(68, 151, 141, 1)";
		ctx.shadowBlur = 5; 	
		ctx.stroke();
		
	}
	this.update = function(){
		if((this.y < maxY)&&(this.falling == true)){
			this.dy = this.spd;
			this.falling = true;
		}
		if(this.y < minY){
			this.dy = this.spd;
			this.falling = true;
		}
		if(this.y > maxY){
			this.dy = -1 * 2;
			this.falling = false;
			minY = 200;
	
		}
		this.y += this.dy;
		this.draw();
	}
}

var dotsArr =[]
var minY = 100;
var maxY = 800;
var ctx = canvas.getContext("2d");
var fall =true;
var inc = 50;
var fade  = 0.01;

for(var i = 0; i < 350; i++){
	var start = innerWidth/3;
	var dy = (Math.random() * 3);
	var spd = dy;
	var y = Math.floor(Math.random() * (700 - 200 + 1)+ 300);
	var x = Math.floor(start + inc);
	
	dotsArr.push(new circles(x, y, dy, fade, fall, spd));
	inc  = inc + Math.random() * 5 + 1;
	if(fade <1){
		fade = fade + 0.005;
	}	
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i =0; i < dotsArr.length; i++){
		dotsArr[i].update();
	}
}
animate();




	 