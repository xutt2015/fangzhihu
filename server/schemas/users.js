var mongoose = require('mongoose');
 
//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
 name: String,
 emailPhone: String,
 password: String,
 // sign:'没有最好，只有更好！',
 // image:'../../../static/images/admin.jpg',
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
UsersSchema.pre('save', function(next) {
 if(this.isNew) {
  this.meta.createAt = this.meta.updateAt = Date.now();
 }else {
  this.meta.updateAt = Date.now();
 }
 
 next();
})
 
//查询的静态方法
UsersSchema.statics = {
 fetch: function(cb) { //查询所有数据
  return this
   .find()
   .sort('meta.updateAt') //排序
   .exec(cb) //回调
 },
 findById: function(emailPhone, cb) { //根据emailPhone查询单条数据
  return this
   .findOne({emailPhone: emailPhone})   
   .exec(cb)
 },
 insert:function(document,cb){
  this.create(document);
  cb();
  // return UsersSchema.save();
 },
 findByIdMuch: function(emailPhone,PEmailPhone,cb) { //根据emailPhone查询多条数据
  return this
   .find({$or:[
      {emailPhone: emailPhone},
      {emailPhone: PEmailPhone}
    ]})   
   .exec(cb)
 },
}
 
//暴露出去的方法
module.exports = UsersSchema 