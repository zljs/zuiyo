const formatTimer = function (val, chart, hours) {
  if (val) {
    var dateTimer = new Date(val)
    var y = dateTimer.getFullYear()
    var M = dateTimer.getMonth() + 1
    var d = dateTimer.getDate()
    var h = dateTimer.getHours()
    var m = dateTimer.getMinutes()
    M = M >= 10 ? M : '0' + M
    d = d >= 10 ? d : '0' + d
    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m
    if (hours) {
      return y + chart + M + chart + d + ' ' + h + ':' + m
    } else {
      return y + chart + M + chart + d
    }
  }
}

const formatTime = function (val) {
  if (val) {
    var dateTimer = new Date(val)
    var y = dateTimer.getFullYear()
    var M = dateTimer.getMonth() + 1
    var d = dateTimer.getDate()
    var h = dateTimer.getHours()
    var m = dateTimer.getMinutes()
    M = M >= 10 ? M : '0' + M
    d = d >= 10 ? d : '0' + d
    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m
    // if (hours) {
    //     return y + chart + M + chart + d + ' ' + h + ':' + m
    // } else {
    //     return y + chart + M + chart + d
    // }
    return y + '年' + M + '月' + d + '日' + ' ' + h + ':' + m
  }
}

export default {
  formatTimer, formatTime
}
