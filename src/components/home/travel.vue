<template>
  <div class="travel-wrap">
    <div class="toptalk">
      <i class="icon-quote-left"></i>
      <p>{{title}}</p>
      <i class="icon-quote-right"></i>
    </div>
    <div class="time-wrap">
      <!-- 珍藏加载 -->
      <loading :data="travelsArr"></loading>
      <ul class="time-line" v-for="travel in travelsList" :key="travel.id">
        <li class="tl-header">
          {{travel.month}}
        </li>
        <ul class="tl-body" v-for="item in travel.items" :key="item.id">
          <li class="tl-item">
            <div class="tl-wrap">
              <span class="tl-data">{{item.day}}</span>
              <p class="tl-content">
                <a :href="item.link" class="tl-link">{{item.content}}</a>
              </p>
            </div>
          </li>
        </ul>
      </ul>
      <ul class="time-line" v-show="travelsArr.length">
        <li class="tl-header">
          <h2>开始</h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {travelsList} from 'api/api'
import Loading from 'components/template/loading'
export default {
  data () {
    return {
      title: '前端之路如打擂，当撼大摧坚，徐徐图之，久久见功。',
      travelsList: {},
      // travelsList为对象，没有length，需要声明一个数组传给loading组件
      travelsArr: []
    }
  },
  created () {
    this.getTravel()
  },
  methods: {
    getTravel () {
      travelsList().then((res) => {
        let travels = {}
        res.data.forEach(item => {
          let month = this.dateFormat(item.time).match(/\d+年\d+月/g)[0]
          let day = this.dateFormat(item.time).match(/\d+日/g)[0]
          if (!travels[month]) {
            travels[month] = {
              month: month,
              items: []
            }
          }
          travels[month].items.push(
            {
              day: day,
              link: item.link,
              content: item.content
            }
          )
        })
        this.travelsList = this.sortObj(travels)
        this.travelsArr = Object.keys(this.travelsList)
      })
    },
    sortObj (obj) {
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
    dateFormat (e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '年'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      let D = date.getDate() + '日'
      date = Y + M + D
      return date
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .travel-wrap
    .time-wrap
      margin-top: 30px
      margin-bottom: 10px
      font-size: $font-default
      .time-line
        .tl-header
          width: 100px
          padding: 10px 5px
          border-radius: 50px
          background: $home-navbg
          color: #fff
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
                background: #fff
                border: 3px solid $home-navbg
                border-radius: 50%
                box-shadow: 0 0 0 3px #fff
              .tl-data
                display: block
                width: 75px
                margin-left: -70px
              .tl-content
                max-width: 700px
                padding: 12px
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
                  left: -7px
                .tl-link
                  color: #fff
  .mobile
    .travel-wrap
      margin-bottom: .2rem
      .time-wrap
        margin-top: .3rem
        margin-bottom: .1rem
        font-size: $mobileFont-small
        .time-line
          .tl-header
            width: 1.5rem
            height: .5rem
            line-height: .5rem
            display: flex
            align-items: center
            justify-content: center
            padding: 0
            border-radius: .3rem
          .tl-body
            .tl-item
              .tl-wrap
                padding: .2rem 0 .2rem .2rem
                margin-left: .75rem
                border-left: .08rem solid $home-navbg
                &:before
                  position: absolute
                  content: ""
                  width: 6px
                  height: 6px
                  left: -8px
                  background: #fff
                  border: 3px solid $home-navbg
                  border-radius: 50%
                  box-shadow: 0 0 0 3px #fff
                .tl-data
                  display: block
                  width: 1.3rem
                  margin-left: -1rem
                  font-size: $mobileFont-small
                .tl-content
                  max-width: 5.1rem
                  padding: .2rem
                  border-radius: .15rem
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
</style>
