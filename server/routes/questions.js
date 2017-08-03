var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');//导入mongoose模块
var {create,Questions} = require('../model/questions');//导入模型数据模块
var Users = require('../model/users');//导入用户模块

/* GET questions listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a question');
});

//查询所有问题清单

// var item={
//             topic:'Vue.js',
//             image:'../../../static/images/admin.jpg',
//             name:'admin',
//             sign:'没有最好，只有更好！',
//             title:'vue，react之类的框架是不是弱化了对前端人员js水平的要求？',
//             like:15,
//             content:`<p>现在是面向组件化、面向函数开发，vue和react给前端带来的是一种思考问题解决方案的新思维，经过大量的实践之后，这种思维已经获得了很大一部分人的认同。</p>
//                 <p>计算机世界也像人类世界一样，会有越来越强大的工具，而不再是原始社会的刀耕火种，一些落后的浏览器也会慢慢的淘汰，也会有层出不穷的新框架出来让人眼前一亮，很多中年人现在回想起刚刚改革开放的时候，后悔自己错过了去拼去闯的机会，现在前端界也类似刚刚出现变革的时候，框架化开发席卷了前端行业，错过这次变革的人肯定很多，他们守旧、固化思维模式和开发方式，不出几年，就很难在适应前端市场的需求。</p>
//                 <p>面对如此多的框架和库，我们无法做到精通所有，但是要做到接受新的知识、新的理念，不要做一个几年后被行业淘汰的人。</p>
//                 <p>总得来看，现在对前端人员的要求提高了，这种提高是指学习新知识的能力、还要要大局观意识，不再做一个普通的切图仔。
//                 </p>`,
//             editDate:'昨天 10:17',
//             comment:3,
//             isCollapsed:true,
//             CollapseContent:`<p>现在是面向组件化、面向函数开发，vue和react给前端带来的是一种思考问题解决方案的新思维，经过大量的实践之后，这种思维已经获得了很大一部分人的认同。</p>
//                 <p>计算机世界也像人类世界一样，会有越来越强大的工具，而不再是原始社会的刀耕火种，一些落后的浏览器也会慢慢的淘汰，也会有层出不穷的新框架出来让人眼前一亮，很多中年人现在回想起刚刚改革开放的时候...`
//         };

router.get('/questions', function(req, res, next) {

 Questions.fetch(function(err, questions) {
   if(err) {
      console.log(err);
   } 
   var items=[]; 
   for (let i = 0,len=questions.length; i < len; i++) {//此处必须用let，使i在块级作用域中有效
     Users.findById(questions[i].userId,function(err, users) {
        if(err) {
         console.log(err);
        }  
        var item={}; 
        item['_id']=questions[i]._id;
        item['title']=questions[i].title;
        item['topic']=questions[i].topics[0];
        item['like']=questions[i].like;
        item['comment']=questions[i].comment;
        item['content']=questions[i].content;
        item['editDate']=questions[i].meta.updateAt.toLocaleString();
        item['isCollapsed']=true;
        item['CollapseContent']=questions[i].content.slice(0,294)+'...';
        if (!questions[i].isAnonymous) {
          item['name']=users.name;
          item['sign']='没有最好，只有更好！';
          item['image']='../../../static/images/admin.jpg';
        }else{
          item['name']="匿名用户";
          item['sign']='';
          item['image']='../../../static/images/admin.jpg';
        }        
        items.push(item);
        if (i===len-1) {
            res.json({"success":true,"questions":items});
        }
     })
   } 

 })

});

//插入新问题
router.post('/insert', function(req, res, next) {
  create({ title: req.body.title,
           topics: req.body.topics,
           content: req.body.content,
           isAnonymous:req.body.isAnonymous,
           userId:req.body.userId,
           like:0,
           comment:0},res);
})

module.exports = router;
