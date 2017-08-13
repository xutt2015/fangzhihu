var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');//导入mongoose模块
var Comments = require('../model/comments');//导入模型数据模块
var {create,Questions} = require('../model/questions');//导入问题模块
var Users = require('../model/users');//导入用户模块

/* GET comment page. */
router.get('/', function(req, res, next) {
  res.send('respond with a comment');
});


//查询所有评论数据
//http://127.0.0.1:3000/comments/comments?q=5983268b271cee96314a276d
router.get('/comments', function(req, res, next) {
 var qID=req.query.q;
 Comments.fetchWithQID(qID,function(err, comments) {
  if(err) {
    console.log(err);
  }  
  var items=[];
  for (let i = 0,len=comments.length; i < len; i++) {
    let PEmailPhone;
    if(comments[i].PID!==''){
      for (var j = 0; j < comments.length; j++) {
        if (comments[i].PID == comments[j]._id) {
          PEmailPhone=comments[j].emailPhone;
          break;
        }
      }
    }
    else{
      PEmailPhone='';
    }
    Users.findByIdMuch(comments[i].emailPhone,PEmailPhone,function(err,users){
      var user=users[0];
      var puser=comments[i].emailPhone==PEmailPhone?users[0]:users[1];
      var item={};
      item["_id"]=comments[i]._id;
      item["userImage"]='../../../static/images/admin.jpg';
      item["userName"]=user.name;
      item["content"]=comments[i].content;
      item["like"]=comments[i].like;
      item["dislike"]=comments[i].dislike;
      var desc=new Date().getTime()-comments[i].meta.createAt.getTime();
      var d = Math.floor(desc/(24*3600*1000));
      var h = Math.floor(desc%(24*3600*1000)/(3600*1000));
      var m = Math.floor(desc%(24*3600*1000)%(3600*1000)/(60*1000));
      item["createAt"]=d?d+"天前":(h?h+"小时前":(m?m+"分钟前":"刚刚"));
      item["RootID"]=comments[i].RootID;
      item["PName"]=puser?puser.name:"";
      item["expand"]=false;
      items.push(item);
      if (i===len-1) {
        res.json({"success":true,"comments":items}) 
      }
    });
  }
})
});

//根据rootID查询所有回复数据
// http://127.0.0.1:3000/comments/replay?r=598c3e6106ffe54f89928b34
router.get('/replay', function(req, res, next) {
 var RootID=req.query.r;
 Comments.fetchWithRootID(RootID,function(err, comments) {
  if(err) {
   console.log(err);
 } 
 var items=[];
 for (let i = 0,len=comments.length; i < len; i++) {
  let PEmailPhone;
  if(comments[i].PID!==''){
    for (var j = 0; j < comments.length; j++) {
      if (comments[i].PID == comments[j]._id) {
        PEmailPhone=comments[j].emailPhone;
        break;
      }
    }
  }
  else{
    PEmailPhone='';
  }
  Users.findByIdMuch(comments[i].emailPhone,PEmailPhone,function(err,users){
    var user=users[0];
    var puser=comments[i].emailPhone==PEmailPhone?users[0]:users[1];
    var item={};
    item["_id"]=comments[i]._id;
    item["userImage"]='../../../static/images/admin.jpg';
    item["userName"]=user.name;
    item["content"]=comments[i].content;
    item["like"]=comments[i].like;
    item["dislike"]=comments[i].dislike;
    var desc=new Date().getTime()-comments[i].meta.createAt.getTime();
    var d = Math.floor(desc/(24*3600*1000));
    var h = Math.floor(desc%(24*3600*1000)/(3600*1000));
    var m = Math.floor(desc%(24*3600*1000)%(3600*1000)/(60*1000));
    item["createAt"]=d?d+"天前":(h?h+"小时前":(m?m+"分钟前":"刚刚"));
    item["RootID"]=comments[i].RootID;
    item["PName"]=puser?puser.name:"";
    item["expand"]=false;
    items.push(item);
    if (i===len-1) {
      res.json({"success":true,"comments":items}) 
    }
  });
} 
})
});

//插入评论数据
router.post('/insert', function(req, res, next) {
  var questionID=req.body.questionID;
  var emailPhone=req.body.emailPhone;
  var name=req.body.name;
  var content=req.body.content;
  Comments.insert({    
    questionID: questionID,
    emailPhone: emailPhone,
    content: content,
    like:0,
    dislike:0,
    PID:'',
    RootID:''
  },function(err,comments){
      //更新问题评论条数
      Questions.findById(questionID,function(err,question){
        let comment=question.comment+1;
        Questions.updateComment(questionID,comment,function(err){
          if(err) {
            res.json({"success":false,"error":err});
          } 
          res.json({"success":true,"id":comments._id});
        })
      })
    });
})

//插入回复数据
router.post('/replayInsert', function(req, res, next) {
  var questionID=req.body.questionID;
  var emailPhone=req.body.emailPhone;
  var content=req.body.content;
  var PID=req.body.PID;
  var RootID=req.body.RootID;
  Comments.insert({    
    questionID: questionID,
    emailPhone: emailPhone,
    content: content,
    like:0,
    dislike:0,
    PID:PID,
    RootID:RootID
  },function(err,comments){
      if(err) {
        res.json({"success":false,"error":err});
      } 
      res.json({"success":true,"id":comments._id});
    });
})

//点赞updateLike:function(id,like,cb){
router.post('/updateLike', function(req, res, next) {
  var id=req.body._id;
  var like=req.body.like;
  Comments.updateLike(id,like,function(err){
    if(err) {
      res.json({"success":false,"error":err});
    } 
    res.json({"success":true});
  })
});

module.exports = router;
