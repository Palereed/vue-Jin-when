import axios from 'axios'

// axios请求基础url
const BASE_URL = 'http://localhost:3000'
axios.defaults.baseURL = BASE_URL

// 用户注册
export function userRegister (params) {
  return axios.post('/user/register', {
    username: params.username,
    userpass: params.userpass,
    nickname: params.nickname,
    avatar: params.avatar,
    safepass: params.safepass
  })
}

// 用户登录
export function userLogin (params) {
  return axios.post('/user/login', {
    username: params.username,
    userpass: params.userpass
  })
}

// 用户留言
export function userMessage (params) {
  return axios.post('/user/message', {
    userid: params.userid,
    username: params.username,
    nickname: params.nickname,
    avatar: params.avatar,
    content: params.userleave
  })
}

// 用户信息
export function userInfo (id) {
  return axios.post('/user/userinfo', {
    userid: id
  })
}

// 留言列表
export function messageList (num) {
  return axios.post('/message/list', {
    page: num
  })
}

// 留言回复
export function userAnswer (params) {
  return axios.post('/message/answer', {
    messageid: params.messageid,
    userid: params.userid,
    username: params.username,
    nickname: params.nickname,
    avatar: params.avatar,
    answer: params.useranswer
  })
}
