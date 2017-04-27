const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
var cartModel = require('../models/cart1');
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
    var cart = new cartModel(req.session.cart ? req.session.cart : []);
    productModel.findById(productId, function(err, foundProduct){
        if(err) {
            console.log(err);
            req.flash('error', err);
            res.redirect('/');
        }
        else {
            cart.add(foundProduct);
            req.session.cart = cart;
            console.log("req.session.cart" + JSON.stringify(req.session.cart));
            req.flash('message', 'đã thêm '+foundProduct.title + 'vào giỏ hàng thành công');
            res.redirect('/products');
        }
    });
});

router.get('/shopping-cart',middlewareSecurity.isLoggedIn, function(req, res, next){
    if(req.session.cart) {
        var cart = new cartModel(req.session.cart);
        // console.log('=========================================================================');
        // console.log(cart.generateArray());
        // console.log('=========================================================================');
        res.render('products/cart', {cart: cart, qty: cart.totalQty, totalPrice: cart.totalPrice});  
    }
});

router.get('/checkout',middlewareSecurity.isLoggedIn, function(req, res, next){
    if(req.session.cart) {
        res.render('products/checkout', {total: req.session.cart.totalPrice, csrfToken:req.csrfToken()});    
    }
    else {
        req.flash("error", "Không tìm thấy sản phẩm nào trong giỏ hàng của bạn");
        req.flash("message", "Bạn đang muốn mua hàng, hãy chọn sản phẩm trước khi thanh toán");
        res.redirect("/products");
    }
    
});

router.post('/checkout', middlewareSecurity.isLoggedIn, function(req, res, next){
    if(!req.session.cart) {
        req.flash("error", "Không tìm thấy sản phẩm nào trong giỏ hàng của bạn");
        req.flash("message", "Bạn đang muốn mua hàng, hãy chọn sản phẩm trước khi thanh toán");
        return res.redirect("/products");    
    }
    var cart = new cartModel(req.session.cart);
    
    var stripe = require("stripe")(
      "sk_test_T7vBx12MSmyWvAtXAnTtADyZ"
    );
    
    stripe.charges.create({
      amount: cart.totalPrice,
      currency: "vnd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Test Charge for soncattuong.com"
    }, function(err, charge) {
      // asynchronously called
      if(err) {
          req.flash("error", "Đã có lỗi tron giao dịch");
          req.flash("error", err);
          return res.redirect('/products/checkout');
      }
      else {
          req.flash("message", "Chúc mừng bạn đã thanh toán thành công. Cám ơn bạn đã sử dụng dịch vụ của chúng tôi");
          req.session.cart = null;
          res.redirect("/");
      }
    });
});

module.exports = router;