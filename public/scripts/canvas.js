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

function circles(x, y, dy) {
	this.x = x;
	this.y = y;
	this.dy =dy;
	this.draw = function() {
		ctx.beginPath();
   		ctx.arc(this.x, this.y, 5, 0, Math.PI *2, false);
		ctx.strokeStyle = "#44978D";
		ctx.fillStyle = "#44978D";
		ctx.fill()
		ctx.shadowColor = "#367870";
		ctx.shadowBlur = 5; 	
		ctx.stroke();
	}
	this.update = function(){
		if(this.y < 300){
			this.dy = -this.dy;
		}
		if(this.y > 700){
			this.dy = -2;
		}
		this.y += this.dy;
		this.draw();
	}
}

var dotsArr =[]


for(var i = 0; i < 400; i++){
	var y = Math.floor(Math.random() * (700 - 300 + 1)+ 300);
	var x = Math.random() * innerWidth;
	dotsArr.push(new circles(x, y, -2));
	// if((y > 200)&&(i < 30)){
	// 	y -= 20;
	// } else if((y < 800)&&(i > 30)){
	// 	y += 20;
	// }
	
}




function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i =0; i < dotsArr.length; i++){
		dotsArr[i].update();
	}
}
animate();




	 