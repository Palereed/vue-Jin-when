<template>
  <div class="login-wrap">
    <div class="title">
      <h1 class="name">{{title}}</h1>
      <span class="desc">{{desc}}</span>
    </div>
    <div class="form-wrap">
      <el-form label-width="60px" ref="login" label-position="left" class="login-form" :model="loginForm" :rules="rulesLogin">
        <el-form-item label="账号：" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userpass">
          <el-input v-model="loginForm.userpass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" plain @click="login">喵管理</el-button>
          <el-button size="medium" plain @click="returnHome">返回锦时</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {saveSession} from 'common/js/util'
import {adminLogin} from 'api/api'
export default {
  data () {
    // loginForm
    var checkLoginName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var checkLoginPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      title: '喵管家',
      desc: '吾之素年，汝与锦时。',
      loginForm: {
        username: '',
        userpass: ''
      },
      rulesLogin: {
        username: [
          { validator: checkLoginName, trigger: 'blur' }
        ],
        userpass: [
          { validator: checkLoginPass, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (/mobile/.test(document.documentElement.className)) {
      this.$router.push('/error')
    }
  },
  methods: {
    login () {
      this.$refs['login'].validate((valid) => {
        if (valid) {
          adminLogin(this.loginForm).then((res) => {
            if (res.data.code === 0) {
              // 登录成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              saveSession('adminSecret', res.data.info)
              // 登录表单重置
              this.$refs['login'].resetFields()
              // 进入后台管理
              this.$router.push('/admin/user/list')
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    },
    returnHome () {
      this.$router.push('/home/notes')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .login-wrap
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%
    padding-bottom: 10%
    box-sizing: border-box
    .title
      text-align: center
      margin-bottom: 120px
      .name
        position relative
        font-size: $font-jinwhen
        height: 80px
        line-height: 80px
        margin-bottom: 20px
        padding: 0 40px
        &:before,&:after
          width: 35px
          height: 35px
          content: ""
          position: absolute
        &:before
          border-top: 4px solid $home-font
          border-left: 4px solid $home-font
          top: 0px
          left: 0px
        &:after
          border-bottom: 4px solid $home-font
          border-right: 4px solid $home-font
          right: 0px
          bottom: 0px
    .form-wrap
      width: 512px
      .login-form
        width: 100%
</style>
