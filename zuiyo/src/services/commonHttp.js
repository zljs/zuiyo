import { httpPost } from "@/config/http/plugins/http";
import apis from '@/config/network/apiMaps.js'
import { openLoading, tip } from '@/config/utils/storeUtils.js'
import { setStore } from "@/config/utils/storage.js";
const checkUpdate = async (data) => {

  const res = await httpPost(apis.conmonApis.checkUpdate, data)
  return res
}

const getSmsCode = async data => {
  const res = await httpPost(apis.conmonApis.getSmsCode, data)
  if (res) {
    if (res && res.status === 0) {
      tip(`验证码：${res.success.smsCode}`)
      return true
    }
    tip(`${res.errormsg}`)
    return false
  }
}
const register = async (data) => {

  const res = await httpPost(apis.conmonApis.register, data)
  if (res) {
    if (res.status === 0) {
      return res.success
    }
    tip(`${res.errormsg}`)
    return false
  }
}
const login = async (data) => {

  const res = await httpPost(apis.conmonApis.login, data)
  if (res) {
    if (res.status === 0) {
      setStore('zToken',res.success.zToken)
      return res.success.isOk
    }
    tip(`${res.errormsg}`)
    return false
  }
}
const getUserInfo = async (data=null) => {

  const res = await httpPost(apis.conmonApis.getUserInfo, data)
  if (res) {
    if (res.status === 0) {
      return res.success
    }
    tip(`${res.errormsg}`)
    return false
  }
}
const logout = async (data=null) => {

  const res = await httpPost(apis.conmonApis.logout, data)
  if (res) {
    if (res.status === 0) {
      return res.success.exited
    }
    tip(`${res.errormsg}`)
    return false
  }
}
export { checkUpdate, register, getSmsCode, login, getUserInfo, logout };
