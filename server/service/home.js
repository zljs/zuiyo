module.exports = {
  checkUpdate: async (version) => {
    let data = null, errmsg = null
    let ReleaseVersion = global.dbHelper.getModel('version')
    try {
      const oldDoc = await ReleaseVersion.findOne({ version: version })
      if (oldDoc) {
        data = {
          needUpdate: false, //版本一致，无需更新
          tabBarList: []
        }
      } else {
        data = {
          needUpdate: true, //版本不一致，需更新
          tabBarList: [
            {
              title: "home",
              name: "home",
              path: "/home",
              icon_default: "home-o",
              icon_selected: "diamond",
              info: ""
            },
            {
              title: "动态",
              name: "dynamic",
              path: "/dynamic",
              icon_default: "star-o",
              icon_selected: "star",
              info: ""
            },
            {
              title: "",
              name: "add",
              path: "/add",
              icon_default: "add-o",
              icon_selected: "add",
              info: ""
            },
            {
              title: "消息",
              name: "news",
              path: "/news",
              icon_default: "smile-comment-o",
              icon_selected: "smile-comment",
              info: ""
            },
            {
              title: "我的",
              name: "mycenter",
              path: "/mycenter",
              icon_default: "manager-o",
              icon_selected: "manager",
              info: ""
            }
          ]
        }
      }
      return { data, errmsg }
    } catch (e) {
      errmsg = {
        code: '-1',
        msg: '网络异常错误'
      }
      return { data, errmsg }
    }
  },
  register: async (name, pwd) => {
    let User = global.dbHelper.getModel('user')
    let data, errmsg
    try {
      const oldDoc = await User.findOne({ name: name })
      if (oldDoc) {
        errmsg = {
          code: '0001',
          msg: '用户名已存在'
        }
      } else {
        const newDoc = await User.create({
          name: name,
          password: pwd
        })
        if (newDoc) {
          data = {
            isOk: true
          }
        }
      }
      return { data, errmsg }
    } catch (e) {
      errmsg = {
        code: '-1',
        msg: '网络异常错误'
      }
      return { data, errmsg }
    }
  },
  testpost: async (name, pwd) => {
    let data = null, errmsg = null
    if (name === 'zoulei' && pwd === '123456') {
      data = {
        title: '个人中心',
        content: '欢迎进入个人中心'
      }
    } else {
      errmsg = {
        code: '0000',
        msg: '账号信息错误'
      }
    }
    return { data, errmsg }
  }
}