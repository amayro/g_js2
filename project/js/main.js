const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        show: true,
        catalogUrl: `/catalogData.json`,
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        products: [],
        orders: [],
        search: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(item) {
            console.log(item);
            console.log(event.target);
            this.products.push({title: 'Chair', quantity: 1, price: 200})
        },

        addOrder(item) {
            if (this.orders.some((el) => el.id_product === item.id_product)) {
                this.increaseQuantity(item);
            } else {
                console.log('its new item, add to cart');
                const newOrder = JSON.parse(JSON.stringify(item));
                newOrder.quantity = 1;
                this.orders.push(newOrder);
                console.log(newOrder);
            }
            console.log(item);
            console.log(event.target);
        },

        delOrder(item) {
            for (let order of this.orders) {
                if (order.id_product === item.id_product) {
                    const idx = this.orders.indexOf(order);
                    this.orders.splice(idx, 1);
                }
            }
        },

        increaseQuantity(item) {
            for (let order of this.orders) {
                if (order.id_product === item.id_product) {
                    order.quantity++;
                }
            }
        },
    },

    computed: {
        filteredProduct() {
            return this.products.filter(item => {
                return item.product_name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
        ,
        increaseQuantity(item) {
            for (let order of this.orders) {
                if (order.id_product === item.id_product) {
                    order.quantity++;
                }
            }
        },

    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                }
            });

    },
});
