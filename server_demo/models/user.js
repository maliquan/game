var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;
var UserSchema = new Schema({
  userid : String ,
  name : String ,
  password : String
}) ;
exports.User = mongoose.model('user',UserSchema) ;//创建user表，默认会加个s，变成users