<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>换个心情</span>
    </div>
    <!-- 换肤列表 -->
    <div class="content-wrap">
      <p class="warning">以下主题供您选择：</p>
      <ul class="theme-list">
        <li
          class="theme-item"
          v-for="(item,index) in themeList"
          :style="{'background': item.color }"
          :key="item.id"
          @click="chooseTheme(index)">
            <p v-show="themeIndex === index">当前主题:{{item.color}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {saveToLocal} from 'common/js/util'
export default {
  data () {
    return {
      themeIndex: 0,
      themeList: [
        { color: '#3d464d' },
        { color: '#379cf3' }
      ]
    }
  },
  created () {
    // 设置用户选择主题
    let theme = window.localStorage.getItem('theme')
    if (!theme) {
      return
    }
    let index = JSON.parse(theme).index
    this.chooseTheme(index)
  },
  methods: {
    // 主题选择
    chooseTheme (index) {
      this.themeIndex = index
      // 为html设置自定义标签，识别标签改变主题样式。
      window.document.documentElement.setAttribute('data-theme', 'theme' + index)
      // 存储选择至localStrage
      saveToLocal('theme', 'index', this.themeIndex)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .content-wrap
    .warning
      margin-bottom: 30px
    .theme-list
      display: flex
      flex-wrap: wrap
      .theme-item
        width: 180px
        height: 200px
        margin-right: 21px
        cursor: pointer
        box-sizing: border-box
        &:nth-child(5n)
          margin-right: 0
        p
          text-align: center
          position: relative
          top: 100%
          line-height: 30px
</style>
