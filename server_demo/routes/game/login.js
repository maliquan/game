var gameUser = require('../../models/game/login').GameUser;	//使用User模型，对应的users表

exports.gameLogin = function(req, res){
	var serchData = {name:req.body.userName , password:req.body.password} ;	// 固定数据
	console.log("player login"+req.body.userName)
	gameUser.findOne(serchData,function(err,doc){// 直接利用mongodb的命令进行操作
		if(doc) {
			console.log("找到返回");
			res.send({ret:0, data:doc});
		} else {
			console.log("未找到创建");
			userModel = new gameUser();
			userModel.name = req.body.userName;
			userModel.password = req.body.password;
			userModel.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log("save success");
				}
			})
			res.send({ret:0,ret:"new player"});
		}
		// gameUser.find({},function(err, docs){
		// 	console.log(docs);
		// })
		// gameUser.findOne({},function(err, doc){
		// 	console.log(doc);
		// })
		// gameUser.count(query_doc,function(err,doc){
		// }
	}) ;
}