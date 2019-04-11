// 样式引入
import 'common/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// ie promise报错
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(ElementUI)

// Vue bus
Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
