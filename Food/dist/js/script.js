import tabs from './modules/tabs';
import modal from './modules/modal';
import forms from './modules/forms';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import { OpenModal } from './modules/modal';



window.addEventListener('DOMContentLoaded', function() {
    const timerModal = setTimeout(() => OpenModal(('.modal', timerModal)), 50000);
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timerModal);
    forms('form', timerModal);
    timer('.timer', '2021-10-01');
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCurrent: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        filed: '.offer__slider_inner'
    });
    calc();








});
























































/* showSlides(slideIndex);

function showSlides(n) {

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;

    } else {
        total.textContent = slides.length;
    }
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach((item) => {
        item.style.display = "none";
    });
    slides[slideIndex - 1].style.display = 'block';
    if (slides.length < 10) {
        current.textContent = `0${slideIndex }`;

    } else {
        current.textContent = slideIndex;
    }

}

function plusSlides(n) {
    showSlides(slideIndex += n);
}
prev.addEventListener('click', () => {
    plusSlides(-1);
});
next.addEventListener('click', () => {
    plusSlides(1);
}); */