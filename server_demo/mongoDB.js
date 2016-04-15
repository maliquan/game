var mongoose = require('mongoose');

function mongoDB(openFun){
	//创建一个数据库连接
	mongoose.connect('mongodb://localhost/accounts');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
  		console.log("mongoDB is open");
  		openFun();
	});
}

mongoDB.prototype.yy = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection'); //获得数据库中的集合(类似关系数据库中的表)
        collection.find({},{},function(e,docs){ //取得所有的集合数据, 渲染到页面上,关键字是userlist
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

mongoDB.prototype.xxx = function(){
  var userSchema = new mongoose.Schema({
      name:{type: String, unique: true}, 
      password:String
    }, 
    {collection: "accounts"}
  );
  var User = mongoose.model('accounts', userSchema);

  var lisi = new User({name:"LiSi2", password:"123456"});
  lisi.save(function(err, doc){
    if(err)console.log(err);
    else console.log(doc.name + ' saved');
  });  
  User.findOne({name:"LiSi2"}, function(err, doc){
    if(err) console.log(err);
    else console.log(doc.name + ", password - " + doc.password);
  });
}
module.exports = mongoDB;