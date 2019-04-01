import Vue from 'vue'
import Router from 'vue-router'
import Curtain from 'components/home/curtain'
// home
import Home from 'components/home/home'
import Notes from 'components/home/notes'
import Record from 'components/home/record'
import Travel from 'components/home/travel'
import Message from 'components/home/message'
import Writer from 'components/home/writer'

// admin
import Login from 'components/admin/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Curtain
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/notes',
          component: Notes
        },
        {
          path: '/home/record',
          component: Record
        },
        {
          path: '/home/travel',
          component: Travel
        },
        {
          path: '/home/message',
          component: Message
        },
        {
          path: '/home/writer',
          component: Writer
        },
        {
          path: '/home/login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      component: Login
    }
  ],
  linkActiveClass: 'active'
})
