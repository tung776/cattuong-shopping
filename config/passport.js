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
        newUser.password = newUser.encryptPassword(req.body.password);
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
        console.log(user);
        return done(null, user);

        
    });
}));