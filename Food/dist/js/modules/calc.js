function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex,
        height,
        weight,
        age,
        ratio;

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

        elements.forEach((item) => {
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
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcCalorio();

    function getStaticInformation(select, activeClass) {

        const elements = document.querySelectorAll(select);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach((item) => {
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

export default calc;