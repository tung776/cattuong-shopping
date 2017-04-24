Để sử dụng passport cần cài đặt 

npm install --save passport, passport-local, express-session, connect-flash, bcrypt-nodejs
=============================================================================
        app.js      (Thứ tự sắp xếp app.use(session và app.use(passport) rất quan trọng
        nếu sắp xếp ngược sẽ khiến ứng dụng chạy không đúng như mong muốn
=============================================================================
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash')

var userRouter = require('./routes/user');
app.use(flash());
app.use(session({
  secret: "nguyenthanhtung", 
  resave: false, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
==============================================================================
        config/passport.js
==============================================================================
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var userModel = require("../models/user");

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    userModel.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use("local.signup", new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //kiểm tra email và password
    req.checkBody('email', "không đúng định dạng email!")
        .notEmpty()
        .isEmail();
    req.checkBody('password', "Mật khẩu cần nhiều hơn 4 ký tự!")
        .notEmpty()
        .isLength({min:4});
    
    var errors = req.validationErrors();
    var messages = [];
    if(errors) {
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    userModel.findOne({
        email: email
    }, function(err, user){
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false, { message: "email đã được sử dụng. Nếu bạn đã đăng ký bạn hãy đăng nhập" });
        }
        var newUser = new userModel({
            email: email
        });
        newUser.password = newUser.encryptPassword(newUser.password);
        newUser.save(function(err, result){
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use("local.signin", new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //kiểm tra email và password
    req.checkBody('email', "không đúng định dạng email!")
        .notEmpty()
        .isEmail();
    req.checkBody('password', "Mật khẩu cần nhiều hơn 4 ký tự!")
        .notEmpty()
        .isLength({min:4});
    
    var errors = req.validationErrors();
    var messages = [];
    if(errors) {
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    userModel.findOne({
        email: email
    }, function(err, user){
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false, req.flash('error', "email này chưa được đăng ký!"));
        }
        
        if(!user.validPassword(req.body.password)){
            return done(null, false, 
                    req.flash('error', "mật khẩu không đúng"));
        }
        console.log(user)
;        return done(null, user);

        
    });
}));
===========================================================================
        user.js
===========================================================================
const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required: true}
});
schema.methods.encryptPassword = function(password){
     return bcrypt.hashSync(password);
};

schema.methods.validPassword = function(password) {

    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", schema);
============================================================================
        user routes
============================================================================
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
=============================================================================
        signup.hbs
=============================================================================
<div class="container">
    <div class="row">
        <div id="SignupOrSignin" class = text-center>
            <h2>Sign Up</h2>
            {{> message}}
            <form action = "/users/signup" method = "POST">
                <div class="form-group">
                    <label>Email
                        <input type = "text" name = "email" placeholder = "email" class = "form-control">
                    </label>
                </div>
                <div class="form-group">
                    <label> Password
                        <input type = "password" name = "password" placeholder = "password" class = "form-control">
                    </label>
                </div>
                <input type = "hidden" name = "_csrf" value = "{{csrfToken}}">
                <button class="btn btn-success">Sign up</button>
            </form>
        </div>
    </div>
</div>
=============================================================================
        message.hbs
=============================================================================
{{#if errorMessage }}
    <div class="alert alert-danger">
        {{# each errorMessage}}
            <p>{{this}}</p>
        {{/each}}
    </div>
{{/if}}
{{#if message}}
    <div class="alert alert-success">
    {{# each message}}
        <p>{{this}}</p>
    {{/each}}
    </div>
{{/ if}}
=============================================================================
middleware/security/index.js
=============================================================================
var middleware = {};
middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        req.flash("error", "Bạn cần đăng nhập trước khi sử dụng chức năng này");
        res.redirect('/');
    }
};

middleware.getCurrentUserInfor = function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
}

module.exports = middleware;
=============================================================================