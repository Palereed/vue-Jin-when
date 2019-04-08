<template>
  <div class="writer-wrap">
    <div class="toptalk">
      <i class="icon-quote-left"></i>
      <p>{{title}}</p>
      <i class="icon-quote-right"></i>
    </div>
    <div class="avatar-wrap">
      <div class="avatar"></div>
    </div>
    <ul class="self-info">
      <li>
        <span>昵称：</span>
        <p>{{name}}</p>
      </li>
      <li>
        <span>我么：</span>
        <p>{{self}}</p>
      </li>
      <li>
        <span>锦时：</span>
        <p>{{jinwhen}}</p>
      </li>
      <li>
        <span>历程：</span>
        <ul class="version">
          <li v-for="version in versions" :key="version.id">
            <span>{{version.num}}：</span><p>{{version.desc}}</p>
          </li>
        </ul>
      </li>
      <li>
        <span>邮箱：</span>
        <p>{{email}}</p>
      </li>
      <li>
        <span>Github：</span>
        <a :href="github.href">{{github.desc}}</a>
      </li>
      <li>
        <img src="/static/images/cat.png" @click="linkAdmin">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '个人介绍',
      name: '蒹葭（没错，就是这句蒹葭苍苍，白露为霜）',
      self: '好好的一个文艺青年，偶然间闯入前端领域，一遇前端误终身，秉着被JS虐千万遍的执着在成为前端大牛的道路上前进。',
      jinwhen: '个人博客，用于保存日常学习中的问题，并且分享其解决方法。在上面发发牢骚，缅怀缅怀过去，憧憬憧憬未来，为自己打打气，不忘初心。',
      email: '544989630@qq.com',
      github: {
        href: 'https://github.com/Palereed',
        desc: 'Palereed，锦时在此托管。'
      },
      versions: [{
        num: '[初版]',
        desc: '为了学习Nodejs，感受一把全栈的滋味，磕磕绊绊完成并成功上线。'
      },
      {
        num: '[二版]',
        desc: '实习期，正好要做毕业设计，就用Vue重写一遍吧，也当作对自己学习工作的总结。'
      }]
    }
  },
  methods: {
    linkAdmin () {
      // 若为移动端，不可进入后台
      if (/mobile/.test(document.documentElement.className)) {
        this.$message({
          message: '呀，请从PC端进入喵管家~',
          type: 'warning',
          center: true
        })
        return
      }
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .writer-wrap
    height: calc(100vh - 64px)
    .avatar-wrap
      display: flex
      justify-content: center
      margin: 30px
      .avatar
        border: 0
    .self-info
      li
        display: flex
        line-height: 2.5
        span
          width: 60px
          flex: 0 0 auto
        p
          text-align: justify
        ul.version
          span
            width: 60px
        &:last-child
          justify-content: flex-end
          img
            margin-top: 20px
            cursor: pointer
            filter: brightness(70%)
  .mobile
    .writer-wrap
      height: auto !important
      font-size: $mobileFont-normal
      margin-bottom: .3rem
      .avatar-wrap
        display: flex
        justify-content: center
        margin: .3rem
        .avatar
          border: 0
      .self-info
        li
          display: flex
          span
            flex: .9rem 0 0
            width: .9rem
          ul.version
            span
              width: 1rem
              flex: 1rem 0 0
          &:last-child
            img
              margin-top: .2rem
</style>
