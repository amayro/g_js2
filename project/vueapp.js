const app = new Vue({
    el: '#app',
    data: {
        show: true,
        color: 'green',
        width: 100,
        isRed: true,
        name: 'John',
        x: 0,
        y: 0,
        counter: 0,
        secondCounter: 0,
        title: 'Hello World!',
        link: 'https://google.com',
        completeEl: `<a href="https://google.com">Google2</a>`,
        products: [
            {title: 'Noutbook', quantity:1, price: 500},
            {title: 'Mouse', quantity:1, price: 20},
            {title: 'Keyboard', quantity:1, price: 20}
        ]
    },
    computed: {
      output: function(){
          console.log('Computed');
          return this.counter > 10 ? 'Greater than 10' : 'Less than 10'
      },
        myStyle: function(){
          return {
              backgroundColor: this.color,
              width: `${this.width}px`,
              height: `${this.width}px`,
          }
        }
    },
    methods: {
        sayHello: function(){
            this.title = 'Foo';
            return this.title;
        },
        increase: function(step){
            this.counter += step;
            console.log(event.target);
        },
        getCoordinates: function(event){
            this.x = event.clientX;
            this.y = event.clientY;
        },
        result: function(){
            console.log('Method');
            return this.counter > 10 ? 'Greater than 10' : 'Less than 10'
        },
        addProduct: function(){
            this.products.push({title: 'Chair', quantity:1, price: 200});
        },
        removeProduct: function(){
            this.products.pop()
        },
        changeQuantity: function(){
            this.products[0].quantity++
        }
        // some: function(){
        //     event.stopPropagation();
        // }
    }
});