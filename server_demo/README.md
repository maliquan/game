此项目目前使用东西如下，nodejs+mongoDB+mongoose+ejs+express

1，sudo npm install nodemon -g //全局安装server调试工具，启动server可以nodemon xx.js
2，app.use(express.static('160330102348')); //设置资源根目录
3，app.get("/", function(req, res){
  fs.readFile("./160330102348/index.html", "utf-8", function(err, data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});
app.listen(3000);
//访问根目录的时候，读取某个文件内容返回，如果没有"utf-8"则提示下载

4，nodejsAPI http://cnodejs.org/topic/548e53f157fd3ae46b2334fd
5,express及mongoDB教程http://www.tuicool.com/articles/jueARjE
6,mongoDB 在bin目录下执行shell ./mongod --dbpath="../game_db" 启动数据库，据说还有个－port指定端口，不过貌似不管用
7, bin下执行./mongo 启动shell模式  或者下载MongoBooster来直接操作数据库
8，mongoose 使用方法http://cnodejs.org/topic/548e54d157fd3ae46b233502
9，ejs模版使用方法http://blog.csdn.net/zhangxin09/article/details/18409119/

