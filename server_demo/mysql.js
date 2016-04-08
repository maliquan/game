var sys = require("sys");
var Client = require("mysql").Client;
var client = new Client();

client.user = "someUser";
client.passwort = "password";
client.connect(function(error, results){
  if(error){
    console.log(error);
  }else{
    console.log("connected to mysql");
  }
});