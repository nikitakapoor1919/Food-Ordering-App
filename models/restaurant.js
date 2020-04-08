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
    topDishes:{type:String},
    averageCost:{type:String},
});

module.exports = mongoose.model('restaurant', schema);