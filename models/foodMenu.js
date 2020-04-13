var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        rid:{type: mongoose.Schema.ObjectId, ref: 'restaurant'},
        name: {type:String,required:true},
        price: {type: Number,required:true},
        category:{type:String},
        imagePath: {type: String}
});

module.exports = mongoose.model('menu', schema);