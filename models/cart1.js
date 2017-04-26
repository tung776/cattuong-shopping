var product = require('./product');
var CartItem = function(product, qty) {
    this.id = product.id || "",
    this.product = product||{};
    this.qty = qty || 0;
    this.subTotal = this.product.price ? (this.product.price * this.qty) : 0;

}
module.exports = function(oldCart) {
    this.listItemInCart= oldCart.listItemInCart||[];
    this.totalPrice = oldCart.totalPrice||0;
    this.totalQty = oldCart.totalQty||0;
    this.add = function(product){
        var storedItem = this.listItemInCart.find(function(item){
            return item.id == product.id;
        });
        if(!storedItem) {
            storedItem = new CartItem(product, 1 );
            this.listItemInCart.push(storedItem);
        }
        else {
            storedItem.qty ++;
        }
        this.caculate();
    };
    
    this.caculate = function(){
        var qty = 0;
        var totalPrice = 0;
        for(var i = 0; i< this.listItemInCart.length; i++){
            qty +=  this.listItemInCart[i].qty;
            totalPrice += this.listItemInCart[i].subTotal;
        }
        this.totalPrice = totalPrice;
        this.totalQty = qty;
    }
};