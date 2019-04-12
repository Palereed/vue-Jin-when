<template>
  <div class="message-wrap">
    <div class="topdesc">
      <div class="avatar">
        <img src="/static/images/owner.jpg">
      </div>
      <div class="talk">
        <span>少年锦时</span>
        <p>吾之素年，汝与锦时。与你相见，不甚欣喜。留笔墨一二，互通有无。或有指点，愿闻其详。</p>
      </div>
    </div>
    <!-- 留言 -->
    <!-- 留言加载 -->
    <div class="no-message"  v-if="!messageList.length">
      <i class="el-icon-loading"></i>
    </div>
    <ul class="message-list" v-else>
      <li class="message" v-for="(message,index) in messageList" :key="message.id">
        <div class="letter">
          <div class="avatar">
            <img :src="message.avatar">
          </div>
          <div class="content">
            <span class="name">{{message.nickname}}</span>
            <span class="time">
              留言于<b>{{ formatTime(message.leavetime,'yyyy-MM-dd hh:mm') }}</b>
            </span>
            <p>{{message.content}}</p>
          </div>
          <div class="answer-number" @click="toggleAnswer(message)">
            <i class="icon-comment-o"></i>
            <span v-if="!message.answerShow">{{message.answerList.length}}</span>
            <span v-else>收起</span>
          </div>
        </div>
        <!-- 留言回复 -->
        <div class="answer" v-show="message.answerShow">
          <ul class="answer-list" ref="answerList">
            <li class="answer-wrap" v-for="answer in message.answerList" :key="answer.id">
              <div class="avatar">
                <img :src='answer.avatar'>
              </div>
              <div class="content">
                <span class="name">{{answer.nickname}}</span>
                <span class="time">
                  回复于<b>{{formatTime(answer.answertime,'yyyy-MM-dd hh:mm')}}</b>
                </span>
                <p>{{answer.answer}}</p>
              </div>
            </li>
          </ul>
          <!-- 留言回复表单 -->
          <div class="answer-form">
            <div class="for-just">
              <el-button size="medium" plain @click="toggleForm(index)" v-if="answerIndex !== index">我要回复</el-button>
              <el-button size="medium" plain @click="toggleForm()" v-else>稍后回复</el-button>
            </div>
            <el-form label-width="60px" ref="answer" :model="answerForm" :rules="rulesAnswer" label-position="left" v-show="answerIndex === index">
              <el-form-item label="内容：" prop="useranswer">
                <el-input type="textarea" v-model="answerForm.useranswer" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" plain @click="answer(message._id)">回复</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageLimit"
        :total="totalMessage"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
    <!-- 留言部分 -->
    <board></board>
  </div>
</template>

<script>
import Board from 'components/template/board'
import {messageList, userInfo, userAnswer} from 'api/api'
import {formatDate, randomNum, saveSession, getSession} from 'common/js/util'
export default {
  data () {
    // answerForm
    var checkUserAnswer = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('回复不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 留言列表
      messageList: [],
      // 总留言数
      totalMessage: 0,
      // 每页条数
      pageLimit: 0,
      // 是否留言
      hasLeave: false,
      // 回复表单index
      answerIndex: -1,
      answerForm: {
        messageid: '',
        userid: '',
        username: '',
        nickname: '',
        avatar: '',
        useranswer: ''
      },
      rulesAnswer: {
        useranswer: [
          { validator: checkUserAnswer, trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    answerWhich () {
      return 
    }
  },
  created () {
    this.commentText = this.answerNumber
    this.getMessage()
    this.$bus.$on('hasLeave', (params) => {
      this.hasLeave = params.hasLeave
    })
  },
  methods: {
    // 回复toggle
    toggleAnswer: function (message) {
      message.answerShow = !message.answerShow
    },
    // 回复框toggle
    toggleForm: function (index) {
      // 稍后回复，收起回复框
      if (!index) {
        this.answerIndex = -1
      }
      // 留言表单重置
      for (let i=0; i<this.$refs['answer'].length; i++) {
        this.$refs['answer'][i].resetFields()
      }
      this.answerIndex = index
    },
    // 获取留言列表
    getMessage: function (num) {
      // 置空留言列表，保证no-data出现
      this.messageList = []
      messageList(num).then((res) => {
        this.messageList = res.data.message
        this.totalMessage = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 时间格式化
    formatTime (time, formate) {
      return formatDate(time, formate)
    },
    // 翻页
    pageChange (num) {
      // 重置留言的回复index
      this.toggleForm()
      this.getMessage(num)
    },
    // 用户回复
    answer (id) {
      this.$refs['answer'][this.answerIndex].validate((valid) => {
        if (valid) {
          // 此回复对应的留言id
          this.answerForm.messageid = id
          // 查询用户，获取用户信息
          let userid = getSession('userinfo').id
          // 未登录状态
          if (!userid) {
            this.$message.error('宝贝，请先登录再回复~')
            // 留言表单重置
            this.$refs['answer'][this.answerIndex].resetFields()
            return
          }
          userInfo(userid).then((res) => {
            // 登录后修改session,导致查不到id。
            if (res.data.code === 1) {
              this.$message.error(res.data.message)
              this.$refs['answer'][this.answerIndex].resetFields()
              return
            }
            this.answerForm.userid = res.data.info[0]._id
            this.answerForm.username = res.data.info[0].username
            this.answerForm.nickname = res.data.info[0].nickname
            this.answerForm.avatar = res.data.info[0].avatar
            // 留言回复
            userAnswer(this.answerForm).then((res) => {
              if (res.data.code === 0) {
                // 回复成功
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                // 渲染一下回复数据
                let li = document.createElement('li')
                let time = this.formatTime(new Date(),'yyyy-MM-dd hh:mm')
                li.className = 'answer-wrap'
                li.innerHTML = `
                  <div class="avatar">
                    <img src='${this.answerForm.avatar}'>
                  </div>
                  <div class="content">
                    <span class="name">${this.answerForm.nickname}</span>
                    <span class="time">
                      回复于<b>${time}</b>
                    </span>
                    <p>${this.answerForm.useranswer}</p>
                  </div>
                `
                this.$refs['answerList'][this.answerIndex].appendChild(li)
                // 回复表单重置，写在回复后，因为清空了，渲染数据时拿到的answer总是空的
                this.$refs['answer'][this.answerIndex].resetFields()
              }
            })
          })
        } else {
          this.$message.error('回复不能为空~')
        }
      })
    }
  },
  components: {
    Board
  },
  watch: {
    hasLeave: function (hasLeave) {
      if (hasLeave) {
        this.getMessage()
        this.hasLeave = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .message-wrap
    .topdesc
      width: $main-width
      height: 100px
      background: #fff
      display: flex
      align-items: center
      .avatar
        width: 65px
        height: 65px
        flex: 0 0 65px
        img
          width: 100%
          height: 100%
          border-radius: 10px
          border: 2px solid rgba(10,10,10,0.1)
          box-sizing: border-box
      .talk
        display: flex
        flex-direction: column
        flex: 1
        margin-left: 20px
        span
          font-size: $font-normal
          font-weight: 700
          margin-bottom: 10px
    .no-message
      text-align: center
      font-size: $font-title
      margin: 100px 0
    .message-list
      .message
        border-bottom: 1px solid $home-line
        padding-top: 20px
        .letter
          margin-bottom: 20px
        .letter,.answer-wrap
          display: flex
          .avatar
            width: 65px
            height: 65px
            flex: 0 0 65px
            img
              width: 100%
              height: 100%
              border-radius: 10px
              border: 2px solid rgba(10,10,10,0.1)
              box-sizing: border-box
          .content
            flex: 1
            margin-left: 20px
            p
              line-height: $font-middle
            span
              display: block
              &.name
                font-size: $font-normal
                font-weight: 700
              &.time
                color: $home-gray
                font-size: $font-small
                margin: 10px 0
                b
                  margin-left: 5px
          .answer-number
            width: 30px
            height: 40px
            font-size: $font-big
            text-align: center
            cursor: pointer
            display: flex
            flex-direction: column
            justify-content: space-between
            span
              font-size: $font-default
        .answer
          padding-left: 85px
          .answer-list
            .answer-wrap
              margin-bottom: 20px
              .answer-form
                .el-button+.el-button
                  margin-left: 0
    .pagination
      margin-top: 30px
      font-size: $font-normal
      display: flex
      justify-content: center
  .mobile
    .message-wrap
      .topdesc
        width: 100%
        height: 1.6rem
        .avatar
          width: 1.2rem
          height: 1.2rem
          flex: 0 0 1.2rem
          img
            width: 100%
            height: 100%
            border-radius: .1rem
        .talk
          display: flex
          flex-direction: column
          flex: 1
          margin-left: .2rem
          span
            font-size: $mobileFont-just
            font-weight: 700
            margin: .1rem 0
          p
            font-size: $mobileFont-normal
            line-height 1.3
      .no-message
        font-size: $mobileFont-title
        margin: 1rem 0      
      .message-list
        .message
          border-bottom: 1px solid $home-line
          padding-top: .3rem
          .letter
            margin-bottom: .3rem
          .letter,.answer-wrap
            display: flex
            justify-content: space-between
            .avatar
              width: 1rem
              height: 1rem
              flex: 0 0 1rem
              img
                width: 100%
                height: 100%
                border-radius: 10px
                border: 2px solid rgba(10,10,10,0.1)
                box-sizing: border-box
            .content
              flex: 1
              margin-left: .2rem
              display: flex
              flex-direction: column
              justify-content: center
              p
                font-size: $mobileFont-normal
                line-height: 1.3
              span
                display: block
                &.name
                  font-size: $mobileFont-normal
                  font-weight: 700
                &.time
                  color: $home-gray
                  font-size: $mobileFont-small
                  margin: .1rem 0
                  b
                    margin-left: 5px
            .answer-number
              height: .7rem
              font-size: $mobileFont-title
              text-align: center
              cursor: pointer
              display: flex
              flex-direction: column
              justify-content: space-between
              span
                font-size: $mobileFont-normal
          .answer
            padding-left: .85rem
            .answer-list
              .answer-wrap
                margin-bottom: .2rem
      .pagination
        margin-top: .3rem
        font-size: $mobileFont-normal
        a
          &.disable
            color: $home-gray
        span
          padding: .1rem .15rem
          line-height: .3rem
          margin: 0 .1rem
</style>
