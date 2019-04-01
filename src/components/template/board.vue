<template>
  <div class="board-wrap">
    <div class="message-form">
      <div class="title">
        <h2>{{title}}</h2>
        <div class="login">
          <span @click="toggleLogin"><i class="icon-sign-in"></i>{{warning}}</span>
          <div class="login-btn">
            <img src="../../common/images/owner.jpg">
          </div>
        </div>
      </div>
      <div class="form-wrap">
        <!-- leave -->
        <el-form label-width="60px" label-position="left" class="leave-form" :model="leaveForm" :rules="rulesLeave" v-show="leaveShow">
          <el-form-item label="内容：" prop="userleave">
            <el-input type="textarea" v-model="leaveForm.userleave" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" plain>留言</el-button>
          </el-form-item>
        </el-form>
        <!-- login -->
        <el-form label-width="60px" label-position="left" class="login-form" :model="loginForm" :rules="rulesLogin" v-show="loginShow">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpass">
            <el-input v-model="loginForm.userpass" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" plain>登陆</el-button>
            <el-button size="medium" plain @click="toggleRegister">注册</el-button>
          </el-form-item>
        </el-form>
        <!-- register -->
        <el-form label-width="90px" label-position="left" class="register-form" :model="registerForm" :rules="rulesRegister" v-show="registerShow" status-icon>
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
          </el-form-item>
          <el-form-item label="选择：">
          </el-form-item>
          <el-form-item label="密保：" prop="safepass">
            <el-input v-model="registerForm.safepass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" plain>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // leaveForm
    var checkUserLeave = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('留言不能为空'))
      } else {
        callback()
      }
    }
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
    // registerForm
    var checkRegisterName = (rule, value, callback) => {
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
    var checkRegisterNick = (rule, value, callback) => {
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
    var checkRegisterPass = (rule, value, callback) => {
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
    var checkRegisterPassAgain = (rule, value, callback) => {
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
    var checkRegisterSafe = (rule, value, callback) => {
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
      leaveForm: {
        userleave: ''
      },
      rulesLeave: {
        userleave: [
          { validator: checkUserLeave, trigger: 'blur' }
        ]
      },
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
      registerForm: {
        username: '',
        nickname: '',
        userpass: '',
        checkpass: '',
        safepass: ''
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .board-wrap
    .message-form
      .title
        font-size: $font-extra
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
  .mobile 
    .board-wrap
      .message-form
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
</style>
