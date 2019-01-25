<template>
  <div class="message-wrap">
    <div class="topdesc">
      <div class="avatar">
        <img src="../../common/images/owner.jpg">
      </div>
      <div class="talk">
        <span>少年锦时</span>
        <p>吾之素年，汝与锦时。与你相见，不甚欣喜。留笔墨一二，互通有无。或有指点，愿闻其详。</p>
      </div>
    </div>
    <!-- 留言 -->
    <div class="message">
      <div class="letter">
        <div class="avatar">
          <img src="../../common/images/visit4.jpg">
        </div>
        <div class="content">
          <span class="name">非酋</span>
          <span class="time">
            留言于<b>2018-08-22 15:16:26</b>
          </span>
          <p>说好的更新，未完待续呢</p>
        </div>
        <div class="answer-number" @click="toggleAnswer">
          <i class="icon-comment-o"></i>
          <span>{{commentText}}</span>
        </div>
      </div>
      <!-- 留言回复 -->
      <div class="answer" v-show="seeAnswer">
        <div class="answer-wrap">
          <div class="avatar">
            <img src="../../common/images/visit4.jpg">
          </div>
          <div class="content">
            <span class="name">非酋</span>
            <span class="time">
              留言于<b>2018-08-22 15:16:26</b>
            </span>
            <p>说好的更新，未完待续呢</p>
          </div>
        </div>
        <!-- 留言回复表单 -->
        <div class="answer-form">
          <div class="for-just">
            <el-button size="medium" plain @click="answerForm">{{toAnswer}}</el-button>
          </div>
          <el-form label-width="60px" label-position="left" v-show="showAnswerForm">
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
      <a href="javascript:;" class="disable">前页</a>
      <span>1</span>
      <a href="javascript:;">后页</a>
    </div>
    <!-- 留言部分 -->
    <board></board>
  </div>
</template>

<script>
import Board from 'components/message-board/board'
export default {
  data () {
    return {
      answerNumber: 0,
      seeAnswer: false,
      commentText: '',
      showAnswerForm: false,
      toAnswer: '我要回复'
    }
  },
  created () {
    this.commentText = this.answerNumber
  },
  methods: {
    toggleAnswer: function () {
      this.seeAnswer === true ? this.commentText = this.answerNumber : this.commentText = '收起'
      this.seeAnswer = !this.seeAnswer
    },
    answerForm: function () {
      this.showAnswerForm === true ? this.toAnswer = '我要回复' : this.toAnswer = '稍后回复'
      this.showAnswerForm = !this.showAnswerForm
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
      width: 100%
      height: 100px
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
    .pagination
      margin-top: 30px
      font-size: $font-normal
      a
        &.disable
          color: $home-gray
      span
        display: inline-block
        padding: 0 10px
        line-height: 30px
        text-align: center
        border-radius: 2px
        cursor: pointer
        background: $home-navbg
        margin: 0 10px
        color: $home-bg
</style>
