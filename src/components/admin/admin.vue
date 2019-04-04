<template>
  <div class="admin-wrap">
    <div class="admin-nav">
      <h1 class="title"><i class="icon-paper-plane"></i>{{title}}</h1>
      <el-menu
        default-active="/admin/user/list"
        class="admin-menu"
        router>
        <el-menu-item index="/admin/user/list">
          <i class="el-icon-menu icon-user-o"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item index="/admin/notes/edit">文章发布</el-menu-item>
          <el-menu-item index="/admin/notes/list">文章列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">独白管理</span>
          </template>
          <el-menu-item index="/admin/record/edit">独白发布</el-menu-item>
          <el-menu-item index="/admin/record/list">独白列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span slot="title">珍藏管理</span>
          </template>
          <el-menu-item index="/admin/travel/edit">珍藏发布</el-menu-item>
          <el-menu-item index="/admin/travel/list">珍藏列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin/message/list">
          <i class="el-icon-message"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </template>
          <el-menu-item index="/admin/setting/skin">换个心情</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="admin-content">
      <div class="content-top">
        <el-breadcrumb separator="/" class="breadCrumb">
          <el-breadcrumb-item v-for="(crumb,index) in crumbList" :key="crumb.id">
            <span v-if="index === crumbList.length - 1">{{ crumb.meta.title }}</span>
            <router-link v-else :to="crumb.path">{{ crumb.meta.title }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="manager-wrap">
          <img src="/static/images/owner.jpg">
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
export default {
  data () {
    return {
      title: '锦时喵管家',
      crumbList: {}
    }
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .admin-wrap
    height: 100%
    padding-left: 230px
    .admin-nav
      width: 230px
      height: 100%
      background: $admin-navbg
      position: fixed
      left: 0
      top: 0
      .title
        display: flex
        justify-content: center
        align-items: center
        width: 230px
        height: 60px
        background: $admin-navbgon
        color: #fff
        font-weight: 700
        font-size: 20px
        i
          margin-left: -15px
          margin-right: 18px
      .admin-menu
        &.el-menu, .el-menu
          background: $admin-navbg
        .el-submenu
          .el-menu--inline li
            padding-left: 68px !important
        .el-menu-item
          height: 48px
          line-height: 48px
          color: $admin-navfont
        .el-submenu__icon-arrow
          font-size: 14px
          font-weight: 700
        .el-submenu__title
          color: $admin-navfont
        .el-menu-item:hover, .el-menu-item:hover i, .el-menu-item.is-active, .el-submenu__title:hover , .el-submenu__title:hover i, .el-submenu__title.is-active
          color: $admin-navon
        .el-submenu__title:hover, .el-menu-item:focus, .el-menu-item:hover, .el-menu-item.is-active
          background: $admin-navbgon
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
        width: 50px
        height: 50px
        border-radius: 50%
        overflow: hidden
        img
          width: 100%
          height: 100%
      .breadCrumb
        .el-breadcrumb__inner a, .el-breadcrumb__inner
          color: $admin-font
        .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover
          color: #000
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
          padding: 0 20px
          margin-bottom: 20px
        .panel-name
          padding-bottom: 20px
          span
            border-left: 4px solid $admin-navbg
            margin-left: -10px
            padding-left: 10px
        .table-wrap,.form-wrap
          padding: 0 20px
        .form-wrap
          width: $main-width
</style>
