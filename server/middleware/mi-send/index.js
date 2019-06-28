const { Encrypt, Decrypt } = require('../../utils/crypto')
module.exports = () => {
  function render(successJson) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify({
      status: 0,
      success: Encrypt(JSON.stringify(successJson)),
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
    console.log(ctx.request.body);
    let body = ctx.request.body
    for (const key in body) {
      if (body.hasOwnProperty(key) && key != '_t') {
        const ele = body[key];
        body[key] = Decrypt(ele)
      }
    }
    ctx.request.body = body
    ctx.send = render.bind(ctx)
    ctx.sendError = errorRenser.bind(ctx)
    await next()
  }
}
