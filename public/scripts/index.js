const debounce = (func, wait, immediate) => {
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
        let slideInAt = (window.scrollY + window.innerHeight) - slider.offsetHeight / 2;
        console.log(slideInAt);
        //bottom of the image
        let sliderBottom = slider.offsetTop + slider.offsetHeight;
        console.log(sliderBottom);
        //is the image half visible
        let isHalfShown = slideInAt > slider.offsetTop;
        console.log(isHalfShown);
        //have we scrollled past the image
        let isNotScrolledPast = window.scrollY < sliderBottom;
        console.log(isNotScrolledPast);
        //if image is half visible from to or bottom, then add active class
        
        if(isHalfShown && isNotScrolledPast) {
            console.log("i see you")
            slider.classList.add("active");
        } else {
            slider.classList.remove("active");
        }

    });
}   


window.addEventListener("scroll", function(){
    debounce(checkSlide(), 100, true);
});
