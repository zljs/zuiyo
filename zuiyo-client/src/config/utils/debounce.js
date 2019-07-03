// 防抖
const debounce = (fn, delay, immediate) => {
  let timer = null

  return function () {
    const context = this
    const args = arguments

    return new Promise((resolve, reject) => {
      timer && clearTimeout(timer)

      if (immediate) {
        // 立即执行
        const doNow = !timer

        timer = setTimeout(() => {
          timer = null
        }, delay)

        doNow && resolve(fn.apply(context, args))
      } else {
        timer = setTimeout(() => {
          resolve(fn.apply(context, args))
        }, delay)
      }
    })
  }
}

export default debounce
