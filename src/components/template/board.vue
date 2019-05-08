<template>
  <div class="board-wrap">
    <div class="message-form">
      <div class="title">
        <h2>{{title}}</h2>
        <div class="login">
          <span @click="toggleLogin" v-if="!nickName"><i class="icon-sign-in"></i>{{warning}}</span>
          <span else="nickName" @click="logout">{{nickName}}</span>
          <div class="login-btn">
            <img :src="userAvatar" v-show="userAvatar">
          </div>
        </div>
      </div>
      <div class="form-wrap">
        <!-- leave -->
        <el-form label-width="60px" ref="leave" label-position="left" class="leave-form" :model="leaveForm" :rules="rulesLeave" v-show="leaveShow" size="medium">
          <el-form-item label="内容：" prop="userleave">
            <el-input type="textarea" v-model="leaveForm.userleave" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="leave">留言</el-button>
          </el-form-item>
        </el-form>
        <!-- login -->
        <el-form label-width="60px" ref="login" label-position="left" class="login-form" :model="loginForm" :rules="rulesLogin" v-show="loginShow" size="medium">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpass">
            <el-input v-model="loginForm.userpass" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="login">登陆</el-button>
            <el-button plain @click="toggleRegister">注册</el-button>
          </el-form-item>
        </el-form>
        <!-- register -->
        <el-form label-width="90px" ref="register" label-position="left" class="register-form" :model="registerForm" :rules="rulesRegister" v-show="registerShow" size="medium">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input v-model="registerForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpass">
            <el-input v-model="registerForm.userpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkpass">
            <el-input v-model="registerForm.checkpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="头像：">
            <div class="avatarList">
              <img v-for='avatar in avatarList' :src='avatar' :key="avatar.id" @click="chooseAvatar">
            </div>
          </el-form-item>
          <el-form-item label="选择：">
            <div class="avatarRandom" >
              <img :src='avatarRandom' v-show="!toChoose">
              <img :src='whichAvatar' v-show="toChoose">
            </div>
          </el-form-item>
          <el-form-item label="密保：" prop="safepass">
            <el-input v-model="registerForm.safepass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {randomNum, saveSession, getSession} from 'common/js/util'
import {userRegister, userLogin, userMessage, userInfo} from 'api/api'
const AVATAR_LIST = [
  '/static/images/visit1.jpg',
  '/static/images/visit2.jpg',
  '/static/images/visit3.jpg',
  '/static/images/visit4.jpg',
  '/static/images/visit5.jpg',
  '/static/images/visit6.jpg',
  '/static/images/visit7.jpg',
  '/static/images/visit8.jpg'
]
export default {
  data () {
    // leaveForm
    let checkUserLeave = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('留言不能为空'))
      } else {
        callback()
      }
    }
    // loginForm
    let checkLoginName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    let checkLoginPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    // registerForm
    let checkRegisterName = (rule, value, callback) => {
      let reg = new RegExp(/^[0-9a-zA-Z_]{1,}$/)
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('账号不能小于6位或大于12位'))
        } else if (!reg.test(value)) {
          callback(new Error('账号不能含除数字，字母，下划线外特殊字符'))
        } else {
          callback()
        }
      }
    }
    let checkRegisterNick = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      } else {
        if (value.length > 12) {
          callback(new Error('昵称不能大于12个字符'))
        } else {
          callback()
        }
      }
    }
    let checkRegisterPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
    }
    let checkRegisterPassAgain = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else {
        if (value !== this.registerForm.userpass) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
    }
    let checkRegisterSafe = (rule, value, callback) => {
      let reg = new RegExp(/^[0-9]*$/)
      if (!value) {
        return callback(new Error('请输入密保'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('密保必须为纯数字'))
        } else if (value.length > 12) {
          callback(new Error('损塞，整这么长能记住么？请小于12位'))
        } else {
          callback()
        }
      }
    }
    return {
      title: '留言板',
      warning: '登陆后留言',
      leaveShow: true,
      loginShow: false,
      registerShow: false,
      // 是否选择头像
      toChoose: false,
      // 选择头像
      whichAvatar: '',
      // 头像列表
      avatarList: AVATAR_LIST,
      // 用户昵称
      nickName: '',
      // 用户头像
      userAvatar: '',
      // 留言表单
      leaveForm: {
        userid: '',
        username: '',
        nickname: '',
        avatar: '',
        userleave: ''
      },
      rulesLeave: {
        userleave: [
          { validator: checkUserLeave, trigger: 'blur' }
        ]
      },
      // 登录表单
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
      },
      // 注册表单
      registerForm: {
        username: '',
        nickname: '',
        userpass: '',
        checkpass: '',
        safepass: '',
        avatar: ''
      },
      rulesRegister: {
        username: [
          { validator: checkRegisterName, trigger: 'blur' }
        ],
        nickname: [
          { validator: checkRegisterNick, trigger: 'blur' }
        ],
        userpass: [
          { validator: checkRegisterPass, trigger: 'blur' }
        ],
        checkpass: [
          { validator: checkRegisterPassAgain, trigger: 'blur' }
        ],
        safepass: [
          { validator: checkRegisterSafe, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    avatarRandom () {
      let index = randomNum(0, this.avatarList.length - 1)
      return this.avatarList[index]
    }
  },
  mounted () {
    this.whichAvatar = this.avatarRandom
    this.userInfo()
  },
  methods: {
    toggleLogin () {
      this.leaveShow = false
      this.loginShow = true
      this.registerShow = false
    },
    toggleRegister () {
      this.leaveShow = false
      this.loginShow = false
      this.registerShow = true
    },
    toggleLeave () {
      this.leaveShow = true
      this.loginShow = false
      this.registerShow = false
    },
    chooseAvatar (e) {
      this.toChoose = true
      let src = e.target.getAttribute('src')
      this.whichAvatar = src
    },
    // 用户注册
    register () {
      this.registerForm.avatar = this.whichAvatar
      this.$refs['register'].validate((valid) => {
        if (valid) {
          userRegister(this.registerForm).then((res) => {
            if (res.data.code === 0) {
              // 注册成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 注册表单重置
              this.$refs['register'].resetFields()
              // 转至登录表单
              setTimeout(() => {
                this.toggleLogin()
              }, 500)
            } else {
              // 已被注册
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    },
    // 用户登录
    login () {
      this.$refs['login'].validate((valid) => {
        if (valid) {
          userLogin(this.loginForm).then((res) => {
            if (res.data.code === 0) {
              // 登录成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              saveSession('userinfo', res.data.info)
              this.userInfo()
              // 登录表单重置
              this.$refs['login'].resetFields()
              // 转至留言
              setTimeout(() => {
                this.toggleLeave()
              }, 500)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    },
    // 若用户已登录，session已存有数据，取出即可。
    userInfo () {
      let info = getSession('userinfo')
      this.userAvatar = info.avatar
      this.nickName = info.nickname
    },
    // 注销
    logout () {
      this.$confirm('确定要注销用户么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注销成功!'
        })
        // 删除登录状态与清空userinfo
        this.userAvatar = ''
        this.nickName = ''
        saveSession('userinfo', {})
        // 留言表单重置
        this.$refs['leave'].resetFields()
        // 转至登录表单
        setTimeout(() => {
          this.toggleLogin()
        }, 500)
      }).catch(() => {
        console.log('取消注销')
      })
    },
    // 用户留言
    leave () {
      this.$refs['leave'].validate((valid) => {
        if (valid) {
          // 查询用户，获取用户信息
          let userid = getSession('userinfo').id
          // 未登录状态
          if (!userid) {
            this.$message.error('宝贝，请先登录再留言~')
            // 留言表单重置
            this.$refs['leave'].resetFields()
            // 转至登录表单
            setTimeout(() => {
              this.toggleLogin()
            }, 500)
            return
          }
          userInfo(userid).then((res) => {
            // 登录后修改session,导致查不到id。
            if (res.data.code === 1) {
              this.$message.error(res.data.message)
              this.$refs['leave'].resetFields()
              return
            }
            this.leaveForm.userid = res.data.info[0]._id
            this.leaveForm.username = res.data.info[0].username
            this.leaveForm.nickname = res.data.info[0].nickname
            this.leaveForm.avatar = res.data.info[0].avatar
            // 留言
            userMessage(this.leaveForm).then((res) => {
              if (res.data.code === 0) {
                // 留言成功
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                // 留言表单重置
                this.$refs['leave'].resetFields()
                // Vue bus传递用户已留言信号，message重新拉取数据
                this.$bus.$emit('hasLeave', {
                  hasLeave: true
                })
              }
            })
          })
        } else {
          this.$message.error('留言不能为空~')
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .board-wrap
    .message-form
      .title
        display: flex
        justify-content: space-between
        align-items: center
        height: 52px
        margin: 20px 0
        border-bottom: 1px solid $home-line
        h2
          transform: translateY(10px)
        .login
          display: flex
          align-items: center
          .login-btn
            width: 50px
            height: 50px
            border-radius: 25px
            background: $home-thingray
            border-radius: 25px
            cursor: pointer
            img
              width: 50px
              height: 50px
              border-radius: 25px
          span
            margin-right: 10px
            transform: translateY(10px)
            cursor: pointer
            &:hover
              color: $home-warning
            i
              margin-right: 5px
      .form-wrap
        .login-form,.register-form
          width: 600px
          .avatarList
            display: flex
            width: 100%
            flex-wrap: wrap
            img
              width: 80px
              height: 80px
              border-radius: 50%
              margin: 0 25px 10px 0
              cursor: pointer
          .avatarRandom
            img
              width: 80px
              height: 80px
              border-radius: 50%
  .mobile
    .board-wrap
      .message-form
        .register-form
          .el-form-item__label
            width: 1.2rem !important
        .title
          font-size: $mobileFont-normal
          display: flex
          justify-content: space-between
          align-items: center
          height: .52rem
          margin: .2rem 0
          border-bottom: 1px solid $home-line
          h2
            transform: translateY(0rem)
          .login
            display: flex
            align-items: center
            .login-btn
              width: .8rem
              height: .8rem
              border-radius: .4rem
              border-radius: .4rem
              transform: translateY(-.2rem)
              img
                width: .8rem
                height: .8rem
                border-radius: .4rem
            span
              margin-right: .1rem
              transform: translateY(0rem)
              cursor: pointer
              &:hover
                color: $home-warning
              i
                margin-right: 5px
        .form-wrap
          .login-form,.register-form
            width: 100%
          .avatarList
            img
              width: 1rem
              height: 1rem
              margin: 0 .1rem .1rem 0
          .avatarRandom
            img
              width: 1rem
              height: 1rem
</style>
