<template>
  <div class="page-wrap">
    <div class="nav" :class="{'close': lock === false}">
      <div class="navbtn">
        <i :class="isLock" @click='toggleNav'></i>
      </div>
      <div class="title">
        <span @click="returnHome">{{title}}<i>{{desc}}</i></span>
      </div>
      <div class="avatar-wrap">
        <div class="avatar"></div>
      </div>
      <div class="navlist">
        <router-link to="/home/notes">
          <span>前端那些事</span>
        </router-link>
        <router-link to="/home/record">
          <span>喵之物语篇</span>
        </router-link>
        <router-link to="/home/travel">
          <span>看官往这看</span>
        </router-link>
        <router-link to="/home/message">
          <span>留点足印呗</span>
        </router-link>
        <router-link to="/home/writer">
          <span>瞅瞅这只喵</span>
        </router-link>
      </div>
    </div>
    <header></header>
    <div class="content-wrap" @mousemove="weakNav" :class="{'no-nav': lock === false}">
      <div class="main-wrap">
        <router-view></router-view>
      </div>
      <footer>
        <a href="http://www.miitbeian.gov.cn">豫ICP备18022003号</a>
        <span>Simple is beauty</span>
        <span>Design and code by : 蒹葭</span>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '锦时',
      desc: 'Jin-when',
      lock: true
    }
  },
  computed: {
    isLock () {
      return this.lock ? 'icon-lock-fill' : 'icon-unlock-fill'
    }
  },
  methods: {
    toggleNav: function () {
      this.lock = !this.lock
    },
    weakNav: function (e) {
      if (this.lock) {
        return
      }
      if (e.clientX < 10) {
        this.lock = true
      }
    },
    returnHome: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .page-wrap
    width: 100%
    height: 100%
    .avatar-wrap
      display: flex
      flex-grow: .2
      .avatar
        width: 180px;
        height: 180px;
        border-radius: 100px;
        background: url("/static/images/maomi.jpg") no-repeat center;
        background-size: 180px;
        border: 8px solid rgba(10, 10, 10, 0.2);
        box-sizing: border-box
    .nav
      position: fixed
      top: 0
      left: 0
      width: $nav-width
      height: 100%
      background: $home-navbg
      color: $home-navfont
      display: flex
      flex-direction: column
      align-items: center
      transition: transform .5s
      &.close
        transform: translate3d(-($nav-width), 0, 0)
      .navbtn
        position: absolute
        right: 20px
        top: 20px
        font-size: $font-big
        cursor: pointer
      .title
        font-size: $font-big
        display: flex
        flex-grow: .4
        align-items: center
        i
          font-size: $font-default
          font-style: normal
        span
          cursor: pointer
      .navlist
        width: 180px
        a
          width: 100%
          height: 80px
          line-height: 80px
          display: inline-block
          position: relative
          font-size: $font-normal
          color: $home-navfont
          &.active,&:hover
            cursor: pointer
            color: #fff
            &:after
              animation: wobble 2s
            span
              &:before
                opacity: 1
                left: -6px
              &:after
                opacity: 1
                right: -6px
          &:after
            content: ''
            display: block
            width: 70px
            height: 56px
            background: url(menupic.png)
            background-size: 70px 56px
            position: absolute
            top: 12px
            right: 0
          span
            position: relative
            &:before,&:after
              content: ""
              position: absolute
              opacity: 0
              transition: .3s
              width: 90px
              height: 40px
            &:before
              border-top: 2px solid #c3c3c3
              border-left: 2px solid #c3c3c3
              top: -11px
              left: -10px
            &:after
              border-bottom: 2px solid #c3c3c3
              border-right: 2px solid #c3c3c3
              bottom: -11px
              right: -10px
    header
      width: 100%
      height: 100px
      box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5)
      margin-bottom: -100px
    .content-wrap
      width: 100%
      height: 100%
      box-sizing: border-box
      padding-left: $nav-width
      transition: transform .5s
      &.no-nav
        transform: translate3d(-($nav-width/2), 0, 0)
      .main-wrap
        width: $main-width
        margin: auto
        min-height: 120px
        .toptalk
          width: 100%
          height: 100px
          padding: 20px
          box-sizing: border-box
          position: relative
          text-align: center
          font-size: $font-just
          p
            line-height: 60px
            font-weight: 700
          .icon-quote-left,.icon-quote-right
            font-size: $font-normal
            position: absolute
          .icon-quote-left
            top: 20px
            left: 0
          .icon-quote-right
            bottom: 20px
            right: 0
      footer
        display: flex
        width: $main-width
        margin: auto
        padding: 20px
        font-size: $font-default
        justify-content: space-between
</style>
