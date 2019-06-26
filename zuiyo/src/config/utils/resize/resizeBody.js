// 设置滚动条滚动
export const scro = () => {
  var u = navigator.userAgent
  var app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    // let h = document.body.scrollHeight - window.innerHeight
    // document.body.scrollTop = h;
    return
  }
  if (isIOS) {
    let h = document.body.scrollHeight - window.innerHeight
    document.body.scrollTop = h
  }
}

// 判断可视区域下方元素是否向上滚动进入可视区域
export function isInViewPortOfTwo (el) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
  console.log('top', top)
  return top <= viewPortHeight + 100
}
