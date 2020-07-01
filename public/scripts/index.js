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
const faders = document.querySelectorAll(".fader");

// Check if sliding elements are halfway on screen then add/ remove slide class.
function checkSlide(){
    sliders.forEach(function(slider, index ){
        //halfway through the image in relation to half the window
        let slideInAt = (window.pageYOffset + window.innerHeight) + slider.offsetHeight/2;
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
            // slider.classList.remove("active");
        }
    });
}

// Check if fading elements are on screen then add fade class.
function checkFade(){
    faders.forEach(function(fader, index ){
        //halfway through the image in relation to half the window
        let fadeInAt = (window.pageYOffset + window.innerHeight) + fader.offsetHeight/2;
        //bottom of the image
        let sliderBottom = fader.offsetTop + fader.offsetHeight;      
        //is the image half visible
        let isHalfShown = fadeInAt > fader.offsetTop;      
        //have we scrollled past the image
        let isNotScrolledPast = window.scrollY < sliderBottom;        
        //if image is half visible from to or bottom, then add active class
        if(isHalfShown && isNotScrolledPast) {            
            fader.classList.add("active");
        } 
    });
}

//slide in script for h1 and h4 on landing page
const slideDown = document.querySelectorAll("h1");
const title = document.getElementById("jobRole");
const home = document.getElementsByClassName("home");
function myName(){
    slideDown.forEach(function(slider, index){
        slider.classList.add("active");
    });
    title.classList.add("active");
}

document.addEventListener("DOMContentLoaded", myName);

window.addEventListener("scroll", function(){
    debounce(checkSlide(), 300, true);
    debounce(checkFade(), 300, true);
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
