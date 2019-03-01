const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let handler = (req, res, action, file, wfile = file) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile('server/db/userCart.json', newCart, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
};

module.exports = handler;