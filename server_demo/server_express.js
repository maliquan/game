var express = require('express');
var routes = require('./routes');
var ejs = require('ejs');
var util = require("util");
var querystring = require("querystring");
var bodyParser = require("body-parser");
var path = require('path');
var user = require("./routes/user");

//game
var game_login = require('./routes/game/login');

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
app.engine('html',ejs.__express) ;
app.set('view engine', 'html'); // 替换：app.set('view engine', 'ejs');
//设置静态资源目录
app.use(express.static(path.join(__dirname, "game")));
//获取clien通过post传过来的参数，需要这句
app.use(bodyParser.urlencoded({ extended: false })); 

//设置路由
app.get('/', routes.index);
app.get('/login', routes.login);// 此处还需要routes/index.js修改
app.post('/login', routes.doLogin);// 处理post请求，表单提交
app.get('/logout', routes.logout);// 处理注销
app.get('/welcome', routes.welcome);// 进入到首页
app.get('/users', user.list);
//game
app.post("/game/login", game_login.gameLogin)

app.listen(3004);


