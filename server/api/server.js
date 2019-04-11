const express = require('express')
const router = express.Router()
const User = require('../models/user') // 用户
const Message = require('../models/message') // 留言
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
  }).catch( err => {
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
  }).then( data => {
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
  }).catch( err => {
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
    _id: userId,
  }).then(data => {
    if (data) {
      resData.code = 0
      resData.message = '用户信息已获取'
      resData.info = data
      res.send(resData)
      return next()
    }
    resData.code = 1
    resData.message = '用户不存在'
    res.send(resData)
    return next()
  }).catch( err => {
    console.log("ERROR:" + err)
  })
})

// 留言列表
router.get('/message/list', (req, res, next) => {
  Message.find({}).then(data => {
    res.send(data)
    return next()
  })
})

module.exports = router