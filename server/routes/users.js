var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');//导入mongoose模块
var {create,Users} = require('../model/users');//导入模型数据模块

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//查询所有用户数据
router.get('/users', function(req, res, next) {

 Users.fetch(function(err, users) {
  if(err) {
   console.log(err);
  }  
  // res.json({"users":users});
  res.render('users',{title: '用户列表', users: users}) //这里也可以json的格式直接返回数据res.json({data: users});
 })
});

//按emailPhone查询用户信息是否正确
// http://localhost:3000/users/user?ep=1940796332@qq.com&pw=888888
router.post('/user', function(req, res, next) {
 var emailPhone=req.body.ep;
 var password=req.body.pw;
 Users.fetch(function(err, users) {
  if(err) {
   console.log(err);
  }  
  for (var user of users) {
    if (user.emailPhone===emailPhone&&user.password===password) {
      res.send({"success":true,"userInfo":{"name":user.name,
        "emailPhone":user.emailPhone,
        "password":user.password}})
      return;
    }
  }
  res.send({"success":false,"error":"用户名密码有误，请重新登录"})
 })
});

//插入用户数据
// http://localhost:3000/users/insert?n=admin&ep=1940796332@qq.com&pw=888888
router.post('/insert', function(req, res, next) {
  // var userinfo=req.body;
  // // 两种方式均可
  // create({    
  //    name:'xutt',
  //    emailPhone:'1940796332@qq.com',
  //    password:'888888'
  //   },res);
  var name=req.body.n;
  var emailPhone=req.body.ep;
  var password=req.body.pw;
  Users.fetch(function(err, users) {
    if(err) {
     console.log(err);
    }  
    for (var user of users) {
      if (user.emailPhone===emailPhone) {
        res.send({"success":false,"error":"该邮箱或手机号已经注册！"})
        return;
      }
    }
    Users.insert({    
       name:name,
       emailPhone:emailPhone,
       password:password
     },function(){
        res.json({"success":true});
    });
 })
})

module.exports = router;
