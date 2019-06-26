/* eslint-disable import/prefer-default-export */
(function (isToAvoidPersist = true) {
  document.body.onpageshow = e => {
    function onBridgeReady () {
      WeixinJSBridge.invoke('hideOptionMenu')
    }

    function avoidPersist (event) {
      if (event.persisted) {
        window.location.reload()
      }
    }

    if (isToAvoidPersist) {
      avoidPersist(e)
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
})()
