module.exports = () => {
  function render(successJson) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify({
      status: 0,
      success: successJson,
      errormsg: null
    })
  }
  function errorRenser(errorMsg) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify({
      status: -1,
      success: null,
      errormsg: errorMsg
    })
  }
  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    ctx.sendError = errorRenser.bind(ctx)
    await next()
  }
}
