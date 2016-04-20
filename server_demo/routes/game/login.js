var gameUser = require('../../models/game/login').GameUser;	//使用User模型，对应的users表

exports.gameLogin = function(req, res){
	var serchData = {name:req.body.userName , password:req.body.password} ;	// 固定数据
	gameUser.findOne(serchData,function(err,doc){// 直接利用mongodb的命令进行操作
		if(doc) {
			res.send({ret:0, data:doc});
		} else {
			userModel = new gameUser();
			userModel.name = req.body.userName;
			userModel.password = req.body.password;
			userModel.save(function(err){
				if(err){
					console.log(err);
				}
			})
			res.send({ret:0,data:userModel});
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