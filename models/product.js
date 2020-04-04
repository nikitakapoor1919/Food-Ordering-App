var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type:String, required: false, default: 'BestSeller'},
    foodMenu:[{
        item: String,
        price: {type: Number, required: true},
        imagePath: {type: String, required: true}
    }]
});

module.exports = mongoose.model('Product', schema);