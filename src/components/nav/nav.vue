<template>
  <div class="nav" :class="{'close': lock === false}">
    <div class="navbtn">
      <i :class="isLock" @click='toggleNav'></i>
    </div>
    <div class="title">
      <span>{{title}}<i>{{desc}}</i></span>
    </div>
    <div class="avatar"></div>    
    <div class="navlist">
      <router-link to="/home">
        <span>前端那些事</span>
      </router-link>
      <router-link to="/record">
        <span>喵之物语篇</span>
      </router-link>
      <router-link to="/travel">
        <span>看官往这看</span>
      </router-link>
      <router-link to="/message">
        <span>留点足印呗</span>
      </router-link>
      <router-link to="/writer">
        <span>瞅瞅这只喵</span>
      </router-link>  
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
    isLock() {
      return this.lock ? 'icon-lock-fill' : 'icon-unlock-fill'
    }
  },
  methods: {
    toggleNav: function() {
      this.lock = !this.lock
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .nav
    position: fixed
    top: 0
    left: 0
    width: 280px
    height: 100%
    background: $home-leftnav
    color: $home-navcolor
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around
    box-sizing: border-box
    padding-bottom: 5%
    transition: transform .5s
    &.close
      transform: translate3d(-280px, 0, 0)
    .navbtn
      position: absolute
      right: 20px
      top: 20px
      font-size: $font-big
      cursor: pointer
    .title
      font-size: $font-big
      i
        font-size: $font-default
        font-style: normal
    .avatar
      width: 180px;
      height: 180px;
      border-radius: 100px;
      background: url("/static/images/maomi.jpg") no-repeat center;
      background-size: 180px;
      border: 8px solid rgba(10, 10, 10, 0.2);
      box-sizing: border-box
    .navlist
      width: 180px
      a
        width: 100%
        height: 80px
        line-height: 80px
        display: inline-block
        position: relative
        font-size: $font-small
        color: $home-navcolor
        &:hover
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
</style>
