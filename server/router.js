const router = require('koa-router')({
  prefix: '/zuiyo' // 标示前需要“/”
})
const core = require('koa2-cors')
const HomeController = require('./controller/home')
module.exports = (app) => {
  router.get('/', HomeController.index)

  router.get('/home', HomeController.home)

  router.get('/home/:id/:name', HomeController.homeParams)

  router.get('/user', HomeController.login)

  router.post('/register', HomeController.register)

  router.post('/testpost', HomeController.testpost)
  router.post('/checkUpdate', HomeController.checkUpdate)
  app.use(core())
  app.use(router.routes()).use(router.allowedMethods())
}
