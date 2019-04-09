const express = require('express')
const router = express.Router()
const User = require('../models/user') // 用户
let resData = {
  code: 0,
  message: ''
}

router.post('/user/register', function (req, res) {
  let userName = req.body.username
  let userPass = req.body.userpass
  let nickName = req.body.nickname
  let avatar   = req.body.avatar
  let safePass = req.body.safepass
  let user = new User ({
    username : userName,
    userpass : userPass,
    nickname : nickName,
    avatar   : avatar,
    safepass : safePass,
    time     : new Date()
  })
  return user.save().then(function () {
    resData.code = 0
    resData.message = '注册成功'
    res.send(resData)
  })
  // 用户名是否已被注册
  // User.findOne({
  //   username: userName
  // }).then(function (data) {
  //   if (data) {
  //     resData.code = 1
  //     resData.message = '用户名已经被注册'
  //     res.send(resData)
  //     return
  //   }
  //   let User = new User ({
  //     username : userName,
  //     userpass : userPass,
  //     nickname : nickName,
  //     avatar   : avatar,
  //     safepass : safePass,
  //     time     : new Data()
  //   })
  //   return User.save()
  // }).then(function () {
  //   resData.code = 0
  //   resData.message = '注册成功'
  //   res.send(resData)
  // })
})

module.exports = router