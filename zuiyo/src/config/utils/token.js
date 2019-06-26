/* eslint-disable import/prefer-default-export */
import { getStore, setStore } from './storage'
import getParam from './getParam'

export const getToken = (errorCb = null) => {
  let jwt = getParam('jwt')
  if (jwt) {
    setStore('jwt', jwt)
    sessionStorage.setItem('TD_SARECEIVE', jwt.slice(37, 85))
    return jwt
  }
  // window.indexedDB.add(jwt)
  jwt = getStore('jwt')
  jwt && sessionStorage.setItem('TD_SARECEIVE', jwt.slice(37, 85))
  if (!jwt) {
    errorCb && errorCb()
  }
  return jwt
}
