var mongoose = require('mongoose');
 
//申明一个mongoons对象
var QuestionsSchema = new mongoose.Schema({
 title: String,
 topics: Array,
 content: String,
 isAnonymous:Boolean,
 userId:String,
 // CollapseContent:String,
 like:Number,
 comment:Number,
 meta: { 
  createAt: {
   type: Date,
   default: Date.now()
  },
  updateAt: {
   type: Date,
   default: Date.now()
  }
 }
})
 
//每次执行都会调用,时间更新操作
QuestionsSchema.pre('save', function(next) {
 if(this.isNew) {
  this.meta.createAt = this.meta.updateAt = Date.now();
 }else {
  this.meta.updateAt = Date.now();
 }
 
 next();
})
 
//查询的静态方法
QuestionsSchema.statics = {
 fetch: function(cb) { //查询所有数据
  return this
   .find()
   .sort('meta.updateAt') //排序
   .exec(cb) //回调
 },
 findById: function(id, cb) { //根据emailPhone查询单条数据
  return this
   .findOne({_id: id})   
   .exec(cb)
 },
 insert:function(document,cb){
  this.create(document);
  cb();
 }
}
 
//暴露出去的方法
module.exports = QuestionsSchema 