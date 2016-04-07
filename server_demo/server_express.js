var express = require('express');
var app = express();
var util = require("util");
var querystring = require("querystring");
var bodyParser = require("body-parser");

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//获取clien通过post传过来的参数，需要这句
app.use(bodyParser.urlencoded({ extended: false })); 

app.post('/account/login', function (req, res) {
  // res.header("Access-Control-Allow-Origin", "*");//跨域
  // util.inspect(req.params);//对象转成字符串
  // querystring.parse(req.params);//client参数转成对象
  // req.params//client通过get传来的参数
  // req.body//client通过post传来的参数

  console.log(req.body.reqsId);
  res.send({name:"user", age:22});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});