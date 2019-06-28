/* eslint-disable import/prefer-default-export */
import { getStore, setStore } from './storage'
import getParam from './getParam'

export const getToken = (errorCb = null) => {
  let jwt = getStore('zToken')
  if (!jwt) {
    errorCb && errorCb()
  }
  return jwt
}
