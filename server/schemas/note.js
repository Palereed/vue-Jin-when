const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = new Schema({
  title       : String,  // 标题
  classifyVal : String,  // 分类
  content     : String,  // 内容
  preface     : String,  // 引语(为了美观~~~)
  abstract    : String,  // 摘要
  writer      : String,  // 作者
  radio       : String,  // 原创or转载
  link        : String,  // 转载信息
  time        : Date,    // 发布时间
  watch       : {        // 是否为管理员
    type: Number,
    default: 0
  }
})