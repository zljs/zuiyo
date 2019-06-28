const router = require('koa-router')({
  prefix: '/zuiyo' // 标示前需要“/”
})
const core = require('koa2-cors')
const CommonController = require('./controller/common')
const UserController = require('./controller/userinfo')

module.exports = (app) => {
  router.post('/checkUpdate', CommonController.checkUpdate)

  router.post('/getSmsCode', UserController.getSmsCode)
  router.post('/register', UserController.register)
  router.post('/login', UserController.login)
  router.post('/logout', UserController.logout)
  
  router.post('/getUserInfo', UserController.getUserInfo)

  
  app.use(core())
  app.use(router.routes()).use(router.allowedMethods())
}
