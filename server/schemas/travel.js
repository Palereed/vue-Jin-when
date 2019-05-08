const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = new Schema({
  title   : String,  // 标题
  link    : String,  // 地址
  content : String,  // 内容
  time    : Date    // 发布时间
})