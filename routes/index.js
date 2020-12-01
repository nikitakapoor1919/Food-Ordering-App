var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var Menu=require('../models/foodMenu')
var Cart=require('../models/cart')

router.get('/', function(req, res) {
    Restaurant.find(function(err, docs){
      var RestaurantChunk = []; var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        RestaurantChunk.push(docs.slice(i, i + chunkSize));
      }
      console.log(RestaurantChunk);
      res.render('index', { title: 'Food-Ordering App', Restaurants: RestaurantChunk});
    });
});

router.get('/add-to-cart/:id',function(req,res){
  var MenuId=req.params.id
  var cart=new Cart(req.session.cart? req.session.cart:{})

  Menu.findById(MenuId,function(err,Menu){
    if(err)
    return res.redirect('back')
    cart.add(Menu,Menu.id)
    req.session.cart=cart
    console.log(req.session.cart)
    res.redirect('back')
  })
})
router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

//PostMan
router.get('/restaurants', async (req, res) => {
  const restaurant = await Restaurant.find({});

  try {
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/restaurant', async (req, res) => {
  const restaurant = new Restaurant(req.body);

  try {
    await restaurant.save();
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
}); 
router.delete('/restaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)

    if (!restaurant) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
router.patch('/restaurant/:id', async (req, res) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body)
    await Restaurant.save()
    res.send(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
})
router.post('/restaurant/menu', async (req, res) => {
  const menu = new Menu(req.body);

  try {
    await menu.save();
    res.send(menu);
  } catch (err) {
    res.status(500).send(err);
  }
}); 
module.exports = router;