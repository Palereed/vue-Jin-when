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
    <div class="message" v-for="message in messageList" :key="message.id">
      <div class="letter">
        <div class="avatar">
          <img :src="message.avatar">
        </div>
        <div class="content">
          <span class="name">{{message.name}}</span>
          <span class="time">
            留言于<b>{{message.time}}</b>
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
        <div class="answer-wrap" v-for="answer in message.answerList" :key="answer.id">
          <div class="avatar">
            <img :src='answer.avatar'>
          </div>
          <div class="content">
            <span class="name">{{answer.name}}</span>
            <span class="time">
              留言于<b>{{answer.time}}</b>
            </span>
            <p>{{answer.name}}</p>
          </div>
        </div>
        <!-- 留言回复表单 -->
        <div class="answer-form">
          <div class="for-just">
            <el-button size="medium" plain @click="toggleForm(message)" v-if="!message.formShow">我要回复</el-button>
            <el-button size="medium" plain @click="toggleForm(message)" v-else>稍后回复</el-button>
          </div>
          <el-form label-width="60px" label-position="left" v-show="message.formShow">
            <el-form-item label="内容：">
              <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" plain>回复</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="12">
      </el-pagination>
    </div>
    <!-- 留言部分 -->
    <board></board>
  </div>
</template>

<script>
import Board from 'components/template/board'
export default {
  data () {
    return {
      messageList: [{
        avatar: '/static/images/visit4.jpg',
        name: '非酋',
        time: '2018-08-22 15:16:26',
        content: '说好的更新，未完待续呢',
        answerShow: false, // 回复是否显示
        formShow: false, // 回复框是否显示
        answerList: [{
          avatar: '/static/images/visit4.jpg',
          name: '非酋',
          time: '2018-08-22 15:16:26',
          content: '说好的更新，未完待续呢'
        },
        {
          avatar: '/static/images/visit4.jpg',
          name: '非酋',
          time: '2018-08-22 15:16:26',
          content: '说好的更新，未完待续呢'
        }]
      },
      {
        avatar: '/static/images/visit2.jpg',
        name: '蒹葭',
        time: '2018-08-22 15:16:26',
        content: '说好的更新，未完待续呢',
        answerShow: false,
        formShow: false,
        answerList: [{
          avatar: '/static/images/visit2.jpg',
          name: '蒹葭',
          time: '2018-08-22 15:16:26',
          content: '说好的更新，未完待续呢'
        }]
      }]
    }
  },
  created () {
    this.commentText = this.answerNumber
  },
  methods: {
    // 回复toggle
    toggleAnswer: function (message) {
      message.answerShow = !message.answerShow
    },
    // 回复框toggle
    toggleForm: function (message) {
      message.formShow = !message.formShow
    }
  },
  components: {
    Board
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
