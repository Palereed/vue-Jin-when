<template>
  <div class="poster-wrap" ref="wrap">
    <div class="picture" :class="{'move-center':item.center}" v-for="(item,index) in posterList" :key="item.id" @click="turnPic(index)">
      <div class="turn" :class="{'turn-back': item.turn}">
        <div class="side side-front">{{item.name}}</div>
        <div class="side side-back">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posterList: [
        {
          name: '小球掉落',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        },
        {
          name: '小球掉落2',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        },
        {
          name: '小球掉落3',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        },
        {
          name: '小球掉落4',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        },
        {
          name: '小球掉落5',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        },
        {
          name: '小球掉落6',
          desc: 'canvas学习中的一个小demo',
          turn: false,
          center: false
        }
      ]
    }
  },
  mounted () {
    this.sortPosts()
  },
  methods: {
    turnPic: function (index) {
      this.posterList.forEach(item => {
        item.center = false
      })
      this.posterList[index].center = !this.posterList[index].center
      this.posterList[index].turn = !this.posterList[index].turn
      this.sortPosts()
    },
    randomNum: function (num) {
      let max = Math.max(num[0], num[1])
      let min = Math.min(num[0], num[1])
      let choices = max - min + 1
      return Math.ceil(Math.random() * choices + min)
    },
    sortPosts: function () {
      let posts = this.$refs.wrap.children
      let ranges = this.devideRange()
      for (let i = 0; i < posts.length/2; i++) {
        posts[i].style.left = this.randomNum(ranges.left.x) + 'px'
        posts[i].style.top = this.randomNum(ranges.left.y) + 'px'
        posts[i].style.transform = 'rotate(' + this.randomNum([-90, 90]) + 'deg)'
      }
      for (let i = posts.length/2; i < posts.length; i++) {
        posts[i].style.left = this.randomNum(ranges.right.x) + 'px'
        posts[i].style.top = this.randomNum(ranges.right.y) + 'px'
        posts[i].style.transform = 'rotate(' + this.randomNum([-90, 90]) + 'deg)'
      }
    },
    devideRange: function () {
      let range = {
        left: {
          x: [],
          y: []
        },
        right: {
          x: [],
          y: []
        }
      }
      let wrap = {
        w: this.$refs.wrap.clientWidth,
        h: this.$refs.wrap.clientHeight
      }
      let picture = {
        w: 210,
        h: 290
      }
      range.wrap = wrap
      range.picture = picture
      range.left.x = [0 - picture.w / 2, wrap.w / 2 - picture.w]
      range.left.y = [0 - picture.h / 2, wrap.h - picture.h / 2]
      range.right.x = [wrap.w / 2 + picture.w / 2, wrap.w - picture.w]
      range.right.y = range.left.y
      return range
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .poster-wrap
    width: 1200px
    height: 675px
    margin-top: 30px
    margin-left: -165px
    position: relative
    overflow: hidden
    background: $home-navbg
    .picture
      width: 210px
      height: 290px
      transition: all 1s
      position: absolute
      top: 0
      left: 0
      &.move-center
        top: 50% !important
        left: 50% !important
        transform: rotate(0) !important
        margin: -145px 0 0 -105px
      .turn
        &.turn-back
          transform: rotateY(180deg)
      .turn
        width: 100%
        height: 100%
        transition: all 1s
        transform-style: preserve-3d
        position: relative
        .side
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          padding: 20px
          box-sizing: border-box
          backface-visibility: hidden
          background: #eee
        .side-back
          transform: rotateY(180deg)
</style>
