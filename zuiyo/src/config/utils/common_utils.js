import wx from 'weixin-js-sdk'

/** js发送post请求 */
export const postRequest = (URL, PARAMS) => {
  var temp = document.createElement('form')
  temp.action = URL
  temp.method = 'post'
  temp.style.display = 'none'
  for (var x in PARAMS) {
    var opt = document.createElement('textarea')
    opt.name = x
    opt.value = PARAMS[x]
    // alert(opt.name)
    temp.appendChild(opt)
  }
  document.body.appendChild(temp)
  temp.submit()
  return temp
}
/**
 * 验证字符串
 */
export const isNull = str => {
  return !!(str == null ||
    str == undefined ||
    str == 'null' ||
    str == '' ||
    str == '"null"')
}

/**
 * by函数接受一个成员名字符串做为参数
 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数 */
export const by = (name) => {
  return function (o, p) {
    var a, b
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name]
      b = p[name]
      if (a === b) {
        return 0
      }
      if (typeof a === typeof b) {
        return a > b ? -1 : 1
      }
      return typeof a > typeof b ? -1 : 1
    } else {
      throw 'error'
    }
  }
}
/**
 * 单体模式
 * 实现一个跨浏览器的事件处理程序
 */
export const EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      // FF
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on' + type, handler)
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      // FF
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
      // IE
      element.detachEvent('on' + type, handler)
    }
  }
}

// 判断是否是微信小程序
export function isWeChatApplet() {
  const ua = window.navigator.userAgent.toLowerCase()

  return new Promise((resolve) => {
    if (ua.indexOf('micromessenger') == -1) { // 不在微信或者小程序中
      resolve(true)
    } else {
      wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) { // 在小程序中
          resolve(false)
        } else { // 在微信中
          resolve(true)
        }
      })
    }
  })
}

// 获取 url 中参数的值
// @params name 参数的 key
export const getQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 获取 url 中所有参数的值
export const getFullQueryString = () => {
  let q = {}
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
  return q
}

// 随机更改数组元素顺序，混淆数组
export const randomArr = (arr) => arr.slice().sort(() => Math.random() - 0.5)
// 生成随机十六进制代码 如：'#c618b2'
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
}

// js四则运算
export const formatFloat = (f, digit) => {
  let m = Math.pow(10, digit)
  return Math.round(f * m, 10) / m
}

// 获取页面基础路径
export const getBaseUrl = () => {
  const protocol = window.location.protocol
  const domain = document.domain
  const port = window.location.port
  const baseUrl = `${protocol}//${domain}:${port}`
  return baseUrl
}

// 工具跳转方法
export function commonLink(url) {
  window.location.href = url
}

