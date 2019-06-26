import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = []
/**
 * 自动扫描子模块路由并导入
 */
const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 1如果是根目录的index.js、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  // 兼容import export和require module . export 两种规范
  routes = [...routes, ...(routerModule.default || routerModule)]
})

let router = new VueRouter({
  routes: [
    ...routes,
    {
      path: '*',
      redirect:'/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.current.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });
router.afterEach((to, from, next) => {
  // 页面滚动至顶部
  window.scrollTo(0, 0)
})

export default router
