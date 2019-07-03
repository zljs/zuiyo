
class COOKIE {
  getCookie (cname, defaultValue) {
    var value = new RegExp('(^|;| )' + cname + '=([^;]*?)(;|$)', 'g').exec(
      document.cookie
    )
    if (!value) return defaultValue
    console.log('value:', value)
    return value[2]
  }
  setCookie (cname, cvalue, day, path) {
    day = day || 1
    path = path || '/'
    var date = new Date()
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000)
    document.cookie = cname + '=' + cvalue + '; expires=' + date.toGMTString() + '; path=' + path + '; '
  }
  deleteCookie (cname) {
    setCookie(cname, null, -1)
  }
}
export const { getCookie, setCookie, deleteCookie } = new COOKIE()
