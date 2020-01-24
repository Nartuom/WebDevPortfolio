

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

var sliders = document.querySelectorAll(".slide-in.slide-left");


function checkSlide(){
    sliders.forEach(function(slider){
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

var myCheckSlideThrottle = debounce(checkSlide(), 10, true);

window.addEventListener("scroll", function(){
    debounce(checkSlide());
});