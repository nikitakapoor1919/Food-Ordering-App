var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type:String, required: false, default: 'BestSeller'},
    address:{type:String},
    PhoneNumber:{type:Number},
    email:{type:String},
    foodMenu:[{
        item: String,
        price: {type: Number},
        imagePath: {type: String}
    }]
});

module.exports = mongoose.model('Product', schema);