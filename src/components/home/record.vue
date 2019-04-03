<template>
  <div class="record-wrap">
    <div class="toptalk">
      <i class="icon-quote-left"></i>
      <p>{{title}}</p>
      <i class="icon-quote-right"></i>
    </div>
    <div class="event-wrap" ref="eventWrap">
      <div class="timer-shaft"></div>
      <div class="event-list">
        <div class="event-item" v-for="record in recordList" :key="record.id" ref="record">
          <div class="time-info">
            <span class="anchor"></span>
            <span class="line"></span>
            <span class="weather">{{record.weather}}</span>
            <span class="spirit">{{record.spirit}}</span>
            <span class="time">{{record.time}}</span>
          </div>
          <div class="time-content">
            <h3>{{record.title}}</h3>
            <p>{{record.content}}</p>
          </div>
        </div>
        <div class="event-item" ref="loading">
          <div class="time-info">
            <span class="anchor"></span>
            <span class="line"></span>
            <span class="weather">{{ending}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '人生不如意之事七八九，苦事；终归还能与人言一二三，幸事。',
      ending: 'Loading...(未完待续)'
    }
  },
  computed: {
  },
  mounted () {
    let recordLenth = this.$refs.record.length
    let heightList = []
    let height = 0
    for (let i = 0; i < recordLenth; i++) {
      height += this.$refs.record[i].clientHeight
      heightList.push(height)
    }
    this.$refs.eventWrap.style.height = height + 18 + 'px'
    this.$refs.record.forEach((item, index) => {
      item.style.top = heightList[index - 1] + 'px'
    })
    this.$refs.loading.style.top = heightList[recordLenth - 1] + 'px'
  },
  created () {
    this.recordList = [{
      weather: '晴',
      spirit: '开心',
      time: 'June 16th, 2018',
      title: '锦时上线啦',
      content: '经过购买域名，备案，调试端口，增补漏洞，这个网站终于上线了。虽然或多或少有一点不尽人意，但是会在以后的学习之路的完善这个网站，这里会有我在前端之路上前进的脚印的。为自己加油。'
    },
    {
      weather: '晴',
      spirit: '开心',
      time: 'June 16th, 2018',
      title: '锦时上线啦',
      content: '经过购买域名，备案，调试端口，增补漏洞，这个网站终于上线了。虽然或多或少有一点不尽人意，但是会在以后的学习之路的完善这个网站，这里会有我在前端之路上前进的脚印的。为自己加油。'
    },
    {
      weather: '晴',
      spirit: '开心',
      time: 'June 16th, 2018',
      title: '锦时上线啦',
      content: '经过购买域名，备案，调试端口，增补漏洞，这个网站终于上线了。虽然或多或少有一点不尽人意，但是会在以后的学习之路的完善这个网站，这里会有我在前端之路上前进的脚印的。为自己加油前端之路上前进的。'
    }
    ]
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .record-wrap
    .event-wrap
      margin-top: 30px
      position: relative
      overflow: hidden
      .timer-shaft
        width: 4px
        height: 100%
        background: $home-font
        position: absolute
        top: 5px
        left: 50%
        margin-left: -2px
      .event-list
        height: 100%
        .event-item
          position: absolute
          width: 415px
          box-sizing: border-box
          .time-content
            letter-spacing: 1px
            h3
              font-size: $font-just
              font-weight: 700
              margin: 10px 0
            p
              color: $home-darkgray
              line-height: $font-big
          &:nth-child(odd)
            left: 0
            padding-right: 35px
            .time-content
              text-align: right
            span
              float: right
            .anchor
              top: 2px
              right: -63px
            .line
              right: -43px
          &:nth-child(even)
            right: 0
            padding-left: 35px
            .time-content
              text-align: left
            span
              float: left
            .anchor
              top: 2px
              left: -63px
            .line
              left: -43px
          .time-info
            height: 20px
            line-height: 20px
            position: relative
            font-weight: 300
            color: $home-gray
            .anchor
              background: #fff
              width: 16px
              height: 16px
              border-radius: 10px
              position: absolute
              &:after
                content: ''
                display: block
                background: #313d4b
                width: 10px
                height: 10px
                border-radius: 5px
                position: absolute
                top: 3px
                left: 3px
            .line
              position: absolute
              border-radius: 2px
              top: 8px
              width: 30px
              height: 4px
              background: #313d4b
            .spirit
              &:before,&:after
                content: '|'
                display: inline-block
                margin: 0 10px
                color: $home-thingray
  .mobile
    .event-wrap
      margin-top: .3rem
      .timer-shaft
        width: 2px
        top: 5px
        margin-left: -1px
      .event-list
        .event-item
          width: 3.35rem
          .time-content
            letter-spacing: 1px
            h3
              font-size: $mobileFont-just
              margin: .1rem 0
            p
              line-height: $mobileFont-big
              font-size: $mobileFont-normal
          &:nth-child(odd)
            left: 0
            padding-right: 16px
            .time-content
              text-align: right
            span
              float: right
            .anchor
              top: 1px
              right: -30px
            .line
              right: -.43rem
          &:nth-child(even)
            right: 0
            padding-left: 18px
            .time-content
              text-align: left
            span
              float: left
            .anchor
              top: 1px
              left: -31px
            .line
              left: -.43rem
          .time-info
            height: .26rem
            line-height: .26rem
            font-size: $mobileFont-small
            .anchor
              width: 8px
              height: 8px
              border-radius: 4px
              position: absolute
              &:after
                content: ''
                display: block
                background: #313d4b
                width: 6px
                height: 6px
                border-radius: 3px
                position: absolute
                top: 1px
                left: 1px
            .line
              position: absolute
              border-radius: .02rem
              top: .08rem
              width: .3rem
              height: .04rem
              background: #313d4b
            .spirit
              &:before,&:after
                content: '|'
                display: inline-block
                margin: 0 .1rem
                color: $home-thingray
  .ios
    .event-list
      .event-item
        &:nth-child(even)
          padding-left: 17px !important
</style>
