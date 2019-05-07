<template>
  <div class="wrap">
    <div class="title">
      <h1 class="name">{{title}}</h1>
      <span class="desc">{{desc}}</span>
    </div>
    <div class="avatar"></div>
    <p class="welcome">
      <router-link to="/home/notes">{{welcome}}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '锦时',
      desc: '吾之素年，汝与锦时。',
      welcome: '进入锦时'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .wrap
    display: flex
    flex-direction: column
    justify-content: space-around
    align-items: center
    height: 100%
    padding-bottom: 10%
    box-sizing: border-box
    .title
      text-align: center
      .name
        position relative
        font-size: $font-jinwhen
        height: 80px
        line-height: 80px
        margin-bottom: 20px
        padding: 0 40px
        &:before,&:after
          width: 35px
          height: 35px
          content: ""
          position: absolute
        &:before
          border-top: 4px solid $home-font
          border-left: 4px solid $home-font
          top: 0px
          left: 0px
        &:after
          border-bottom: 4px solid $home-font
          border-right: 4px solid $home-font
          right: 0px
          bottom: 0px
    .avatar
      width: 220px
      height: 220px
      background: url("/static/images/maomi.jpg") no-repeat center
      &:hover
        animation: swing 1s
    .welcome
      font-size: $font-just
      &:hover
        animation: tada 1s
  .mobile
    .wrap
      .title
        .name
          font-size: $mobileFont-jinwhen
          height: 1.2rem
          line-height: 1.2rem
          margin-bottom: .3rem
          padding: 0 .6rem
          &:before,&:after
            width: .5rem
            height: .5rem
          &:before
            border-top: .06rem solid $home-font
            border-left: .06rem solid $home-font
          &:after
            border-bottom: .06rem solid $home-font
            border-right: .06rem solid $home-font
      .avatar
        width: 3.6rem
        height: 3.6rem
        background: url("/static/images/maomi.jpg") no-repeat
        background-size: 3.6rem
      .welcome
        font-size: $mobileFont-middle
</style>
