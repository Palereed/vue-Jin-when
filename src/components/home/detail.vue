<template>
  <div class="detail-page">
    <div class="detail-wrap">
      <h2 class="title">{{noteData.title}}</h2>
      <p class="info-wrap">
        <span>标签：{{noteData.classifyVal}}</span>
        <span>时间：{{formatTime(noteData.time, 'yyyy-MM-dd')}}</span>
        <span>作者：{{noteData.writer}}</span>
        <span>备注：{{noteData.radio}}</span>
      </p>
      <div class="article-wrap" v-html="noteData.content"></div>
    </div>
  </div>
</template>

<script>
import {noteDetail} from 'api/api'
import {formatDate} from 'common/js/util'
export default {
  data () {
    return {
      noteData: {}
    }
  },
  created () {
    document.body.scrollTop = 0
    this.getDetail()
  },
  methods: {
    getDetail () {
      noteDetail(this.$route.params.id).then((res) => {
        this.noteData = res.data
      })
    },
    // 时间格式化
    formatTime (time, formate) {
      return formatDate(time, formate)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .detail-page
    .detail-wrap
      width: $main-width
      margin: auto
      .title
        font-weight: 700
        font-size: $font-title
        text-align: center
        margin: 50px 0 30px 0
      .info-wrap
        color: $home-gray
        font-size: $font-small
        text-align: center
        span
          margin-right: 20px
  .mobile
    .detail-page
      .detail-wrap
        width: $mobileMain-width
        box-sizing: border-box
        padding: 0 .2rem
        .title
          font-size: $font-title
          margin: .5rem 0 .3rem 0
        .info-wrap
          font-size: $mobileFont-normal
          span
            margin-right: .2rem
</style>
