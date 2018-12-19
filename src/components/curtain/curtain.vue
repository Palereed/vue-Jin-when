<template>
  <div class="wrap">
    <div class="title">
      <h1 class="name">{{title}}</h1>
      <span class="desc">{{desc}}</span>
    </div>
    <div class="avatar"></div>
    <p class="welcome">
      <router-link to="/home">{{welcome}}</router-link>
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
      .name
        position relative
        font-size: $font-title
        height: 80px
        line-height: 80px
        text-align: center
        margin-bottom: 20px
        &:before,&:after
          width: 35px
          height: 35px
          content: ""
          position: absolute
        &:before
          border-top: 4px solid $home-fontcolor
          border-left: 4px solid $home-fontcolor
          top: 0px
          left: 0px
        &:after
          border-bottom: 4px solid $home-fontcolor
          border-right: 4px solid $home-fontcolor
          right: 0px
          bottom: 0px
    .avatar
      width: 220px
      height: 220px
      background: url("/static/images/maomi.jpg") no-repeat center
      &:hover
        animation: swing 1s
        -moz-animation: swing 1s
        -webkit-animation: swing 1s
        -o-animation: swing 1s
    .welcome
      font-size: $font-normal
      &:hover 
        animation: tada 1s
        -moz-animation: tada 1s
        -webkit-animation: tada 1s
        -o-animation: tada 1s
</style>
