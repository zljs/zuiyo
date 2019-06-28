const RetCode = require('../utils/retcode')
const UserService = require('./service/userinfo.js')
const { checkUser, checkPhone } = require('../utils/joi')
module.exports = {
  // 发送验证码
  getSmsCode: async (ctx, next) => {
    const params = ctx.request.body
    const phone = params.phone
    let error = checkPhone(phone)
    if (error) {
      ctx.log.error(error)
      ctx.sendError(RetCode.PhoneError)
      return false
    }
    if (phone) {
      const { data, errmsg } = await UserService().getSmsCode(phone)
      if (data) {
        ctx.session.smscode = data.smsCode
        ctx.send(data)
        ctx.session.sendsms = true
      }
      errmsg && ctx.sendError(errmsg)
    } else {
      ctx.log.error(e)
      ctx.throw(500)
    }
  },
  // 注册
  register: async (ctx, _next) => {
    const params = ctx.request.body
    let error = checkUser(params)
    if (error) {
      ctx.log.error(error)
      ctx.sendError(RetCode.ArgsError)
      return false
    }
    const phone = params.phone
    const authcode = params.authcode
    if (phone && authcode) {
      let session_smscode = ctx.session.smscode
      console.log('session_smscode register: ', session_smscode);
      if (!ctx.session.sendsms || !session_smscode) {
        ctx.sendError(RetCode.ReSendSms)
        return false
      }
      if (authcode !== session_smscode) {
        ctx.sendError(RetCode.SmsCodeError)
        return false
      }
      const { data, errmsg } = await UserService().register(phone, authcode)
      data && ctx.send(data)
      errmsg && ctx.sendError(errmsg)
      ctx.session.smscode = null
      ctx.session.sendsms = false
    } else {
      ctx.log.error(e)
      ctx.throw(500)
    }
  },
  // 登录
  login: async (ctx, next) => {
    const params = ctx.request.body
    let error = checkUser(params)
    if (error) {
      ctx.log.error(error)
      ctx.sendError(RetCode.PhoneOrPasswordError)
      return false
    }
    const phone = params.phone
    const password = params.password
    console.log(phone, password);
    const { data, errmsg } = await UserService().login(phone, password)
    data && ctx.send(data)
    errmsg && ctx.sendError(errmsg)

  },
  // 退出登录
  logout: async (ctx, next) => {

    const { data, errmsg } = await UserService().logout(ctx)
    data && ctx.send(data)
    errmsg && ctx.sendError(errmsg)

  },
  // 获取用户信息
  getUserInfo: async (ctx, next) => {
    const { data, errmsg } = await UserService().getUserInfo(ctx)
    data && ctx.send(data)
    errmsg && ctx.sendError(errmsg)
  }
}
