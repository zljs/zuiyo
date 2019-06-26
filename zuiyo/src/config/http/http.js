import axios from 'axios'
import { Toast } from 'vant'
import qs from 'qs'
import router from '@/router'
import config from './config' // 导入默认配置
import { getToken } from '../utils/token'
import { removeStore } from '../utils/storage'
import { tip } from '@/config/utils/storeUtils.js'
const CancelToken = axios.CancelToken
Toast.allowMultiple()
const requestMap = new Map()

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, data, config) => {
  const statusHandle = status => {
    return (status = JSON.stringify(status).match(new RegExp('^5.*$'))
      ? JSON.stringify(status).match(new RegExp('^504.*$'))
        ? '504'
        : '5xx'
      : status)
  }

  requestMap.delete(config._keyString)
  // 状态码判断
  const errorHandleMap = {
    401: () => {
      removeStore('jwt')
      tip('请重新登录！', () => {
        router.push({
          name: 'Login',
          query: {
            selfState: 40001
          }
        })
      })
    },
    404: () => {
      tip('服务器错误')
    },
    504: () => {
      tip('请求超时！')
    },
    '5xx': () => {
      tip('服务器错误')
    }
  }
  return errorHandleMap[statusHandle(status)]()
}

// 在main.js设置全局的请求次数，请求的间隙
// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000
const instance = axios.create(config)

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.interceptors.request.use(
  async config => {
    // 配置token校验
    const token = await getToken()
    token && (config.headers.jwt = token)
    // 防重复提交
    const keyString = qs.stringify(
      Object.assign({}, { url: config.url, method: config.method }, config.data)
    )

    if (requestMap.get(keyString)) {
      // 取消当前请求
      config.cancelToken = new CancelToken(cancel => {
        cancel('请耐心等待～')
      })
    }
    requestMap.set(keyString, true)

    Object.assign(config, { _keyString: keyString })
    // config.url = 
    return {
      ...config,
      data: {
        ...config.data,
        _t: +new Date()
      }
    }
  },
  error => Promise.error(error)
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    // 重置requestMap
    const config = response.config
    requestMap.set(config._keyString, false)

    let data
    if (response.data == undefined) {
      data = response.request.responseText
    } else {
      data = response.data
    }

    return JSON.parse(JSON.stringify(data))
  },
  error => {
    if (error.message.includes('timeout')) {
      tip('请求超时！')
      return false
    }
    const { response } = error
    if (response) {
      const config = response.config
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data, config)
    }
    return Promise.reject(error)
  }
)

export default instance
