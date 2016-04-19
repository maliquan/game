var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;
var loginSchema = new Schema({
  name : {type:String, unique:true},
  password : String,
  createTime : {type:Date , default:Date.now},
  // foodNum : {type:Number , default:100},
  // goldNum : {type:Number , default:100},
  // diamondNum : {type:Number , default:0},
  // curChapterId : {type:Number , default:1},
  // maxChapterId : {type:Number , default:1000},
  // chapterList : {type:Array, default:[{id:1,starNum:3},{id:2,starNum:3}]}
}) ;
exports.GameUser = mongoose.model('gameUser',loginSchema) ;//创建user表，默认会加个s，变成users
