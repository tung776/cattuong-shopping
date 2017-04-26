var mongoose = require('mongoose');
module.exports = function carts(oldCart) {
    //oldCart là đối tượng được lưu trong session
    //oldCart có thể là một đối tượng rỗng
    this.itemsInCart = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    //the medthods go here
    this.add = function(productItem, id) {
        var storedItem = this.itemsInCart[id];
        if(!storedItem) {
            storedItem = this.itemsInCart[id] = {item: productItem, qty: 0, subTotal: 0 };
        }
        // console.log('storedItem:' + JSON.stringify(storedItem));
        storedItem.qty ++;
        storedItem.subTotal = storedItem.item.price * storedItem.qty;
        this.totalQuantity ++;
        this.totalPrice +=storedItem.subTotal;
        console.log("generateArray: " + JSON.stringify(this.generateArray()));
         console.log("this" + JSON.stringify(this));
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var i in this.itemsInCart) {
            arr.push(this.itemsInCart[i]);
        }
        return arr;
    };
};