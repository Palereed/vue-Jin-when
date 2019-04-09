import axios from 'axios'

// axios请求基础url
const BASE_URL = "http://localhost:3000"
axios.defaults.baseURL = BASE_URL

// 请求
export function userRegister(params) {
  return axios.post('/user/register',{
    username : params.username,
    userpass : params.userpass,
    nickname : params.nickname,
    avatar   : params.avatar,
    safepass : params.safepass
  })
}