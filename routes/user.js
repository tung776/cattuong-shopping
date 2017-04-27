const express = require('express');
var router = express.Router();
var passport = require('passport');
var securityMiddle = require('../middleware/security');
var orderModel = require("../models/order");

//const userModel = require('../models/user');
router.get('/signup', function(req, res, next){
    var errorMessage = req.flash('error');
    res.render('users/signup', {csrfToken: req.csrfToken(), error: errorMessage, message: req.flash('message')});
});
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next){
    res.render("users/signin", {csrfToken: req.csrfToken(), error: req.flash('error'), message: req.flash('message')});    
});

router.post('/signin', passport.authenticate('local.signin', {

    failureRedirect: '/users/signin',
    failureFlash: true
}), function(req, res, next){
    if(req.session.oldUrl){
        // var oldUrl = req.session.oldUrl;
        // req.session.oldUrl = null;
        // res.redirect(oldUrl);
        res.redirect("/products");
        
    }
    else {
        res.redirect('/users/profile');
    }
});

router.get('/profile',securityMiddle.isLoggedIn, function(req, res, next){
    orderModel.find({user: req.user}, function(err, foundOrders){
        if(err) {
            console.log(err);
        }
        else {
            //console.log(JSON.stringify(foundOrders));
            
            
            res.render("users/profile",{orders: foundOrders});
        }
    });
    
});

router.get('/logout', function(req, res, next){
    req.logout();
    req.flash('message', "tạm biệt, hẹn gặp lại bạn!");
    res.redirect("/");
});

module.exports = router;