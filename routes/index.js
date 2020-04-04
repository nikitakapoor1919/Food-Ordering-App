var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res) {
    Product.find(function(err, docs){
      var productChunk = []; var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        productChunk.push(docs.slice(i, i + chunkSize));
      }
      console.log(productChunk);
      res.render('index', { title: 'Food-Ordering App', products: productChunk});
    });
});
//PostMan Checking
router.get('/products', async (req, res) => {
    const product = await Product.find({});
  
    try {
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });
 
router.post('/product', async (req, res) => {
    const product = new Product(req.body);
  
    try {
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  }); 
   
 router.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
router.patch('/product/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    await Product.save()
    res.send(product)
  } catch (err) {
    res.status(500).send(err)
  }
})
module.exports = router;