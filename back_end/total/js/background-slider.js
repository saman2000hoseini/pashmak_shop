var slideIndex = 0;
autoSlides();


function autoSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex-1].style.display = "block";
  setTimeout(autoSlides, 6000);
}

function buttonSlides(n) {
  moveSlides(slideIndex1 += n);
}
var slideIndex1 = 1;

function moveSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n < 1) {
    slideIndex1 = slides.length
  }
  if (n > slides.length) {
    slideIndex1 = 1
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  } 
slides[slideIndex1-1].style.display = "block";
}
