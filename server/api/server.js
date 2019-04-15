const express = require('express')
const router = express.Router()
const User = require('../models/user') // 用户
const Message = require('../models/message') // 留言
const Note = require('../models/note') // 文章
var ObjectID = require('mongodb').ObjectID
// 返回对象
let resData = {
  code: 0,
  message: '',
  info: {}
}

// 用户注册
router.post('/user/register', (req, res, next) => {
  let userName = req.body.username
  let userPass = req.body.userpass
  let nickName = req.body.nickname
  let avatar   = req.body.avatar
  let safePass = req.body.safepass
  User.findOne({ 
    username: userName 
  }).then( data => {
    // 账号被注册
    if (data) {
      resData.code = 1
      resData.message = '账号已经被注册'
      res.send(resData)
      return next()
    }
    // 未被注册
    let user = new User({
      username : userName,
      userpass : userPass,
      nickname : nickName,
      avatar   : avatar,
      safepass : safePass,
      time     : new Date()
    })
    user.save()
    resData.code = 0
    resData.message = '注册成功'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 用户登录
router.post('/user/login', (req, res, next) => {
  let userName = req.body.username
  let userPass = req.body.userpass
  User.findOne({ 
    username: userName,
    userpass: userPass,
  }).then((data) => {
    if (data) {
      resData.code = 0
      resData.message = '登录成功'
      // 用户信息
      resData.info = {
        "id": data.id,
        "nickname": data.nickname,
        "avatar": data.avatar
      }
      res.send(resData)
      return next()
    }
    resData.code = 1
    resData.message = '账号或密码错误'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 用户留言
router.post('/user/message', (req, res, next) => {
  let userId   = req.body.userid
  let userName = req.body.username
  let nickName = req.body.nickname
  let avatar   = req.body.avatar
  let content  = req.body.content
  let message = new Message({
    userid   : userId,
    username : userName,
    nickname : nickName,
    avatar   : avatar,
    content  : content,
    leavetime: new Date()
  })
  message.save()
  resData.code = 0
  resData.message = '留言成功'
  res.send(resData)
  return next()
})

// 用户信息
router.post('/user/userinfo', (req, res, next) => {
  // 根据_id查询，mongodb中_id比较特殊，需要应用ObjectID转化
  let userId = ObjectID(req.body.userid)
  User.find({ 
    _id: userId
  }).then((data) => {
    if (data.length) {
      resData.code = 0
      resData.message = '用户信息已获取'
      resData.info = data
      res.send(resData)
      return next()
    }
    resData.code = 1
    resData.message = '别介样~，就你能，会F12改session'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 留言列表
router.post('/message/list', (req, res, next) => {
  // 读取数据条数 limit(Number)，默认展示第一页
  let page = req.body.page || 1
  let limit = 8
  let list = {}
  // 数据库中数据条数
  Message.count({
  }).then((count) => {
    // 跳过数据条数 skip(Number)
    let skip = (page - 1) * limit
    Message.find({
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.message = data
      // 需要给前端留言数据总长度
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 用户回复
router.post('/message/answer', (req, res, next) => {
  let messageId = ObjectID(req.body.messageid)
  let userId    = req.body.userid
  let userName  = req.body.username
  let nickName  = req.body.nickname
  let avatar    = req.body.avatar
  let answer    = req.body.answer
  Message.update({
    _id: messageId
  },{ 
    $push:{
      answerList:{
        userid    : userId,
        username  : userName,
        nickname  : nickName,
        avatar    : avatar,
        answer    : answer,
        answertime: new Date()
      }
    }
  }).then(() => {
    resData.code = 0
    resData.message = '回复成功'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 文章发布
router.post('/notes/edit', (req, res, next) => {
  let title    = req.body.title
  let classifyVal = req.body.classifyVal
  let content  = req.body.content
  let abstract = req.body.abstract
  let writer   = req.body.writer
  let radio    = req.body.radio
  let link     = req.body.link
  let note = new Note({
    title    : title,
    classifyVal : classifyVal,
    content  : content,
    abstract : abstract,
    writer   : writer,
    radio    : radio,
    link     : link,
    time     : new Date()
  })
  note.save()
  resData.code = 0
  resData.message = '发布成功'
  res.send(resData)
  return next()
})

// 文章列表
router.post('/notes/list', (req, res, next) => {
  // 读取数据条数 limit(Number)，默认展示第一页
  let page = req.body.page || 1
  let limit = 8
  let list = {}
  // 数据库中数据条数
  Note.count({
  }).then((count) => {
    // 跳过数据条数 skip(Number)
    let skip = (page - 1) * limit
    Note.find({
    }).sort({
      "time": -1
    }).limit(limit).skip(skip).then((data) => {
      list.note = data
      // 需要给前端留言数据总长度
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

module.exports = router