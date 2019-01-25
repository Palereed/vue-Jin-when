<template>
  <div class="travel-wrap">
    <div class="toptalk">
      <i class="icon-quote-left"></i>
      <p>{{title}}</p>
      <i class="icon-quote-right"></i>
    </div>
    <div class="time-wrap">
      <ul class="time-line" v-for="travel in travels" :key="travel.id">
        <li class="tl-header">
          <h2>{{travel.month}}</h2>
        </li>
        <ul class="tl-body" v-for="item in travel.items" :key="item.id">
          <li class="tl-item">
            <div class="tl-wrap">
              <span class="tl-data">{{item.day}}</span>
              <p class="tl-content">
                <a :href="item.href" class="tl-link">{{item.content}}</a>
              </p>
            </div>
          </li>
        </ul>
      </ul>
      <ul class="time-line">
        <li class="tl-header">
          <h2>开始</h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '前端之路如打擂，当撼大摧坚，徐徐图之，久久见功。',
      travels: [],
      travelList: [{
        date: 'Mon Sep 21 2017 14:05:30 GMT+0800',
        href: 'https://www.moerats.com/',
        content: '一个好点子'
      },
      {
        date: 'Mon Sep 21 2019 14:05:30 GMT+0800',
        href: 'https://www.moerats.com/',
        content: '一个小demo'
      },
      {
        date: 'Mon Sep 21 2018 14:05:30 GMT+0800',
        href: 'https://www.moerats.com/',
        content: '一个好点子'
      },
      {
        date: 'Mon Jan 21 2019 14:05:30 GMT+0800',
        href: 'https://www.moerats.com/',
        content: '一个好点子'
      },
      {
        date: 'Mon Jan 20 2019 14:05:30 GMT+0800',
        href: 'https://github.com/Palereed',
        content: '一些好玩的'
      },
      {
        date: 'Mon Jan 21 2018 14:05:30 GMT+0800',
        href: 'https://www.swiper.com.cn/',
        content: '一些小探索'
      }]
    }
  },
  mounted () {
    this.travels = this.formatList()
  },
  methods: {
    formatList: function () {
      let travels = {}
      this.travelList.forEach(item => {
        let month = this.dateFormat(item.date).match(/\d+年\d+月/g)[0]
        let day = this.dateFormat(item.date).match(/\d+日/g)[0]
        if (!travels[month]) {
          travels[month] = {
            month: month,
            items: []
          }
        }
        travels[month].items.push(
          {
            day: day,
            href: item.href,
            content: item.content
          }
        )
      })
      travels = this.sortObj(travels)
      return travels
    },
    sortObj: function (obj) {
      let arr = []
      for (let i in obj) {
        arr.push([i, obj[i]])
      }
      arr.sort((a, b) => {
        let num1 = a[0].match(/\d+/g)[0] + a[0].match(/\d+/g)[1]
        let num2 = b[0].match(/\d+/g)[0] + b[0].match(/\d+/g)[1]
        return num2 - num1
      })
      let newObj = {}
      for (let i = 0; i < arr.length; i++) {
        newObj[arr[i][0]] = arr[i][1]
      }
      return newObj
    },
    dateFormat: function (e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '年'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      let D = date.getDate() + '日'
      date = Y + M + D
      return date
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .travel-wrap
    .time-wrap
      margin: 30px 0 10px 0
      .time-line
        .tl-header
          width: 100px
          padding: 10px 5px
          border-radius: 50px
          background: $home-navbg
          color: $home-bg
          text-align: center
        .tl-body
          .tl-item
            .tl-wrap
              padding: 20px 0 20px 20px
              margin-left: 53px
              border-left: 4px solid $home-navbg
              display: flex
              align-items: center
              position: relative
              &:hover
                &:before
                  width: 6px
                  height: 6px
                  left: -8px
              &:before
                position: absolute
                content: ""
                width: 8px
                height: 8px
                left: -9px
                background: $home-bg
                border: 3px solid $home-navbg
                border-radius: 50%
                box-shadow: 0 0 0 3px $home-bg
              .tl-data
                display: block
                width: 75px
                margin-left: -70px
                color: $home-darkgray
              .tl-content
                max-width: 700px
                padding: 15px
                background: $home-navbg
                border-radius: 15px
                position: relative
                &:before
                  content: ''
                  position: absolute
                  display: block
                  width: 0
                  height: 0
                  border: 8px solid transparent
                  border-right-color: $home-navbg
                  border-left-width: 0
                  top: 50%
                  margin-top: -8px
                  left: -8px
                .tl-link
                  color: $home-bg
</style>
