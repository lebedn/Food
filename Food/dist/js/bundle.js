/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function getActiveStorage(select, activeClass) {
    const elements = document.querySelectorAll(select);
    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') === localStorage.getItem('sex')) {
        item.classList.add(activeClass);
      }

      if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add(activeClass);
      }
    });
  }

  getActiveStorage('#gender div', 'calculating__choose-item_active');
  getActiveStorage('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcCalorio() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex == 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcCalorio();

  function getStaticInformation(select, activeClass) {
    const elements = document.querySelectorAll(select);
    elements.forEach(element => {
      element.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcCalorio();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDimanicInformation(select) {
    const input = document.querySelector(select);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcCalorio();
    });
  }

  getDimanicInformation('#height');
  getDimanicInformation('#weight');
  getDimanicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuDish {
    constructor(url, alt, title, descr, price, selector, ...clasess) {
      this.url = url;
      this.alt = alt;
      this.clasess = clasess;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(selector);
      this.transfer = 9;
      this.valuta();
    }

    valuta() {
      this.price = this.transfer * this.price;
    }

    menuItem() {
      const element = document.createElement('div');

      if (this.clasess.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.clasess.forEach(item => element.classList.add(item));
      }

      element.innerHTML = `
   <img src=${this.url} alt=${this.alt}>
   <h3 class="menu__item-subtitle">${this.title}</h3>
   <div class="menu__item-descr">${this.descr}</div>
   <div class="menu__item-divider"></div>
   <div class="menu__item-price">
       <div class="menu__item-cost">Цена:</div>
       <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
   </div>`;
      this.parent.append(element);
    }

  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuDish(img, altimg, title, descr, price, '.menu__field .container').menuItem();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(selectorForm, timerModal) {
  const forms = document.querySelectorAll(selectorForm);
  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((item, key) => {
        obj[key] = item;
      });
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', JSON.stringify(obj)).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.OpenModal)('.modal', timerModal);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.CloseModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenModal": function() { return /* binding */ OpenModal; },
/* harmony export */   "CloseModal": function() { return /* binding */ CloseModal; }
/* harmony export */ });
function OpenModal(modalSelector, timerModal) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = "hidden";
  console.log(timerModal);

  if (timerModal) {
    clearTimeout(timerModal);
  }
}

function CloseModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, timerModal) {
  const btnOpen = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  btnOpen.forEach(item => {
    item.addEventListener('click', () => OpenModal(modalSelector, timerModal));
  });
  document.addEventListener('keydown', e => {
    if (e.code == "Escape") {
      CloseModal(modalSelector);
    }
  });
  modal.addEventListener('click', e => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      CloseModal(modalSelector);
    }
  });

  function endModal() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      OpenModal(modalSelector, timerModal);
      window.removeEventListener('scroll', endModal);
    }
  }

  window.addEventListener('scroll', endModal);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  slide,
  prevArrow,
  nextArrow,
  totalCurrent,
  currentCounter,
  filed,
  wrapper
}) {
  let offset = 0;
  let slideIndex = 1;
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCurrent),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(filed);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(item => {
    item.style.width = width;
  });
  slider.style.position = "relative";
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('slide-indicators');
  indicators.style.cssText = ` position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`;
    indicators.append(dot);
    dots.push(dot);

    if (i == 0) {
      dot.style.opacity = 1;
    }
  }

  function SetCurrent() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function SetOpacity() {
    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[slideIndex - 1].style.opacity = 1;
  }

  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = ` translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    SetCurrent();
    SetOpacity();
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    SetCurrent();
    SetOpacity();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      SetCurrent();
      SetOpacity();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(parentTabsSel, tabsSel, tabcontentSel, activeClass) {
  let parentTabs = document.querySelector(parentTabsSel),
      tabs = document.querySelectorAll(tabsSel),
      tabcontent = document.querySelectorAll(tabcontentSel);

  function HideMod() {
    tabcontent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function ShowMod(i = 0) {
    tabcontent[i].classList.add('show', 'fade');
    tabcontent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  HideMod();
  ShowMod();
  parentTabs.addEventListener('click', e => {
    if (e.target && e.target.classList.contains(tabsSel.slice(1))) {
      tabs.forEach((item, i) => {
        if (item === e.target) {
          HideMod();
          ShowMod(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id) {
  const dedline = '2021-10-31';

  function GetTime(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTime(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(UpTime, 1000);
    UpTime();

    function UpTime() {
      const t = GetTime(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total > 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTime(id, dedline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
const postData = async (url, data) => {
  const rel = await fetch(url, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: data
  });
  return await rel.json();
};

const getResource = async url => {
  let rel = await fetch(url);

  if (!rel.ok) {
    throw new Error(`Cound not${url} status ${rel.status}`);
  }

  return await rel.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', function () {
  const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.OpenModal)(('.modal', timerModal)), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timerModal);
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', timerModal);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2021-10-01');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCurrent: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    filed: '.offer__slider_inner'
  });
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
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
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map