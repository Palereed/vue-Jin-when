<template>
  <div class="error-wrap">
    <div class="title">
      <h1 class="name">{{title}}</h1>
      <span class="desc">{{desc}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '出错拉~',
      desc: '吾之素年，汝与锦时。'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .error-wrap
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%
    box-sizing: border-box
    .title
      text-align: center
      margin-bottom: 120px
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
  .mobile
    .error-wrap
      .title
        margin-bottom: 1.2rem
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
</style>
