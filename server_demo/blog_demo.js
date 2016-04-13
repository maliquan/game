var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.static('game'));

app.get("/", function(req, res){
  fs.readFile("./game/index.html", "utf-8", function(err, data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});
app.listen(3001);