// const userinfo = require('./db-controller/userinfo.js')
const jwt = require('jsonwebtoken');
const RetCode = require('../../utils/retcode')
const GetUuid = require('../../utils/uuid')
const { Encrypt, Decrypt } = require('../../utils/crypto')
const decodeToken = require('../../utils/decodeToken')

module.exports = () => {
  let User = global.dbHelper.getModel('user')
  return {
    // 发送验证码
    getSmsCode: async (phone) => {
      let data, errmsg
      try {
        const oldDoc = await User.findOne({ phone: phone })
        if (oldDoc) {
          errmsg = RetCode.UserExisted
        } else {
          // 模拟发送验证码
          let charactors = "1234567890";
          let value = '', i;
          for (j = 1; j <= 4; j++) {
            i = parseInt(10 * Math.random());
            value = value + charactors.charAt(i);
          }
          data = {
            smsCode: value
          }
        }
        return { data, errmsg }
      } catch (e) {
        errmsg = RetCode.SchemaFail
        return { data, errmsg }
      }
    },
    // 注册
    register: async (phone) => {
      let data, errmsg
      try {
        const oldDoc = await User.findOne({ phone: phone })
        if (oldDoc) {
          errmsg = RetCode.UserExisted
        } else {
          let pwd = Encrypt(GetUuid().split('-')[0])
          // 新建用户
          const newDoc = await User.create({
            phone,
            name: phone,
            password: pwd,
            uuid: GetUuid()
          })
          if (newDoc) {
            // 模拟发送账号密码
            data = {
              isOk: true,
              phone: newDoc.phone,
              password: Decrypt(newDoc.password)
            }
          }
        }
        return { data, errmsg }
      } catch (e) {
        errmsg = RetCode.RegisterFail
        return { data, errmsg }
      }
    },
    // 登陆
    login: async (phone, password) => {
      let data, errmsg
      try {
        const oldDoc = await User.findOne({ phone, password: Encrypt(password) })
        console.log(oldDoc);
        if (oldDoc) {
          const token = jwt.sign({
            phone: oldDoc.phone,
            _id: oldDoc._id
          }, 'zToken', { expiresIn: '2h' })
          let updateDoc = await User.updateOne(oldDoc, { token, loginTime: Date.now() })
          if (updateDoc) {
            data = {
              isOk: true,
              zToken: token
            }
          } else {
            errmsg = RetCode.LoginFail
          }
        } else {
          errmsg = RetCode.PhoneOrPasswordError
        }
        return { data, errmsg }
      } catch (e) {
        console.log(e);
        errmsg = RetCode.LoginFail
        return { data, errmsg }
      }
    },
    // 退出登录
    logout: async (ctx) => {
      const token = ctx.body.token
      let data, errmsg
      let userDoc = await User.findOne({ token: token })
      if (userDoc) {

        let outDoc = await User.updateOne(userDoc, { token: '' })
        if (outDoc) {
          ctx.body.token = ''
          data = {
            exited: true,
          }
        } else {
          errmsg = RetCode.LogoutFail
        }
      } else {
        errmsg = RetCode.Fail
        ctx.throw(401)
      }
      return { data, errmsg }

    },
    // 获取用户信息
    getUserInfo: async (ctx) => {
      const token = ctx.body.token
      let data, errmsg
      let userDoc = await User.findOne({ token: token })
      if (userDoc) {
        const { name, phone, avatar, createTime, roles } = userDoc
        data = { name, phone, avatar, createTime: createTime.getTime(), roles }
      } else {
        errmsg = RetCode.Fail
        ctx.throw(401)
      }
      return { data, errmsg }

    }
  }
}