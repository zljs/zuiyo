import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/utils/vconsole.js'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    let elin = el.querySelector("input");
    elin.focus()
  }
})
Vue.directive('auth', function (el, binding) {
  let loggedIn = store.getters.auth.loggedIn
  if (binding.modifiers.loggedIn) {
    // 登录时显示
    if (loggedIn) {
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }
  }
  if (binding.modifiers.loggedOut) {

    // 未登录时显示
    if (loggedIn) {
      el.style.display = 'none'
    } else {
      el.style.display = 'block'
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
