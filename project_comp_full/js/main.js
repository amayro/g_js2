const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    methods: {
      getJson: function(url){
          return fetch(url)
            .then(result => result.json())
            .catch(error => console.log(error));
      }
    }
});

// class List {
//     constructor(url, container){
//         this.container = container;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch( url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }
//     handleData(data){
//         this.goods = data;
//         this.render();
//     }
//     calcSum(){
//         return this.goods.reduce((accum, item) => accum += +item.price, 0)
//     }
//     calcItems(){
//         return this.allProducts.length
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new lists[this.constructor.name](product);
//             this.allProducts.push(productObj);
//             this.filtered = [...this.allProducts];
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         });
//     }
//     _init(){
//         return false
//     }
// }
// class Item {
//     constructor(el, img = 'https://placehold.it/200x150'){
//         this.product_name = el.product_name;
//         this.id_product = el.id_product;
//         this.price = el.price;
//         this.img = img;
//     }
//     render(){
//        return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>$${this.price}</p>
//                         <button class="buy-btn"
//                         data-id="${this.id_product}"
//                         data-price="${this.price}"
//                         data-image="${this.img}"
//                         data-name="${this.product_name}">Купить</button>
//                     </div>
//                 </div>`;
//     }
// }
//
// class ProductsList extends List {
//     constructor(cart, url='/catalogData.json', container = '.products'){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data))
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//            e.preventDefault();
//            this.filter(document.querySelector('.search-field').value);
//         });
//     }
// }
// class ProductItem extends Item{}
// class Cart extends List{
//     constructor(url = '/getBasket.json', container = '.cart-block'){
//         super(url, container);
//         this.getJson()
//             .then(data => this.handleData(data.contents))
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                        let product = {
//                            id_product: productId,
//                            price: +element.dataset['price'],
//                            product_name: element.dataset['name'],
//                            img: element.dataset['image'],
//                            quantity: 1
//                        };
//                        this.goods = [product];
//                        this.render()
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     removeProduct(element){
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     _updateCart(product){
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//         block.querySelector(`.product-price`).textContent = `${product.quantity*product.price}`
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(e.target)
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//
//     }
// }
//
// class CartItem extends Item{
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//                     <div class="product-bio">
//                         <img src="${this.img}" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${this.product_name}</p>
//                             <p class="product-quantity">Quantity: ${this.quantity}</p>
//                             <p class="product-single-price">$${this.price} each</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">${this.quantity*this.price}</p>
//                         <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                     </div>
//                 </div>`
//     }
// }
//
//
// let lists = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
// let cart = new Cart();
// let products = new ProductsList(cart);
// setTimeout(() => {
//     products.getJson(`getProducts.json`).then(data => products.handleData(data));
// }, 300);

