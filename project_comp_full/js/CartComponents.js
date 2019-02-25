Vue.component('cart', {
    data: function(){
        return {
            cartUrl: `/getBasket.json`,
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
            showCart: false
        }
    },
    methods: {
        addProduct: function(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity:1}, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(item.quantity>1){
                            item.quantity--;
                        } else{
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    created(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    template: `<div>
     <button class="btn-cart" type="button"
                    @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item v-for="item of cartItems" :key="item.product_name"
                :cart-item="item" :img="imgCart"
                @remove="remove"></cart-item>
            </div>
            </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">{{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})















