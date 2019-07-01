import * as types from '../mutation-types'
import { Toast } from 'vant'
let ajaxloading = null
const loading = () => {
  ajaxloading && ajaxloading.clear()
  ajaxloading =
        Toast.loading({
          mask: false,
          forbidClick: false,
          duration: 0,
          loadingType: 'spinner'
        })
  return ajaxloading
}
const tip = (msg, fn = null) => {
  Toast({
    message: msg,
    duration: 2000,
    position: 'bottom',
    onClose () {
      fn && fn()
      console.log('tip关闭了')
    }
  })
}
// state
const state = {
  [types.setCancelTokenTarget]: false,
  [types.setAxiosLoading]: loading,
  [types.setTip]: tip,
  [types.updateTabBar]: false,
  [types.setTransitionName]: ''
}
// actions
const actions = {
  // 设置请求终止开关
  [types.setCancelTokenTarget] ({ commit }, target) {
    commit(types.setCancelTokenTarget, target)
  },
  // 设置请求蒙层
  [types.setAxiosLoading] ({ commit }, target) {
    commit(types.setAxiosLoading, target)
  },
  // 设置提示
  [types.setTip] ({ commit }, target) {
    commit(types.setTip, target)
  },
  // 设置tabBar更新开关
  [types.updateTabBar] ({ commit }, target) {
    commit(types.updateTabBar, target)
  },
  // 设置前进后退动画name
  [types.setTransitionName] ({ commit }, target) {
    commit(types.setTransitionName, target)
  },
}
// mutations
const mutations = {
  [types.setCancelTokenTarget] (state, target) {
    state[types.setCancelTokenTarget] = target
  },
  [types.setAxiosLoading] (state, target) {
    let loading = state[types.setAxiosLoading]()
    if (target) {
      console.log('打开loading')
      return loading
    } else {
      return loading.clear()
    }
  },
  [types.setTip] (state, target) {
    let { msg, fn } = target
    state[types.setTip](msg, fn)
  },
  [types.setTransitionName] (state, {to, from}) {
    let routeDeep = ["login", "register", "privates"];
    if(to.meta.child){
      routeDeep = [to.name]
    }
    if(from.meta.child){
      routeDeep = [from.name]
    }
      const toDepth = routeDeep.indexOf(to.name);
      const fromDepth = routeDeep.indexOf(from.name);
      let transitionName =
        toDepth > fromDepth
          ? "fold-left"
          : toDepth == fromDepth
          ? ""
          : "fold-right";
          console.log('%ctransitionName: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',transitionName);
    state[types.setTransitionName] = transitionName
  }
}
// getters
const getters = {
  getAxiosLoading (state) {
    return state[types.setAxiosLoading]
  },
  getCancelTokenTarget (state) {
    return state[types.setCancelTokenTarget]
  },
  getTransitionName( state ){
    return state[types.setTransitionName]
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
