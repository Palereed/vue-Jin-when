const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = new Schema({
  weather : String,  // 天气
  spirit  : String,  // 心情
  title   : String,  // 独白标题
  content : String,  // 独白内容
  time    : Date     // 发布时间
})