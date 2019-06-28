const bodyParser = require('koa-bodyparser')
const session = require('koa-session');
const koajwt = require('koa-jwt');

const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
const miToken = require('./mi-token')
const conf = require('../config')()

const unlessPath = [/\/login/, /\/register/, /\/getSmsCode/, /\/checkUpdate/]
module.exports = (app) => {
  // session
  app.keys = ['zuiyo secret']
  app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 1000 * 60, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
  }, app))


  // 请求异常中间件
  app.use(miHttpError())
  // 日志
  app.use(miLog(conf))

  // 参数解析
  app.use(bodyParser())

  // request封装
  app.use(miSend())

  // token校验,过滤
  app.use(koajwt({
    secret: 'zToken'
  }).unless({
    path: unlessPath
  }));

  app.use(miToken().unless({
    path: unlessPath
  }))

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
