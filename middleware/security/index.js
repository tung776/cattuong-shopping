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
    console.log("gohere" + res.locals.currentUser);
    next();
};

module.exports = middleware;