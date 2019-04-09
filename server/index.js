const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
// 跨域请求的域名
const REQUEST_URL = 'http://192.168.1.34:8080'

// bodyparser设置
app.use(bodyParser.json())

// 跨域处理
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', REQUEST_URL)     
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method == 'OPTIONS') {
    // 让options请求快速返回
    res.send(200)
  }
  else {
    next()
  }
})

// 服务器路由
app.use('/', require('./api/server'))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/jinwhen', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(3000)
  }
})