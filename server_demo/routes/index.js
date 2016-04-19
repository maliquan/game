var User = require('../models/user').User;	//使用User模型，对应的users表
var mongoose = require('mongoose') ;	// 导入组件
mongoose.connect('mongodb://localhost/maliquan') ;	// 连接数据库
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongoDB is open");
    
});

exports.index = function(req, res){
  // res.sendfile("../game/index2.html");
  res.render('index', { title: 'Express' });
};
exports.login = function(req, res){
  res.render('login', { title: '用户登录' });
};
exports.doLogin = function(req, res){
	console.log("post request");
	//add
	userModel = new User();
	userModel.userid = req.body.userid;
	userModel.password = req.body.password;
	userModel.save(function(err){
		if(err){
			console.log("save error");
		}
	})
	//find
	var query_doc = {userid:req.body.userid , password:req.body.password} ;	// 固定数据
	User.count(query_doc,function(err,doc){// 直接利用mongodb的命令进行操作
		if(doc == 0) {	// 输入错误，没有此信息
			console.log(req.body.userid+"no"+req.body.password)
			res.redirect("/login");
		} else {	// 成功
			console.log("ok")
			res.redirect("/welcome?uid=" + req.body.userid) ;	// 地址重写
		}
		User.find({},function(err, docs){
			console.log(docs);
		})
		User.findOne({},function(err, doc){
			console.log(doc);
		})
	}) ;
};

exports.logout = function(req, res){
  res.render('login', { title: '用户注销' });
};
exports.welcome = function(req, res){
	// 如果是地址栏参数使用req.query.参数名称接收
	var user = {
		userid : req.query.uid 	}
  res.render('welcome', { title: '程序首页' , user:user });
};



//-----------------

exports.delete = function(id, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}

exports.editTitle = function(id, title, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.post_date = new Date();
            doc.title = title;
            doc.save(function(err) {
                if (err) {
                    util.log('FATAL '+ err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}