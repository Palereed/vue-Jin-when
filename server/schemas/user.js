const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = new Schema({
  username  : String,  // 账号
  userpass  : String,  // 密码
  nickname  : String,  // 昵称
  avatar    : String,  // 头像
  safepass  : Number,  // 密保
  time      : Date,    // 注册时间
  isAdmin   : {        // 是否为管理员
    type: Boolean,
    default: false
  }
})