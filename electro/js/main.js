"use strict";

const products = [
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


const renderProduct = (title, category, image, price, sale, kind, rating) => {
    let oldPrice = null;
    if (sale) {
        oldPrice = price;
        price = oldPrice * (1 - sale/100);
    }

    const bl_sale = `<span class="sale">-${sale}%</span>`;
    const bl_kind = `<span class="new">${kind}</span>`;

    const block = `<div class="product">
                        <div class="product-img">
                            <img src="${image}" alt="">
                            <div class="product-label">
                                ${bl_sale}
                                ${bl_kind}
                            </div>
                        </div>
                        <div class="product-body">
                            <p class="product-category">${category}</p>
                            <h3 class="product-name"><a href="#">${title}</a></h3>
                            <h4 class="product-price">$${price} <del class="product-old-price">$${oldPrice}</del></h4>
                            <div class="product-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-btns">
                                <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                        </div>
                    </div>`;
    return block
};

const renderPage = list => {
    const productList = list.map(item => renderProduct(...Object.values(item)));
    document.querySelector('.products-slick').innerHTML = productList.join('');
};

renderPage(products);

