const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
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

module.exports = router;