// 样式引入
import 'common/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
