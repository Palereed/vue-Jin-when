import Vue from 'vue'
import Router from 'vue-router'
import Curtain from 'components/curtain/curtain'
import Home from 'components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Curtain
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
