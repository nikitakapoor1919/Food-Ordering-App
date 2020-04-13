var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Restaurant = require('../models/Restaurant');
var Menu = require('../models/foodMenu');

var csrfProtectionToken = csrf();
router.use(csrfProtectionToken);

router.get('/restaurant/:id',isLoggedIn,function(req,res){
  username=req.user.email
  Restaurant.find({_id:req.params.id})
  .exec(function(err,Restaurant){
    if(err) console.log("Error")
    else {
      var RestaurantChunk = []; var chunkSize = 3;
        for(var i=0; i < Restaurant.length; i += chunkSize){
          RestaurantChunk.push(Restaurant.slice(i, i + chunkSize));
        }
        console.log(RestaurantChunk);
       
        res.render('user/restaurant',{username:username,Restaurants:RestaurantChunk});
    } 
  })

})
router.get('/restaurant/menu/:id',isLoggedIn,function(req,res){
  username=req.user.email
  Menu.find({rid:req.params.id})
  .exec(function(err,menu){
    if(err) console.log("Error")
    else {
      var MenuChunk = []; var chunkSize = 3;
        for(var i=0; i < menu.length; i += chunkSize){
          MenuChunk.push(menu.slice(i, i + chunkSize));
        }
        console.log(MenuChunk);
       
        res.render('user/menu',{username:username,items:MenuChunk});
    } 
  })

})
//Add to Cart
router.get('/shopping-cart',isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.render('shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
/* GET and Post : user signup page. */
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect:'/',
    failureRedirect: '/user/signup',
    failureFlash: true
  }))
  
  /* GET and Post : user signin page. */
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