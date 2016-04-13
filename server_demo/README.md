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