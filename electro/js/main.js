"use strict";

const responseCatalogData = 'https://api.myjson.com/bins/1ah9pa';
const responseBasket = 'https://api.myjson.com/bins/1czafy';

class ProductsList {
    constructor(container = '.products-slick') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
    }

    /** Собирает каталог продуктов из json с сервера */
    _getProducts() {
        fetch(`${responseCatalogData}`)
            .then(result => result.json())
            .then(data => {
                this.goods = data;
                this.render();
            })
            .catch(error => console.log(error));
    }

    /** Подсчитывает общую стоимость всех продуктов в каталоге */
    getProductsPrice() {
        let price = 0;
        this.allProducts.forEach(el => price += el.price);
        return price
    }

    /** Генерирует и отображает html цены товара для вывода каталога товаров  */
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(
                product.id_product,
                product.title,
                product.category,
                product.image,
                product.price,
                product.sale,
                product.kind,
                product.rating
            );
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        block.insertAdjacentHTML('beforebegin', `<h5>Total cost all products: ${this.getProductsPrice()}</h5>`);
    }
}

class ProductItem {
    constructor(id_product, title, category, image, price, sale, kind, rating) {
        this.id_product = id_product;
        this.title = title;
        this.category = category;
        this.image = image;
        this.price = price;
        this.sale = sale;
        this.kind = kind;
        this.rating = rating;
    }

    /** Генерирует html скидки товара для вывода товара  */
    blockSale() {
        const blSale = `<span class="sale">-${this.sale}%</span>`;
        return this.sale ? blSale : ''
    }

    /** Генерирует html вида (предложения) товара для вывода товара  */
    blockKind() {
        const blKind = `<span class="new">${this.kind}</span>`;
        return this.kind ? blKind : ''
    }

    /** Генерирует html цены товара для вывода товара  */
    blockPrice() {
        let oldPrice = null;
        let blOldPrice = '';

        if (this.sale) {
            oldPrice = this.price;
            this.price = oldPrice * (1 - this.sale / 100);
            blOldPrice = `<del class="product-old-price">$${oldPrice}</del>`;
        }

        return `<h4 class="product-price">$${this.price} ${blOldPrice}</h4>`
    }

    /** Генерирует html рейтинга товара для вывода товара  */
    blockRating() {
        let rating_stars = '';

        for (let i = 0; i < this.rating; i++) {
            rating_stars += '<i class="fa fa-star"></i>'
        }
        for (let i = 0; i < 5 - this.rating; i++) {
            rating_stars += '<i class="fa fa-star-o"></i>'
        }
        return `<div class="product-rating">${rating_stars}</div>`
    }

    /** Генерирует html товара для вывода на страницу.  */
    render() {
        return `<div class="product">
                        <div class="product-img">
                            <img src="${this.image}" alt="">
                            <div class="product-label">
                                ${this.blockSale()}
                                ${this.blockKind()}
                            </div>
                        </div>
                        <div class="product-body">
                            <p class="product-category">${this.category}</p>
                            <h3 class="product-name"><a href="#">${this.title}</a></h3>
                            
                            ${this.blockPrice()}
                            ${this.blockRating()}
                            <div class="product-btns">
                                <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn" 
                                data-id_product="${this.id_product}"
                                data-name="${this.title}"
                                data-price="${this.price}"
                                data-image="${this.image}"><i class="fa fa-shopping-cart"></i> add to cart</button>
                        </div>
                    </div>`
    }
}

class Basket {
    constructor(containerSelector = '.cart-container-click',
                containerCartList = '.cart-list',
                countSelector = '.basket-count',
                priceSelector = '.basket-price',
                addCartOrderClass = 'add-to-cart-btn',
                redCartOrderClass = 'reduce-order-btn',
                delCartOrderClass = 'delete',
    ) {
        this.settings = {
            containerSelector: containerSelector,
            containerCartList: containerCartList,
            countSelector: countSelector,
            priceSelector: priceSelector,
            addCartOrderClass: addCartOrderClass,
            redCartOrderClass: redCartOrderClass,
            delCartOrderClass: delCartOrderClass,
        };

        this.orders = [];
        this.allOrders = [];
        this.currentObj = {};
        this._getBasket();
        this.init();
    }

    /** Собирает корзину из json с сервера */
    _getBasket() {
        fetch(`${responseBasket}`)
            .then(result => result.json())
            .then(data => {
                this.orders = data;

                for (let order of this.orders) {
                    if (order.sale) {
                        order.price = order.price * (1 - order.sale / 100);
                    }
                }
                this.render();
            })
            .catch(error => console.log(error));
    }

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init() {
        const containerClick = document.querySelectorAll(this.settings.containerSelector);
        for (let container of containerClick) {
            container.addEventListener('click', event => this.containerClickHandler(event));
        }

        this.render();
    }

    /** Обработчик события клика для покупки товара */
    containerClickHandler(event) {
        this.currentObj = {
            id_product: +event.target.dataset.id_product,
            title: event.target.dataset.name,
            image: event.target.dataset.image,
            price: +event.target.dataset.price,
            count: 1,
        };
        const parentEl = event.target.parentElement;

        if (event.target.classList.contains(this.settings.addCartOrderClass)) {
            this.addOrder();
        } else if (event.target.classList.contains(this.settings.redCartOrderClass)) {
            this.reduceOrder();
        } else if (event.target.classList.contains(this.settings.delCartOrderClass) ||
            parentEl.classList.contains(this.settings.delCartOrderClass)) {
            if (parentEl.classList.contains(this.settings.delCartOrderClass)) {
                this.currentObj.id_product = +parentEl.dataset.id_product
            }
            this.deleteOrder();
        }
    }

    /**
     * Считает и возвращает количество всех купленных товаров из массива this.orders.
     * @returns {number} Число всех купленных товаров.
     */
    getOrdersCount() {
        let count = 0;
        this.orders.forEach((el) => count += el.count);
        return count
    }

    /**
     * Считает и возвращает цену всех купленных товаров из массива this.orders.
     * @returns {number} Число всех купленных товаров.
     */
    getOrdersPrice() {
        let price = 0;
        this.orders.forEach((el) => price += el.price * el.count);
        return price
    }

    /** Отображает все товары, их количество и цену.  */
    render() {
        const block = document.querySelector(this.settings.containerCartList);
        let ordersHtml = '';

        for (let order of this.orders) {
            console.log('order', order);
            const orderObj = new BasketItem(
                order.id_product,
                order.title,
                order.image,
                order.price,
                order.count,
            );
            this.allOrders.push(orderObj);
            ordersHtml += orderObj.render();
        }
        block.innerHTML = ordersHtml ? ordersHtml : '<h5>Cart is empty</h5>';

        const containerCount = document.querySelectorAll(this.settings.countSelector);
        for (let container of containerCount) {
            container.innerText = this.getOrdersCount()
        }

        document.querySelector(this.settings.priceSelector).innerText = this.getOrdersPrice();
    }

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
     */
    addOrder() {
        if (this.orders.some(el => el.id_product === this.currentObj.id_product)) {
            this.orders.forEach((el) => el.id_product === this.currentObj.id_product ? el.count++ : el.count);
        } else {
            console.log('its new item, add to cart');
            this.orders.push(this.currentObj)
        }
        this.render();
    }

    /**
     * Уменьшает число заказов товара из корзины и отображает количество и цену всех товаров.
     */
    reduceOrder(target) {
        for (let order of this.orders) {
            if (order.id_product === this.currentObj.id_product) {
                order.count--;
                if (order.count === 0) {
                    this.deleteOrder(target);
                }
            }
        }
        this.render();
    }

    /**
     * Удаляет товар из массива и отображает количество и цену всех товаров.
     */
    deleteOrder() {
        for (let order of this.orders) {
            if (order.id_product === this.currentObj.id_product) {
                const idx = this.orders.indexOf(order);
                this.orders.splice(idx, 1);
            }
        }
        this.render();
    }

}

class BasketItem {
    constructor(id_product, title, image, price, count) {
        this.id_product = id_product;
        this.title = title;
        this.image = image;
        this.price = price;
        this.count = count;
    }

    /** Генерирует html товара для вывода на страницу.  */
    render() {
        return `<div class="product-widget">
                    <div class="product-img">
                        <img src="${this.image}" alt="">
                    </div>
                    <div class="product-body">
                        <h3 class="product-name"><a href="#">${this.title}</a></h3>
                        <h4 class="product-price"><span class="qty">${this.count}x</span>$${this.price}</h4>
                    </div>
                    <button class="delete" data-id_product="${this.id_product}"><i class="fa fa-close"></i></button>
                </div>`
    }
}


let products = new ProductsList();
let cart = new Basket();
