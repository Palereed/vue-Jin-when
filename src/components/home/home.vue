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
    <div class="open-nav" @touchstart="toggleNav" :class="{'no-nav': lock === true}">
      <i class="icon-menu"></i>
    </div>
    <div class="content-wrap" @mousemove="weakNav" :class="{'no-nav': lock === false}">
      <div class="main-wrap" @touchstart="hideNav">
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
  mounted () {
    if (this.isMobile()) {
      this.lock = false
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
      if (this.lock || this.isMobile()) {
        return
      }
      if (e.clientX < 10) {
        this.toggleNav()
      }
    },
    hideNav: function () {
      this.lock = false
    },
    isMobile: function () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true
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
    min-width: 1280px
    .open-nav
      display: none
    .avatar-wrap
      display: flex
      flex-grow: .2
      .avatar
        width: 180px
        height: 180px
        border-radius: 100px
        background: url("/static/images/maomi.jpg") no-repeat center
        background-size: 180px
        border: 8px solid rgba(10, 10, 10, 0.2)
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
      z-index: 1
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
            background: url("/static/images/menupic.png")
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
        .toptalk
          width: 100%
          height: 100px
          background: #fff
          padding: 20px
          box-sizing: border-box
          position: relative
          text-align: center
          font-size: $font-just
          p
            height: 100%
            line-height: 1.4
            display: flex
            align-items: center
            justify-content: center
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
  .mobile
    .page-wrap
      overflow-x: hidden
      min-width: 100%
      .open-nav
        position: fixed
        width: .8rem
        height: .8rem
        border-radius: .1rem
        background: $home-navbg
        right: -.1rem
        bottom: 2rem
        z-index: 1
        transition: transform .5s
        display: flex
        justify-content: center
        align-items: center
        font-size: .52rem
        color: #fff
        &.no-nav
          transform: translate3d(100%, 0, 0)
      .avatar-wrap
        .avatar
          width: 2.58rem
          height: 2.58rem
          border-radius: 1.5rem
          background: url("/static/images/maomi.jpg") no-repeat center
          background-size: 2.6rem
          border: .12rem solid rgba(10, 10, 10, 0.2)
      .nav
        width: $mobileNav-width
        &.close
          transform: translate3d(-($mobileNav-width), 0, 0)
        .navbtn
          display: none
        .title
          font-size: $mobileFont-title
          i
            font-size: $mobileFont-default
        .navlist
          width: 3.2rem
          a
            height: 1.2rem
            line-height: 1.2rem
            font-size: $mobileFont-just
            &.active,&:hover
              cursor: pointer
              color: #fff
              &:after
                animation: none
              span
                &:before,&:after
                  display: none
            &:after
              content: ''
              display: block
              width: 1.2rem
              height: .96rem
              background: url("/static/images/menupic.png")
              background-size: 1.2rem .96rem
              position: absolute
              top: .12rem
              right: 0
            span
              &:before,&:after
                border: none
      header
        height: 1.6rem
        margin-bottom: -1.6rem
      .content-wrap
        padding-left: $mobileNav-width
        &.no-nav
          transform: translate3d(-($mobileNav-width), 0, 0)
        .main-wrap
          width: $mobileMain-width
          padding: 0 .2rem
          box-sizing: border-box
        .toptalk
            height: 1.6rem
            padding: .4rem .4rem .3rem .4rem
            font-size: $mobileFont-just
            .icon-quote-left,.icon-quote-right
              font-size: $mobileFont-normal
              position: absolute
            .icon-quote-left
              top: .2rem
              left: 0
            .icon-quote-right
              bottom: .2rem
              right: 0
        footer
          width: $mobileMain-width
          padding: 0
          font-size: $mobileFont-normal
          padding: .2rem
          box-sizing: border-box
          span
            &:nth-child(2)
              display: none
</style>
