const RetCode = require('../../utils/retcode')
module.exports = (opts = {}) => {
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (e) {
      let status = parseInt(e.status)
      console.log(e.status);

      if (status >= 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            // fileName = status
            break
          case 401:
              ctx.status = 401;
              ctx.sendError(RetCode.Fail)
              ctx.throw(401)
            break
          default:
            // fileName = 'other'
        }
      } else {
        status = 500
        // fileName = status
      }
    }
  }
}
