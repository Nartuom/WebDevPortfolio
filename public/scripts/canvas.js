window.onload = function(){
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	const innerWidth = window.innerWidth;
	const innerHeight= window.innerHeight;

	function renderLoop(){	
		
		function resize(){
			console.log("resizing");
			if(canvas.width !== innerWidth && canvas.height !== innerHeight){
				if(innerWidth < innerHeight){
					canvas.height = innerWidth / 1.5;
					canvas.width = innerWidth;
				} else {
					canvas.width = innerWidth;
					canvas.height = innerHeight;
				}
				
			}
		}
		resize();
		
		window.addEventListener("mousemove", function(event) {
			mouse.x = event.x;
			mouse.y = event.y;
		});

		
		//Variables
		var dotsArr =[]
		var mouse = {
			x: undefined,
			y: undefined
		}

		var minY = (canvas.height / 10) * 2;
		var maxY = (canvas.height / 10) * 9;
		var inc = 50;
		var f  = 0;
		var size = 2.5;
		var fall = Boolean;

		//circle Styles
		var colorArr = [
			"#FC3A8B",
			"#ffffff",
			"#4C5BFF"
		]

		// draw circles function
		function draw(x, y, color){
			this.x = x;
			this.y = y;
			this.color = color;
			ctx.beginPath();
			ctx.globalAlpha = f;
			ctx.arc(this.x, this.y, size, 0, Math.PI *2, false);
			ctx.strokeStyle = this.color;
			ctx.fillStyle = this.color;
			ctx.shadowColor = "white";
			ctx.shadowBlur = 10;	
			ctx.fill();	
			ctx.stroke();

		}

		//create circle objects
		function circles(x, y, dy, color, fall, spd,) {
			this.x 	= x;
			this.iniX = x;
			this.y 	=  y;
			this.dy = dy;
			this.dx = 0.2;
			this.color = color;
			this.spd = spd ;
			this.size = size;
			fall = true;

			draw(x, y, color);

			this.update = function(){

				if((this.y < maxY)&&(this.fall == true)){
					this.dy = this.spd;
					this.fall = true;
				}
			
				if(this.x + this.dx > canvas.width || this.x + this.dx < 0){
					this.dx = -(this.dx * 0.5);
				}
				
				if(this.y + this.dy > maxY || this.y + this.dy < minY){
					this.dy = -(this.dy * 0.5);
					this.fall = false;	
				}				

				//interact with Mouse
				// if mouse and dot coords ar within 50px
				if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
					&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {
						//move top left
						if(mouse.x > this.x && mouse.y > this.y){
							this.dx -= Math.ceil(Math.random() * 1);
							this.dy -= Math.ceil(Math.random() * 1);
						//move bottom right	
						}else if(mouse.x < this.x && mouse.y < this.y){
							this.dx += Math.ceil(Math.random() * 1);
							this.dy += Math.ceil(Math.random() * 1);
						//move bottom left	
						} else if(mouse.x > this.x && mouse.y < this.y){
							this.dx -= Math.ceil(Math.random() * 1);
							this.dy += Math.ceil(Math.random() * 1);
						//move top right						
						} else if(mouse.x < this.x && mouse.y > this.y){
							this.dx += Math.ceil(Math.random() * 1);
							this.dy -= Math.ceil(Math.random() * 1);
						}			
				}

				this.y += this.dy;
				this.x += this.dx;
				draw(this.x, this.y, this.color);
			}
			
		}


		for(var i = 0; i < 100; i++){
			let x = Math.floor(inc);
			let y = Math.floor(Math.random() * (maxY - 100)+ 100);
			let color = colorArr[Math.floor(Math.random() * colorArr.length)];
			let dy = (Math.random() - 0.5);
			let spd = dy;	
			dotsArr.push(new circles(x, y, dy, color, fall, spd));
			inc  = inc + Math.random() * 35 + 1;
			if(f < 1){
				f = f + 0.05;
			}	
		}

		function animate(){
			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, innerWidth, innerHeight);
			dotsArr.forEach(function(circles){
				circles.update();
			});
		}

		animate();
		}

	requestAnimationFrame(renderLoop);
}
// window.addEventListener("onresize", location.reload());




