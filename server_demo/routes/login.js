var express = require('express');
var router = express.Router();

router.post('/account/login', function (req, res) {
  // res.header("Access-Control-Allow-Origin", "*");//跨域
  // util.inspect(req.params);//对象转成字符串
  // querystring.parse(req.params);//client参数转成对象
  // req.params//client通过get传来的参数
  // req.body//client通过post传来的参数

  console.log(req.body.reqsId);
  res.send({name:"user", age:22});
});

module.exports = router;
