const express = require('express');
var router = express.Router();
var passport = require('passport');
var securityMiddle = require('../middleware/security')

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
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/profile',securityMiddle.isLoggedIn, function(req, res, next){
    res.render("users/profile", {error: req.flash('error'), message: req.flash('message')});
});

router.get('/logout', function(req, res, next){
    req.logout();
    req.flash('message', "tạm biệt, hẹn gặp lại bạn!");
    res.redirect("/");
});

module.exports = router;