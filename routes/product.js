const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
var cartModel = require('../models/cart');
var middlewareSecurity = require('../middleware/security');
router.get('/', function(req, res, next){
    productModel.find({},function(err, foundProducts){
        if(err) {
            console.log(err);
        }
        else {
            res.render('products/index', {
                title: "products",
                products: foundProducts
            });
        }
    });
    
});

router.post("/", function(req, res, next){
    res.redirect("/");
});

router.get('/add-to-cart/:productId',middlewareSecurity.isLoggedIn, function(req, res, next) {
    var productId = req.params.productId;
    var cart = new cartModel(req.session.cart ? req.session.cart : {});
    productModel.findById(productId, function(err, foundProduct){
        if(err) {
            console.log(err);
            req.flash('error', err);
            res.redirect('/');
        }
        else {
            cart.add(foundProduct, productId);
            req.session.cart = cart;
            // console.log(req.session.cart);
            req.flash('message', 'đã thêm '+foundProduct.title + 'vào giỏ hàng thành công');
            res.redirect('/products');
        }
    });
});

module.exports = router;