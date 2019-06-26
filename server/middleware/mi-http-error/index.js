module.exports = (opts = {}) => {
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (e) {
      let status = parseInt(e.status)
      if (status >= 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            // fileName = status
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
