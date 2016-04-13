var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  // fs.readFile("../game/index.html", "utf-8", function(err, data){
  //   if(err){
  //     res.send(err);
  //   }else{
  //     res.send(data);
  //   }
  // });
  res.sendfile("../game/index.html");
});

module.exports = router;
