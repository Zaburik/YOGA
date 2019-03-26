function slider() {
    //slider
    let slideIndex = 1, //параметр текущего слайда 
        slides = document.querySelectorAll('.slider-item'), //слайды
        prev = document.querySelector('.prev'), // кнопка слайда 
        next = document.querySelector('.next'), //кпопка следущая 
        dotsWrap = document.querySelector('.slider-dots'), // обертка точек
        dots = document.querySelectorAll('.dot'); //точки

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1; //проверка картинок 
        }
        if (n < 1) {
            slideIndex = slides.length; //проверка картинок 
        }
        slides.forEach((item) => item.style.display = 'none'); //Делаем все картинки не виднами 
        dots.forEach((item) => item.classList.remove('dot-active')); // Делаем все точки не виднами
        slides[slideIndex - 1].style.display = 'block'; // Показываем первую картинку слайдера 
        dots[slideIndex - 1].classList.add('dot-active'); // Показываем первую точку 
    }

    showSlides(); // Я вызвал саму функцию слайдера в DOM так как если не вызывать 
    //тогда слайдер не будет работать пока не нажнемшь кнопки слайдера 

    function viewSlides(n) {
        showSlides(slideIndex += n); //здесь вызываем первую функцию 
    }

    function currentSlide(n) {
        showSlides(slideIndex = n); // Когда мы будем нажимать или перелистовать слайд сюда будет подставлятся нужный индекс 
    }

    prev.addEventListener('click', function () {
        viewSlides(-1); //здесь будут листаться слайды назад
    });
    next.addEventListener('click', function () {
        viewSlides(+1); //здесь будут листаться слайды вперед
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

}

module.exports = slider;