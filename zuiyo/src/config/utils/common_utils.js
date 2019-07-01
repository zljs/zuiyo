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

/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
* 删除左边的空格
* @param str
* @returns {string | * | void}
*/
export function ltrim(str) {
  return str.replace(/(^\s*)/g, "");
}

/**
* 删除右边的空格
* @param str
* @returns {string | * | void}
*/
export function rtrim(str) {
  return str.replace(/(\s*$)/g, "");
}

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
  } else {
      return false;
  }
};

/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
  let u = navigator.userAgent;
  let u2 = navigator.userAgent.toLowerCase();
  return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1,
      //IE内核
      presto: u.indexOf('Presto') > -1,
      //opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1,
      //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1,
      //是否iPad
      webApp: u.indexOf('Safari') == -1,
      //是否web应该程序，没有头部与底部
      iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
      weixin: u2.match(/MicroMessenger/i) == "micromessenger",
      ali: u.indexOf('AliApp') > -1,
  };
};

