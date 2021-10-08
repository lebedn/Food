import { getResource } from '../services/services';

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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuDish(img, altimg, title, descr, price, '.menu__field .container').menuItem();
            });
        });
}
export default cards;