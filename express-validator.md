trước khi sử dụng express-validator ta cần cài đặt validator:
npm install --save express-validator

=========================================================================
    app.js
=========================================================================
var validator = require('express-validator');
app.use(validator());
=========================================================================
    config/passport.js
=========================================================================
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
=========================================================================