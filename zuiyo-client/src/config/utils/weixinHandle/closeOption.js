/* eslint-disable import/prefer-default-export */

export function closeMenu () {
  function onBridgeReady () {
    WeixinJSBridge.invoke('closeWindow')
  }

  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export function f_close () {
  if (typeof WeixinJSBridge !== 'undefined') {
    WeixinJSBridge.call('closeWindow')
  } else {
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
        window.opener = null
        window.close()
      } else {
        window.open('', '_top')
        window.top.close()
      }
    } else if (navigator.userAgent.indexOf('Firefox') > 0) {
      window.location.href = 'about:blank '
      // window.history.go(-2);
    } else {
      window.opener = null
      window.open('', '_self', '')
      window.close()
    }
  }
}
