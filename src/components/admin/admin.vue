<template>
  <div class="admin-wrap">
    <div class="admin-nav">
      <h1 class="title"><i class="icon-paper-plane"></i>{{title}}</h1>
      <!-- 菜单栏 -->
      <el-menu
        :default-active="this.$route.path"
        class="admin-menu"
        router>
        <nav-menu :navMenus="navList"></nav-menu>
      </el-menu>
    </div>
    <div class="admin-content">
      <div class="content-top">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="breadCrumb">
          <el-breadcrumb-item v-for="(crumb,index) in crumbList" :key="crumb.id">
            <span v-if="index === crumbList.length - 1">{{ crumb.meta.title }}</span>
            <router-link v-else :to="crumb.path">{{ crumb.meta.title }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="manager-wrap">
          <span>{{nickName}}</span>
          <img :src="adminAvatar">
        </div>
      </div>
      <div class="main-content">
        <div class="panel">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navMenu from 'components/admin/menu'
import {navList} from './nav'
import {getSession} from 'common/js/util'
export default {
  data () {
    return {
      title: '锦时喵管家',
      crumbList: {},
      adminAvatar: '',
      nickName: ''
    }
  },
  created () {
    this.navList = navList
    // 管理员信息
    let info = getSession('adminSecret')
    if (!info.avatar) {
      this.$router.push('/admin/login')
    }
    this.adminAvatar = info.avatar
    this.nickName = info.nickname
  },
  mounted () {
    this.getBreadcrumb()
  },
  methods: {
    // 面包屑
    getBreadcrumb () {
      // this.$route.matched当前路由的所有嵌套路径片段的路由记录
      let matched = this.$route.matched.filter(item => item.meta.title ? item.meta.title : {})
      const home = matched[0]
      if (home && home.name !== 'index') {
        matched = [{path: '/home', meta: { title: '锦时' }}].concat(matched)
      }
      this.crumbList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  components: {
    navMenu
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/theme.styl'
  .admin-wrap
    height: 100%
    padding-left: 230px
    .admin-nav
      width: 230px
      height: 100%
      position: fixed
      left: 0
      top: 0
      box-sizing: border-box
      navBoder()
      navBack()
      .title
        display: flex
        justify-content: center
        align-items: center
        width: 230px
        height: 60px
        box-sizing: border-box
        font-weight: 700
        font-size: 20px
        navBack()
        navBoder()
        navTitle()
        titleBorder()
        i
          margin-left: -15px
          margin-right: 18px
      .admin-menu
        &.el-menu, .el-menu
          navBack()
        .el-submenu
          .el-menu--inline li
            padding-left: 68px !important
        .el-menu-item
          height: 48px
          line-height: 48px
          navFont()
        .el-submenu__icon-arrow
          font-size: 14px
          font-weight: 700
        .el-submenu__title
          navFont()
        .el-menu-item:hover, .el-menu-item:hover i, .el-menu-item.is-active, .el-submenu__title:hover , .el-submenu__title:hover i, .el-submenu__title.is-active
          navFonton()
        .el-submenu__title:hover, .el-menu-item:focus, .el-menu-item:hover, .el-menu-item.is-active
          navBackon()
        .el-submenu__title:focus, .el-submenu__title:hover
          navBack()
  .admin-content
    background: $admin-bg
    .content-top
      display: flex
      justify-content: space-between
      align-items: center
      height: 60px
      line-height: 60px
      border-bottom: 1px solid $admin-line
      background: #fff
      padding: 0 30px
      box-sizing: border-box
      .manager-wrap
        display: flex
        align-items: center
        span
          margin-right: 10px
        img
          width: 50px
          height: 50px
          border-radius: 50%
      .breadCrumb
        .el-breadcrumb__inner a, .el-breadcrumb__inner
          color: $admin-font
        .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover
          breadCrumb()
    .main-content
      box-sizing: border-box
      padding: 30px
      .panel
        box-sizing: border-box
        padding: 20px 0
        border: 1px solid $admin-line
        background: #fff
        border-radius: 5px
        min-height: 818px
        .pagination-wrap
          margin-top: 30px
          display: flex
          justify-content: center
        .search-wrap,.panel-name
          border-bottom: 1px solid $admin-line
          padding: 0 16px
          margin-bottom: 20px
        .panel-name
          padding-bottom: 20px
          span
            panelName()
            margin-left: -10px
            padding-left: 10px
        .table-wrap,.form-wrap,.content-wrap
          padding: 0 16px
        .form-wrap
          width: $main-width - 1
</style>
