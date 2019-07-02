import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/utils/vconsole.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import vueTouch from '@/config/utils/vtouch.js'
vueTouch(Vue)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
