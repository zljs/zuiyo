/* eslint-disable import/prefer-default-export */
import { getCookie, setCookie } from './cookie'

export const getJWT = errorCb => {
  let jwt = getCookie('cpicwx-jwt')
  if (jwt) {
    setCookie('cpicwx-jwt', jwt)

    return jwt
  }
  // jwt = getStore('jwt')
  if (!jwt) {
    errorCb()
  }
  return jwt
}
