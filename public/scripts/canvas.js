var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.onmousemove = mouseMove;
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
var mouseX= 0;
var mouseY = 0;
var a;
var b;
var distance;

//circle Styles
var green = "rgba(68, 151, 141, 1)"

function circles(x, y, dy, f,spd,) {
	this.x 	= x;
	this.iniX = x;
	this.y 	=  y;
	this.dy = dy;
	this.dx = 1;
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
		// this.a = this.x - mouseX;
		// this.b = this.y - mouseY;
		// this.distance = Math.sqrt(a*a + b*b);
		// console.log(this.distance);

		// if(Math.floor((mouseX - this.x) < 50 )){
		// 		this.x -= 0.5;

		// } else if(Math.floor((this.x - mouseX) < 50)){
		// 	this.x += 0.5;
		// } 
			
		// while(this.x !== this.iniX && mouseX - this.x > 50){
		// 		if(this.iniX > this.x){
		// 			this.x = this.x +1;
		// 		}
		// 		this.x = this.x-1;
		// 	};
	
		if(this.x + this.dx > canvas.width || this.x + this.dx < 0){
			this.dx = -this.dx;
		}
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
		this.x += this.dx;
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

function mouseMove(evt){
	console.log("click!S");
	mouseX = evt.clientX;
	mouseY = evt.clientY;
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < dotsArr.length; i++){
		dotsArr[i].update();
	}
}
animate();


