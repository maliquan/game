//使用模块
// var test1 = require("./test1");
// var hello = new test1("test1");
// hello.sayHello("hello");

//获取get参数
// var http = require("http");
// var url = require("url");
// var util = require("util");
// var server = new http.Server();
// server.on('request', function(req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.end(util.inspect(url.parse(req.url, true)));
// });
// server.listen(3000);

//post
var http = require("http");
var querystring = require("querystring");
var util = require("util");
http.createServer(function(req, res){
	var post = "";

	req.on("data", function(chunk){
		post += chunk;
	})

	req.on("end", function(){
		post = querystring.parse(post);
	    messageHandler(req, res, post);
	});
}).listen(3000);

function messageHandler(req, res, post){
	res.writeHead(200,{
      'Content-Type':'text/plain',
      'Access-Control-Allow-Origin':'*'//跨域解决，发布的时候去掉*
    });

	var msg = {};
	switch(req.url){
		case "/account/login":
			msg = login(post);
		break;
		default:
			msg = "没有这个命令"
	}
	res.end(util.inspect(msg));//inspect将一个对象转换成字符串
}

function login(post){
	var msg = {name:"user", age:22};
	return msg;
}