var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Nguyễn Thanh Tùng', error: req.flash('error'), message: req.flash('message') });
});

module.exports = router;
