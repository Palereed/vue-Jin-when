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
    </ul>
    <img class="egg" src="../../common/images/cat.png">
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '个人介绍',
      name: '蒹葭（没错，就是这句蒹葭苍苍，白露为霜）',
      self: '好好的一个文艺青年，偶然间闯入前端领域，一遇前端误终身，秉着被JS虐千万遍的执着在成为前端大牛的道路上前进。',
      jinwhen: '个人博客，用于保存日常学习中的问题，并且分享其解决方法。为什么叫锦时？柳絮乘着大风吹，树影下的人想睡..钟声敲响了日落，柏油路跃过山坡..爬满青藤的房子，屋檐下的邻居，在黄昏中飞驰。真的好美，希望自己不忘初心。',
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .writer-wrap
    height: calc(100vh - 54px)
    .avatar-wrap
      margin: 30px 0
      display: flex
      justify-content: center
      .avatar
        border: 0
    .self-info
      color: $home-darkgray
      line-height: 2.5
      li
        display: flex
        span
          width: 60px
        p
          flex: 1
          text-align: justify
        ul.version
          span
            width: 60px
    .egg
      float: right
      margin-top: 10px
      cursor: pointer
</style>
