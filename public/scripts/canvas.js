var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

var c = canvas.getContext("2d");

var innerWidth = window.innerWidth;
var innerHeight= window.innerHeight;



function createLines(){
	var x = Math.random() * window.innerWidth;
	var y = x + 100;
	
	this.draw = function(){
		c.beginPath();
		c.moveTo(x, y);
		c.lineTo(x - 10, y + 50);
		c.strokeStyle = "#05386B";
		c.stroke();	
	}
	this.draw();
}

var lineArr = [];
for(var i = 0; i <= 20; i++){
	var circle = new createLines();
	// var x = Math.random() * (innerWidth - x) + x;
	// var y = Math.random() * (innerHeight - y) +y;
	// var dx = (Math.random()- 0.5);
	lineArr.push(new createLines());
}


// function animate(){
// 	requestAnimationFrame(animate);
// 	c.clearRect(0,0, innerWidth, innerHeight);
	
// 	for(var i =0; i < lineArr.length; i++){
// 	lineArr[i].update();
// 	}
// };







// Lines
// c.beginPath();
// c.moveTo(100, 600);
// c.lineTo(300, 200);
// c.strokeStyle = "#05386B";
// c.stroke();

//arc /circle
// var x = 50;
// var dx= 5;
// var y = 250;
// var dy = 8;
// var radius = 1;
// function animate() {
// 	requestAnimationFrame(animate);
// 	//clear last drawn shape
// 	// c.clearRect(0, 0, innerWidth, innerHeight);
	
// 	c.beginPath();
// 	c.arc(x, y, radius, 0, Math.PI * 2, false);
// 	c.strokeStyle = "#05386B";
// 	c.stroke();
	
// 	if(x + radius > innerWidth || x - radius < 0){
// 		dx = -dx;	
// 	}
	
// 	if(y + radius > innerHeight || y - radius < 0 ){
// 		dy = -dy;
// 	}
	
// 	x += dx;
// 	y += dy;
	
// }

// animate();


// create random lines and circles

// for(var i = 0; i < 5; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	// Lines
// 	c.beginPath()
// 	c.moveTo(x, 600);
// 	c.lineTo(y, 200);
// 	c.strokeStyle = "#05386B";
// 	//Circles
// 	c.arc(x, y, 20, 0, Math.PI * 2, false);
// 	c.strokeStyle = "#05386B";
// 	c.stroke();
// }


	 