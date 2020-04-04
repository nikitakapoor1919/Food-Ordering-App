var mongoose=require('mongoose')
var Schema=mongoose.Schema
var bcrypt=require('bcrypt-nodejs')

var restaurantSchema=new Schema({
    name:{type:String},
    address:{type:String},
    PhoneNumber:{type:Number},
    email:{type:String,required:true},
    password:{type:String,required:true},
    photo:{type:String}
})
restaurantSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
  };
  
restaurantSchema.method.validPassword = function(password){
   return bcrypt.compareSync(password, this.password);
 };

module.exports=mongoose.model('restaurant',restaurantSchema)