import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 前置页
      path: '/',
      meta: { title: '锦时', keepAlive: false },
      component: resolve => require(['components/home/curtain'], resolve)
    },
    {
      // 主页
      path: '/home',
      meta: { title: '锦时', keepAlive: false },
      redirect: '/home/notes'
    },
    {
      path: '/home',
      meta: { title: '锦时', keepAlive: false },
      component: resolve => require(['components/home/home'], resolve),
      children: [
        {
          // 前端那些事（文章页）
          path: '/home/notes',
          meta: { title: '前端那些事', keepAlive: false },
          component: resolve => require(['components/home/notes'], resolve),
          children: [
            {
              // 文章详情页
              path: '/home/notes/detail/:id',
              name: 'detail',
              component: resolve => require(['components/home/detail'], resolve)
            }
          ]
        },
        {
          // 喵之物语篇（独白页）
          path: '/home/record',
          meta: { title: '喵之物语篇', keepAlive: false },
          component: resolve => require(['components/home/record'], resolve)
        },
        {
          // 看官往这看（珍藏页）
          path: '/home/travel',
          meta: { title: '看官往这看', keepAlive: false },
          component: resolve => require(['components/home/travel'], resolve)
        },
        {
          // 留点足迹呗（留言页）
          path: '/home/message',
          meta: { title: '留点足迹呗', keepAlive: false },
          component: resolve => require(['components/home/message'], resolve)
        },
        {
          // 瞅瞅这只猫（作者页）
          path: '/home/writer',
          meta: { title: '瞅瞅这只猫', keepAlive: false },
          component: resolve => require(['components/home/writer'], resolve)
        }
      ]
    },
    {
      // 后台登录
      path: '/admin/login',
      component: resolve => require(['components/admin/login'], resolve)
    },
    {
      // 喵管家（后台）
      path: '/admin',
      meta: { title: '喵管家', keepAlive: false },
      component: resolve => require(['components/admin/admin'], resolve),
      redirect: '/admin/data',
      children: [{
        // 管家统计
        path: '/admin/data',
        meta: { title: '管家统计', keepAlive: false },
        component: resolve => require(['components/admin/data/data'], resolve)
      },
      {
        // 用户列表
        path: '/admin/user/list',
        meta: { title: '用户管理', keepAlive: false },
        component: resolve => require(['components/admin/user/list'], resolve)
      },
      {
        // 文章发布
        path: '/admin/notes/edit',
        meta: { title: '文章管理 - 发布', keepAlive: false },
        component: resolve => require(['components/admin/notes/edit'], resolve)
      },
      {
        // 文章列表
        path: '/admin/notes/list',
        meta: { title: '文章管理 - 列表', keepAlive: false },
        component: resolve => require(['components/admin/notes/list'], resolve)
      },
      {
        // 独白发布
        path: '/admin/record/edit',
        meta: { title: '独白管理 - 发布', keepAlive: false },
        component: resolve => require(['components/admin/record/edit'], resolve)
      },
      {
        // 独白列表
        path: '/admin/record/list',
        meta: { title: '独白管理 - 列表', keepAlive: false },
        component: resolve => require(['components/admin/record/list'], resolve)
      },
      {
        // 珍藏发布
        path: '/admin/travel/edit',
        meta: { title: '珍藏管理 - 发布', keepAlive: false },
        component: resolve => require(['components/admin/travel/edit'], resolve)
      },
      {
        // 珍藏列表
        path: '/admin/travel/list',
        meta: { title: '珍藏管理 - 列表', keepAlive: false },
        component: resolve => require(['components/admin/travel/list'], resolve)
      },
      {
        // 留言列表
        path: '/admin/message/list',
        meta: { title: '留言管理', keepAlive: false },
        component: resolve => require(['components/admin/message/list'], resolve)
      },
      {
        // 换肤
        path: '/admin/setting/skin',
        meta: { title: '换个心情', keepAlive: false },
        component: resolve => require(['components/admin/setting/skin'], resolve)
      }]
    },
    {
      // 不存在路由跳转至出错页
      path: '*',
      component: resolve => require(['components/template/error.vue'], resolve)
    }
  ],
  linkActiveClass: 'active'
})
