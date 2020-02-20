//Nasa api setup
var req = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key="
var api_key= "b0wawz6eOUSBRMbmmYbeNkLp2GZC5HnIoQ5dBfe1"

req.open("GET", url + api_key, true);
req.send();

req.addEventListener("load", function(){
    if(req.status == 200 && req.readyState == 4){
        var response = JSON.parse(req.responseText);
        if(response.media_type == "video"){
            document.getElementById("space").src = "https://apod.nasa.gov/apod/image/2002/ZetaOph_spitzer_960.jpg";
        } else {
            document.getElementById("space").src = response.url;
        } 
    }
});


function debounce(func, wait, immediate){
	let timeout;
	return function() {
		let context = this;
		let args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;

			if (!immediate) {
				func.apply(context, args)
			}
		}, wait);

		if (immediate && !timeout) {
			func.apply(context, args)
		}
	};
};
//select Sliding elements on left
var sliders = document.querySelectorAll(".slide-in");


// Check if sliding elements are halfway on screen then add/ remove slide class.
function checkSlide(){
    sliders.forEach(function(slider, index ){
        //halfway through the image in relation to half the window
        let slideInAt = (window.pageYOffset + window.innerHeight) + slider.offsetHeight/4;
        //bottom of the image
        let sliderBottom = slider.offsetTop + slider.offsetHeight;      
        //is the image half visible
        let isHalfShown = slideInAt > slider.offsetTop;      
        //have we scrollled past the image
        let isNotScrolledPast = window.scrollY < sliderBottom;        
        //if image is half visible from to or bottom, then add active class
        
        if(isHalfShown && isNotScrolledPast) {            
            slider.classList.add("active");
        } else {
            slider.classList.remove("active");
        }

    });
}   

window.addEventListener("resize", function(){
    let spaceFix = document.getElementById("home").style.height;
    let canvas = document.getElementById("myCanvas").height;
    console.log("fixheight = " + spaceFix);
    console.log("canvas = " + canvas);
    if(spaceFix !== canvas){
        spaceFix = canvas;   
    }
});
window.addEventListener("scroll", function(){
    debounce(checkSlide(), 300, true);
});
