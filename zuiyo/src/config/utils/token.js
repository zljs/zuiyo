/* eslint-disable import/prefer-default-export */
import { getStore } from './storage'

export const getToken = (errorCb = null) => {
  let jwt = getStore('zToken')
  if (!jwt) {
    errorCb && errorCb()
  }
  return jwt
}
