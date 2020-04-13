var express = require('express');
var router = express.Router();
var Restaurant = require('../models/Restaurant');
var Menu = require('../models/foodMenu');

router.get('/', function(req, res) {
    Restaurant.find(function(err, docs){
      var RestaurantChunk = []; var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        RestaurantChunk.push(docs.slice(i, i + chunkSize));
      }
      console.log(RestaurantChunk);
      res.render('admin/dashboard', { title: 'Food-Ordering App', Restaurants: RestaurantChunk});
    });
});
//Add Restaurant
router.get('/add-restaurant',function(req,res){
  res.render('admin/add-restaurant')
})
router.post('/add-restaurant',async function(req,res){
  const restaurant = new Restaurant(req.body);

  try {
    await restaurant.save();
   res.redirect('/admin')
  } catch (err) {
    console.log(err)
  }
 });
 //Modify Restaurant
 router.get('/modify/:id',function(req,res){
  Restaurant.find({_id:req.params.id})
  .exec(function (err,restaurant){
    if(err) console.log("Error")
    var RestaurantChunk = []; var chunkSize = 3;
      for(var i=0; i < restaurant.length; i += chunkSize){
        RestaurantChunk.push(restaurant.slice(i, i + chunkSize));
      }
      console.log(RestaurantChunk);
    res.render('admin/modify',{Restaurant:RestaurantChunk})
  })
})

router.post('/modify/:id', (req, res) => {
  console.log('Editing')
 Restaurant.findOneAndUpdate(
    {_id:req.params.id},{$set:req.body},{upsert:true},
    function(err,user){
      if(err)
      console.log("Error")
      else{
        res.redirect("/admin")
      }
    }
  )
})
//Delete Restaurant

router.get('/delete/:id', (req, res) => {
  var id=req.params.id
  Restaurant.deleteOne({_id:id},function(err,restaurant){
    if(err){
      console.log("Error")
    }
    else{
      console.log(restaurant)
      res.redirect("/admin")
    }
  })
})
//Food Menu
router.get('/menu/:id',function(req,res){
  var rid=req.params.id
  Menu.find({rid:req.params.id})
  .exec(function(err,menu){
    if(err) console.log("Error")
    else {
      var MenuChunk = []; var chunkSize = 3;
        for(var i=0; i < menu.length; i += chunkSize){
          MenuChunk.push(menu.slice(i, i + chunkSize));
        }
        console.log(MenuChunk);
       
        res.render('admin/menu',{items:MenuChunk,rid:rid});
    } 
  })

})
router.post('/menu/:id',async (req,res)=>{
 var id=req.params.id
  const menu = new Menu({name:req.body.name,price:req.body.price,rid:req.params.id});
  try {
    await menu.save();
   res.redirect('/admin')
  } catch (err) {
    console.log(err)
  }
})
//Food Menu Delete

router.get('/menu-delete/:id', (req, res) => {
  var id=req.params.id
  Menu.deleteOne({_id:id},function(err,menu){
    if(err){
      console.log("Error")
    }
    else{
      console.log(menu)
      res.redirect("..")
    }
  })
})
module.exports = router;