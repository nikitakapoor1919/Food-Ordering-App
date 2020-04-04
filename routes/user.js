var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/product');

var csrfProtectionToken = csrf();
router.use(csrfProtectionToken);

router.get('/menu/:id',isLoggedIn,function(req,res){
  username=req.user.email
  Product.find({_id:req.params.id})
  .exec(function(err,product){
    if(err) console.log("Error")
    else {
      var ProductChunk = []; var chunkSize = 3;
        for(var i=0; i < product.length; i += chunkSize){
          ProductChunk.push(product.slice(i, i + chunkSize));
        }
        console.log(ProductChunk);
        res.render('user/menu',{username:username,products:ProductChunk});
    } 
  })

})
/* GET and Product : user signup page. */
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect:'/',
    failureRedirect: '/user/signup',
    failureFlash: true
  }))
  
  /* GET and Product : user signin page. */
  router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect:'/',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));
  
  router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/');
  });
  
  router.use('/', isNotLoggedIn, function(req,res, next){
    next();
  });

module.exports = router;
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/user/signin');
}

function isNotLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}