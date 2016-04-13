var express = require('express');
var util = require("util");
var querystring = require("querystring");
var bodyParser = require("body-parser");
var path = require('path');
var users = require('./routes/users');
var index = require("./routes/index");
// var favicon = require('serve-favicon');


var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// app.use(favicon(path.join(__dirname, 'game', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//设置静态资源目录
app.use(express.static(path.join(__dirname, "game")));
//获取clien通过post传过来的参数，需要这句
app.use(bodyParser.urlencoded({ extended: false })); 
//设置路由
app.use("/users", users);
app.use("/", index);

var server = app.listen(3000, function () {});