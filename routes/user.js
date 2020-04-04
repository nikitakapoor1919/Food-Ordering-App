var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtectionToken = csrf();
router.use(csrfProtectionToken);


/* GET and POST : user signup page. */
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect:'/',
    failureRedirect: '/user/signup',
    failureFlash: true
  }))
  
  /* GET and POST : user signin page. */
  router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect:'/',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));
  
  

module.exports = router;