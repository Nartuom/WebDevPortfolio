//Nasa api setup
// var req = new XMLHttpRequest();
// var url = "https://api.nasa.gov/planetary/apod?api_key="
// var api_key= "b0wawz6eOUSBRMbmmYbeNkLp2GZC5HnIoQ5dBfe1"

// req.open("GET", url + api_key, true);
// req.send();

// req.addEventListener("load", function(){
//     if(req.status == 200 && req.readyState == 4){
//         var response = JSON.parse(req.responseText);
//         if(response.media_type == "video"){
//             document.getElementById("space").src = "https://apod.nasa.gov/apod/image/2002/ZetaOph_spitzer_960.jpg";
//         } else {
//             document.getElementById("space").src = response.url;
//         } 
//     }
// });


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
const sliders = document.querySelectorAll(".slide-in");
//select h1 to slidedown



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

//slide in script for h1 and h4 on landing page
const slideDown = document.querySelectorAll("h1");
const title = document.getElementById("jobRole");
function myName(){
    slideDown.forEach(function(slider, index){
        slider.classList.add("active");
    });
    title.classList.add("active");
}

window.onload = function(){
    myName();
}

window.addEventListener("scroll", function(){
    debounce(checkSlide(), 300, true);
});

//button click
const readMore = document.getElementsByClassName("expandButton");
const myStory = document.getElementsByClassName("expandableDiv");
const expandImg = document.getElementsByClassName("koreaTom");
const aboutSec = document.getElementsByClassName("grid-item content-box");
readMore[0].addEventListener("click", function(){
    myStory[0].classList.toggle("active");
    expandImg[0].classList.toggle("expandedImg");
    aboutSec[0].classList.toggle("expanded");
})
