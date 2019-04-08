<template>
  <div class="menu">
    <div v-for="item in navMenus" :key="item.id">
      <!-- 无子菜单 -->
      <el-menu-item
        v-if="item && (item.nodes.length === 0)"
        :index="item.vueRouter">
        <i :class="item.icon"></i>
        <span slot="title">{{item.text}}</span>
      </el-menu-item>
      <!-- 有子菜单 -->
      <el-submenu
        v-if="item && (item.nodes.length > 0)"
        :index="item.index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.text}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="item.nodes"></NavMenu>
      </el-submenu>
    </div>
  </div>
</template>
<script>
export default {
  // name来实现递归
  name: 'NavMenu',
  props: ['navMenus']
}
</script>
