export const navList = [
  {
    text: '管家统计',
    icon: 'el-icon-date',
    vueRouter: '/admin/data',
    nodes: []
  },
  {
    text: '用户管理',
    icon: 'el-icon-menu icon-user-o',
    vueRouter: '/admin/user/list',
    nodes: []
  },
  {
    index: '1',
    text: '文章管理',
    icon: 'el-icon-tickets',
    nodes: [
      {
        text: '文章发布',
        vueRouter: '/admin/notes/edit',
        nodes: []
      },
      {
        text: '文章管理',
        vueRouter: '/admin/notes/list',
        nodes: []
      }
    ]
  },
  {
    index: '2',
    text: '独白管理',
    icon: 'el-icon-edit',
    nodes: [
      {
        text: '独白发布',
        vueRouter: '/admin/record/edit',
        nodes: []
      },
      {
        text: '独白管理',
        vueRouter: '/admin/record/list',
        nodes: []
      }
    ]
  },
  {
    index: '3',
    text: '珍藏管理',
    icon: 'el-icon-star-off',
    nodes: [
      {
        text: '珍藏发布',
        vueRouter: '/admin/travel/edit',
        nodes: []
      },
      {
        text: '珍藏管理',
        vueRouter: '/admin/travel/list',
        nodes: []
      }
    ]
  },
  {
    text: '留言管理',
    icon: 'el-icon-message',
    vueRouter: '/admin/message/list',
    nodes: []
  },
  {
    index: '4',
    text: '设置',
    icon: 'el-icon-setting',
    nodes: [
      {
        text: '换个心情',
        vueRouter: '/admin/setting/skin',
        nodes: []
      }
    ]
  }
]
