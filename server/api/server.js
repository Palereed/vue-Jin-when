const express = require('express')
const router = express.Router()
const User = require('../models/user') // 用户
const Message = require('../models/message') // 留言
const Classify = require('../models/classify') // 文章分类
const Note = require('../models/note') // 文章
const Record = require('../models/record') // 独白
const Travel = require('../models/travel') // 珍藏
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

// 管理员登陆
router.post('/admin/login', (req, res, next) => {
  let userName = req.body.username
  let userPass = req.body.userpass
  User.findOne({ 
    username: userName,
    userpass: userPass,
    isAdmin: true,
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

// 分类添加
router.post('/notes/class', (req, res, next) => {
  let name    = req.body.name
  Classify.findOne({ 
    name: name
  }).then( data => {
    // 账号被注册
    if (data) {
      resData.code = 1
      resData.message = '该分类已存在'
      res.send(resData)
      return next()
    }
    // 未被注册
    let classify = new Classify({
      name: name
    })
    classify.save()
    resData.code = 0
    resData.message = '添加成功'
    res.send(resData)
    return next()
  })
})

// 分类数据
router.get('/notes/classList', (req, res, next) => {
  Classify.find({ 
  }).then( data => {
    res.send(data)
    return next()
  })
})

// 文章发布
router.post('/notes/edit', (req, res, next) => {
  let title    = req.body.title
  let classifyVal = req.body.classifyVal
  let content  = req.body.content
  let preface = req.body.preface
  let abstract = req.body.abstract
  let writer   = req.body.writer
  let radio    = req.body.radio
  let link     = req.body.link
  let note = new Note({
    title    : title,
    classifyVal : classifyVal,
    content  : content,
    preface  : preface,
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
  let limit = 6
  let list = {}
  let classify = req.body.classify
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
      // 需要给前端文章数据总长度
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 文章筛选
router.post('/notes/switch', (req, res, next) => {
  // 读取数据条数 limit(Number)，默认展示第一页
  let page = req.body.page || 1
  let limit = 6
  let list = {}
  let classify = req.body.classify
  // 数据库中数据条数
  Note.count({
    classifyVal: classify
  }).then((count) => {
    // 跳过数据条数 skip(Number)
    let skip = (page - 1) * limit
    Note.find({
      classifyVal: classify
    }).sort({
      "time": -1
    }).limit(limit).skip(skip).then((data) => {
      list.note = data
      // 需要给前端文章数据总长度
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 文章详情
router.post('/notes/detail', (req, res, next) => {
  let noteId = ObjectID(req.body.noteid)
  Note.find({
    _id: noteId
  }).then((data) => {
    res.send(data)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 独白发布
router.post('/record/edit', (req, res, next) => {
  let title   = req.body.title
  let spirit  = req.body.spirit
  let weather = req.body.weather
  let content  = req.body.content
  let record = new Record({
    title   : title,
    spirit  : spirit,
    weather : weather,
    content : content,
    time    : new Date()
  })
  record.save()
  resData.code = 0
  resData.message = '发布成功'
  res.send(resData)
  return next()
})

// 独白列表
router.get('/record/list', (req, res, next) => {
  Record.find({
  }).then( data => {
    res.send(data)
    return next()
  })
})

// 珍藏发布
router.post('/travel/edit', (req, res, next) => {
  let title = req.body.title
  let link  = req.body.link
  let content  = req.body.content
  let travel = new Travel({
    title : title,
    link  : link,
    content : content,
    time    : new Date()
  })
  travel.save()
  resData.code = 0
  resData.message = '发布成功'
  res.send(resData)
  return next()
})

// 珍藏列表
router.get('/travel/list', (req, res, next) => {
  Travel.find({
  }).then((data) => {
    res.send(data)
    return next()
  })
})

// 用户管理列表
router.post('/admin/user/list', (req, res, next) => {
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  User.count({
  }).then((count) => {
    let skip = (page - 1) * limit
    User.find({
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.user = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 用户管理查询
router.post('/admin/user/search', (req, res, next) => {
  let keyWord = req.body.keyword
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  User.count({
    $or: [
      { username: {$regex: keyWord} },
      { nickname: {$regex: keyWord} }, 
    ]
  }).then((count) => {
    let skip = (page - 1) * limit
    User.find({
      $or: [
        { username: {$regex: keyWord} },
        { nickname: {$regex: keyWord} }, 
      ]
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.user = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 用户管理删除
router.post('/admin/user/delete', (req, res, next) => {
  let userId = ObjectID(req.body.userid)
  User.remove({
    _id: userId
  }).then(() => {
    resData.code = 0
    resData.message = '删除成功'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 用户管理信息修改用户id
router.post('/admin/user/which', (req, res, next) => {
  let userId = ObjectID(req.body.userid)
  User.find({
    _id: userId
  }).then((data) => {
    res.send(data)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 用户管理信息修改保存
router.post('/admin/user/edit', (req, res, next) => {
  let userName = req.body.username
  let userPass = req.body.userpass
  let nickName = req.body.nickname
  let avatar   = req.body.avatar
  let safePass = req.body.safepass
  User.update({
    username: userName 
  },{
    $set: {
      userpass : userPass,
      nickname : nickName,
      avatar   : avatar,
      safepass : safePass
    }
  }).then(() => {
    Message.update({
      username: userName 
    },{
      $set: {
        nickname : nickName,
        avatar   : avatar,
      }
    },{
      multi: true,
      upsert: false
    }).then(() => {
      resData.code = 0
      resData.message = '修改成功'
      res.send(resData)
      return next()
    })
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 珍藏管理列表
router.post('/admin/travel/list', (req, res, next) => {
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  Travel.count({
  }).then((count) => {
    let skip = (page - 1) * limit
    Travel.find({
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.travel = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 珍藏管理查询
router.post('/admin/travel/search', (req, res, next) => {
  let keyWord = req.body.keyword
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  Travel.count({
    $or: [
      { title: {$regex: keyWord, $options:"i"} },
      { content: {$regex: keyWord, $options:"i"} }, 
    ]
  }).then((count) => {
    let skip = (page - 1) * limit
    Travel.find({
      $or: [
        { title: {$regex: keyWord, $options:"i"} },
        { content: {$regex: keyWord, $options:"i"} }, 
      ]
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.travel = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 珍藏管理删除
router.post('/admin/travel/delete', (req, res, next) => {
  let travelId = ObjectID(req.body.travelid)
  Travel.remove({
    _id: travelId
  }).then(() => {
    resData.code = 0
    resData.message = '删除成功'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 珍藏管理信息修改珍藏id
router.post('/admin/travel/which', (req, res, next) => {
  let travelId = ObjectID(req.body.travelid)
  Travel.find({
    _id: travelId
  }).then((data) => {
    res.send(data)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

// 珍藏管理信息修改保存
// router.post('/admin/travel/edit', (req, res, next) => {
//   let userName = req.body.username
//   let userPass = req.body.userpass
//   let nickName = req.body.nickname
//   let avatar   = req.body.avatar
//   let safePass = req.body.safepass
//   User.update({
//     username: userName 
//   },{
//     $set: {
//       userpass : userPass,
//       nickname : nickName,
//       avatar   : avatar,
//       safepass : safePass
//     }
//   }).then(() => {
//     Message.update({
//       username: userName 
//     },{
//       $set: {
//         nickname : nickName,
//         avatar   : avatar,
//       }
//     },{
//       multi: true,
//       upsert: false
//     }).then(() => {
//       resData.code = 0
//       resData.message = '修改成功'
//       res.send(resData)
//       return next()
//     })
//   }).catch((err) => {
//     console.log("ERROR:" + err)
//   })
// })

// 留言管理列表
router.post('/admin/message/list', (req, res, next) => {
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  Message.count({
  }).then((count) => {
    let skip = (page - 1) * limit
    Message.find({
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.message = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 留言管理查询
router.post('/admin/message/search', (req, res, next) => {
  let keyWord = req.body.keyword
  let page = req.body.page || 1
  let limit = 12
  let list = {}
  Message.count({
    $or: [
      { username: {$regex: keyWord} },
      { nickname: {$regex: keyWord} }, 
      { content:  {$regex: keyWord} } 
    ]
  }).then((count) => {
    let skip = (page - 1) * limit
    Message.find({
      $or: [
        { username: {$regex: keyWord} },
        { nickname: {$regex: keyWord} }, 
        { content:  {$regex: keyWord} } 
      ]
    }).sort({
      "leavetime": -1
    }).limit(limit).skip(skip).then((data) => {
      list.message = data
      list.total = count
      list.limit = limit
      res.send(list)
      return next()
    }).catch((err) => {
      console.log("ERROR:" + err)
    })
  })
})

// 留言管理删除
router.post('/admin/message/delete', (req, res, next) => {
  let messageId = ObjectID(req.body.messageid)
  Message.remove({
    _id: messageId
  }).then(() => {
    resData.code = 0
    resData.message = '删除成功'
    res.send(resData)
    return next()
  }).catch((err) => {
    console.log("ERROR:" + err)
  })
})

module.exports = router