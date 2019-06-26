const HomeService = require('../service/home')
module.exports = {
  checkUpdate: async (ctx, _next) => {
    let params = ctx.request.body
    let _VERSION = params.version
    const { data, errmsg } = await HomeService.checkUpdate(_VERSION)
    data && ctx.send(data)
    errmsg && ctx.sendError(errmsg)
  },
  index: async (ctx, _next) => {
    await ctx.render('home/index', { title: 'iKcamp欢迎您' })
  },
  home: async (ctx, _next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },
  homeParams: async (ctx, _next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },
  login: async (ctx, _next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async (ctx, _next) => {
    let params = ctx.request.body
    let username = params.username
    let password = params.password

    if (username && password) {
      let { data, errmsg } = await HomeService.register(username, password)
      data && ctx.send(data)
      errmsg && ctx.sendError(errmsg)
    } else {
      ctx.throw(500)
    }
  },
  testpost: async (ctx, _next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    if (name && password) {
      let { data, errmsg } = await HomeService.testpost(name, password)
      data && ctx.send(data)
      errmsg && ctx.sendError(errmsg)
    } else {
      ctx.throw(500)
    }
  }
}
