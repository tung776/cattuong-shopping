var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var securityMiddleware = require('./middleware/security');
var connectMongo = require('connect-mongo')(session);
//===========================================================================================
//Require router
//===========================================================================================
var index = require('./routes/index');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');
//===========================================================================================
//database conect
mongoose.connect('mongodb://localhost/cattuongShopping');
//===========================================================================================
//application config
//===========================================================================================
var app = express();
//config passport

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: "layouts", extname: '.hbs' }));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret: "nguyenthanhtung", 
  resave: false, 
  saveUninitialized: false,
  store: new connectMongo({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 24*60*60 * 1000 }//24 gio x 60 phut x 60 giay x1000 mili giay = 1 ngay
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(express.static('public'));


//=============================================================================================
//routes
//=============================================================================================
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    next();
});
app.use('/', index);
app.use('/products', productRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
