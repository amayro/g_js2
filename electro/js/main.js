"use strict";

const productsData = [
    {
        title: 'Notebook',
        category: 'Laptops',
        image: './img/product01.png',
        price: 2200,
        sale: 30,
        kind: 'NEW',
        rating: 4,
    },
    {
        title: 'Headphones',
        category: 'Accessories',
        image: './img/product02.png',
        price: 190,
        sale: 0,
        kind: 'HOT',
        rating: 3,
    },
    {
        title: 'Notebook',
        category: 'Laptops',
        image: './img/product03.png',
        price: 1700,
        sale: 15,
        kind: '',
        rating: 4,
    },
    {
        title: 'Tablet',
        category: 'Laptops',
        image: './img/product04.png',
        price: 900,
        sale: 0,
        kind: '',
        rating: 0,
    },

];

class ProductsList {
    constructor(container = '.products-slick') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
    }

    _getProducts() {
        this.goods = productsData;
    }

    getProductsPrice() {
        let price = 0;
        this.allProducts.forEach(el => price += el.price);
        return price
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(
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
    constructor(title, category, image, price, sale, kind, rating) {
        this.title = title;
        this.category = category;
        this.image = image;
        this.price = price;
        this.sale = sale;
        this.kind = kind;
        this.rating = rating;
    }

    blockSale() {
        const blSale = `<span class="sale">-${this.sale}%</span>`;
        return this.sale ? blSale : ''
    }

    blockKind() {
        const blKind = `<span class="new">${this.kind}</span>`;
        return this.kind ? blKind : ''
    }

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
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                        </div>
                    </div>`
    }
}

class Basket {
    constructor(containerSelector = '#cart',
                countSelector = '.basket-count',
                priceSelector = '#basket-price') {
        this.containerSelector = containerSelector;
        this.countSelector = countSelector;
        this.priceSelector = priceSelector;
        this.orders = [];
    }

    getOrdersCount() {
        let count = 0;
        this.orders.forEach((el) => count += el.count);
        return count
    }


    getOrdersPrice() {
        let price = 0;
        this.orders.forEach((el) => price += el.price * el.count);
        return price
    }

    render() {
        document.querySelector(this.countSelector).innerText = this.getOrdersCount();
        document.querySelector(this.priceSelector).innerText = this.getOrdersPrice();
    }

}


let products = new ProductsList();
products.render();
