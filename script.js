class Scroll {
    constructor(obj) {
        this.element = document.querySelector(obj.element); /* Получаем элемент */
        this.top = obj.top /* присваиваем данные отступа взятые из объекта obj */
        this.element.style.position = 'fixed' /* задаем элементу фиксированную позицию */
        this.unit = obj.unit /* присваиваем еденицу измерения из объекта если есть */
        
        this.element.style.top = this.scroll() /* задаем элементу значение отступа */
        
        window.addEventListener('scroll', () => this.scroll()) /* добавляем слушатель на скролл */
    }

    scroll() {
        this.number = this.scrollNumber() /* присваиваем значение отступа в переменную */

        if (this.number - scrollY > 0) {
            this.element.style.top = this.number - scrollY + 'px' /* если значение отступа больше чем значение скролла то задаем элементу значение отступа минус значение скролла */
        }else {
            this.element.style.top = 0 /* если значение отступа меньше чем значение скролла то задаем элементу значение 0 */
        }
    }

    scrollNumber() {
        if (this.unit == 'px') {
            return this.top >= 0 ? this.top : 0 /* если значение отступа больше или равно 0 то возвращаем значение отступа если нет то возвращаем 0 */
        } else if (this.unit == '%' || this.unit == undefined) {
            return window.innerHeight / 100 * this.top - this.element.offsetHeight /* если значение отступа в процентах то возвращаем высоту окна умноженную на значение отступа и отнимаем высоту элемента */
        }
    }
}

let scroll = new Scroll({
    element: '.header__nav',
    top: 100
})

class RandomPosition {
    constructor() {
        this.element = document.querySelector('.header__content');
        this.nav = document.querySelector('.header__nav');
        this.height = window.innerHeight - this.nav.offsetHeight - this.element.offsetHeight - 100;
        this.width = window.innerWidth - this.element.offsetHeight - 100;

        this.element.addEventListener('click', () => this.renderPosition());
    }
    
    randomPosition(max) { 
        return Math.floor(Math.random() * (max - 1)) + 1;
    }

    randomNumber(windowSize) {
        let number = this.randomPosition(windowSize);
        if (number >= 0) {
            if (number <= windowSize) {
                return number;
            } else {
                return this.randomNumber(windowSize)
            }
        } else {
            return this.randomNumber(windowSize);
        }
    }
    
    renderPosition() {
        this.element.style = `
            position: absolute;
            top: ${this.randomNumber(this.height)}px;
            left: ${this.randomNumber(this.width)}px;
        `
    }
}

let randomPosition = new RandomPosition();