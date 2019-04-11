const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = new Schema({
  userid    : String,  // 用户id
  username  : String,  // 账号
  nickname  : String,  // 昵称
  avatar    : String,  // 头像
  leavetime : Date,    // 留言时间
  content   : String,  // 留言内容
  answerShow: {        // 回复是否显示
    type: Boolean,
    default: false
  },
  formShow  : {        // 回复框是否显示
    type: Boolean,
    default: false
  },
  answerList:[]        // 回复列表
})