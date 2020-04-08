var express = require('express');
var router = express.Router();
var Restaurant = require('../models/Restaurant');
var Menu=require('../models/foodMenu')

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