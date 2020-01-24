var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
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

//Variables
var dotsArr =[]

var minY = 100;
var maxY = 800;
var start = innerWidth/3;
var fall =true;
var inc = 50;
var f  = 0.01;
var size = 0.5

//circle Styles
var green = "rgba(68, 151, 141, 1)"

function circles(x, y, dy, f,spd,) {
	this.x 	= x;
	this.y 	=  y;
	this.dy = dy;
	this.spd = spd ;
	fall = true;
	this.draw = function() {
		ctx.beginPath();
		ctx.globalAlpha = f;
   		ctx.arc(this.x, this.y, size, 0, Math.PI *2, false);
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
			this.dy = -this.spd;
			this.falling = false;	
		}
		this.y += this.dy;
		this.draw();
	}
}


for(let i = 0; i < 350; i++){
	let x = Math.floor(start + inc);
	let dy = (Math.random() * 2);
	let spd = dy;
	let y = Math.floor(Math.random() * (700 - 100 + 1)+ 100);
	
	dotsArr.push(new circles(x, y, dy, f, fall, spd));
	inc  = inc + Math.random() * 5 + 1;
	if(f <1){
		f = f + 0.005;
	}	
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < dotsArr.length; i++){
		dotsArr[i].update();
	}
}
animate();


