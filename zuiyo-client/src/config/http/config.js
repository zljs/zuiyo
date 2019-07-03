const root = '/zuiyo'
export default {
  method: 'post',
  baseURL: root,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  timeout: 15000,
  withCredentials: false,
  responseType: 'json'
}
