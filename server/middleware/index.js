const bodyParser = require('koa-bodyparser')

const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')

const conf = require('../config')()


module.exports = (app) => {
  
  app.use(miHttpError())

  app.use(miLog(conf))

  app.use(bodyParser())
  app.use(miSend())

  // 增加错误的监听处理
  app.on('error', (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
