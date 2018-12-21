import Vue from 'vue'
import Router from 'vue-router'
import Curtain from 'components/curtain/curtain'
import Home from 'components/home/home'
import Notes from 'components/notes/notes'
import Record from 'components/record/record'
import Travel from 'components/travel/travel'
import Message from 'components/message/message'
import Writer from 'components/writer/writer'
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
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
