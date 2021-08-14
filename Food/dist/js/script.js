window.addEventListener('DOMContentLoaded', function() {
    let parentTabs = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabcontent = document.querySelectorAll('.tabcontent');

    function HideMod() {
        tabcontent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }


    function ShowMod(i = 0) {
        tabcontent[i].classList.add('show', 'fade');
        tabcontent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    HideMod();
    ShowMod();
    parentTabs.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item === e.target) {
                    HideMod();
                    ShowMod(i);

                }
            });
        }
    });

    //timer
    const dedline = '2021-09-01';

    function GetTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
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
    setTime('.timer', dedline);

    //modal

    const btnOpen = document.querySelectorAll('[data-modal]'),

        modal = document.querySelector('.modal');

    function OpenModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearTimeout(timerModal);

    }

    function CloseModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = "";

    }


    btnOpen.forEach(item => {
        item.addEventListener('click', OpenModal);
    });



    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape") {
            CloseModal();
        }

    });
    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            CloseModal();
        }
    });
    const timerModal = setTimeout(OpenModal, 50000);

    function endModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            OpenModal();
            window.removeEventListener('scroll', endModal);
        }
    }
    window.addEventListener('scroll', endModal);

    //menu
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
    const fitness = new MenuDish(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu__field .container');
    fitness.menuItem();
    const elite = new MenuDish(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu__field .container');
    elite.menuItem();
    const post = new MenuDish(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu__field .container');
    post.menuItem();




    //modal-form


    const forms = document.querySelectorAll('form');
    forms.forEach(item => {
        FormServer(item);
    });

    const messageStatus = {
        loading: 'img/spinner.svg',
        asess: 'Спасибо мы с вами свяжемся!',
        erorr: 'Что-то пошло не так'
    };

    function FormServer(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let spin = document.createElement('img');
            spin.src = messageStatus.loading;
            spin.style.cssText = " display:block; margin: 0 auto; ";
            form.append(spin);

            const FormDate = new FormData(form);
            const obj = {};
            FormDate.forEach((item, key) => {
                obj[key] = item;
            });

            fetch('js/server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(data => {
                console.log(data);
                ThaksForm(messageStatus.asess);

            }).catch(() => {
                ThaksForm(messageStatus.erorr);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function ThaksForm(message) {
        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');
        OpenModal();
        const newDialog = document.createElement('div');
        newDialog.classList.add('modal__dialog');
        newDialog.innerHTML = `<div class="modal__content">  <div class="modal__close" data-close>&times;</div><div class="modal__title">${message}</div></div>`;
        document.querySelector('.modal').append(newDialog);

        setTimeout(() => {
            newDialog.remove();
            dialog.classList.remove('hide');
            dialog.classList.add('show');
            CloseModal();

        }, 4000);

    }













});