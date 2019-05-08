<template>
  <div class="detail-page">
    <div class="detail-wrap">
      <h2 class="title">{{noteData.title}}</h2>
      <p class="info-wrap">
        <span>标签：{{noteData.classifyVal}}</span>
        <span>时间：{{formatTime(noteData.time, 'yyyy-MM-dd hh:mm')}}</span>
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
    this.getDetail()
  },
  methods: {
    getDetail () {
      noteDetail(this.$route.params.id).then((res) => {
        this.noteData = res.data[0]
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
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: 100
    background: #fff
    overflow-y: scroll
    .detail-wrap
      width: $main-width
      margin: auto
      .title
        font-weight: 700
        font-size: $font-title
        text-align: center
        margin: 25px
      .info-wrap
        color: $home-gray
        font-size: $font-small
        text-align: center
        span
          margin-right: 20px 
</style>
