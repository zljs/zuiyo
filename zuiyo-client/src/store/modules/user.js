import * as types from '../mutation-types'
import { setStore, getStore } from "@/config/utils/storage.js"
const state = {
    user: {
        loggedIn: false,//登录标示
        isSubscribed: false //订阅标示
    },
    account:{
        phone:'',
        password:''
    }
}
const getters = {
    auth(state) {
        if(getStore('zToken')){
            state.user.loggedIn = true
        }
        return state.user
    },
    getAccount(state){
        if(getStore('account')){
            state.account = getStore('account')
        }
        return state.account
    }
}
const actions = {

    // 设置登录状态
    [types.setLoggedIn]({ commit }, target) {
        commit(types.setLoggedIn, target)
    },
    // 设置订阅状态
    [types.setSubscribed]({ commit }, target) {
        commit(types.setSubscribed, target)
    },
    // 设置账户信息
    [types.setAccount]({ commit }, target) {
        commit(types.setAccount, target)
    },
}
// mutations
const mutations = {
    [types.setLoggedIn](state, target) {
        let obj = Object.assign(state.user,{loggedIn: target})
        state.user = obj
    },
    [types.setSubscribed](state, target) {
        state.user.isSubscribed = target
    },
    [types.setAccount](state, account) {
        state.account = account
        setStore('account',account)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}