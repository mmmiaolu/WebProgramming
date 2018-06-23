/*
Name：Miao Lu
Project: todoMVC
*/
var express = require('express');
var app = express();
var fs = require("fs");

//静态文件夹路径
app.use(express.static('/public'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "todoMVC.html" );
})

app.get('/todoMVC.html', function (req, res) {
  res.sendFile( __dirname + "/" + "todoMVC.html" );
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
