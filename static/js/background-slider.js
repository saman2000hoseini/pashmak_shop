var slideIndex = 1;
autoSlides();

function autoSlides() {
    let slideImages = document.getElementsByClassName("slider-img");
    for (let i = 0; i < slideImages.length; i++) {
        slideImages[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slideImages.length) {
        slideIndex = 1;
    }

    slideImages[slideIndex - 1].style.display = "block";

    setTimeout(autoSlides, 6000);
}

function buttonSlides(n) {
    slideIndex += n

    let slideImages = document.getElementsByClassName("slider-img");
    for (let i = 0; i < slideImages.length; i++) {
        slideImages[i].style.display = "none";
    }

    if (slideIndex > slideImages.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = slideImages.length;
    }

    slideImages[slideIndex - 1].style.display = "block";
}