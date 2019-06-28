// import { Toast } from "vant";
import axios from '../http'
import { openLoading } from '@/config/utils/storeUtils.js'
import { Encrypt, Decrypt } from '@/config/utils/crypto.js'

const httpGet = async (option, params = null, showDialog = false) => {
  console.log(`%c${option.method}   ${option.url}params: `, 'color: MidnightBlue; background: #ccc; font-size: 16px;', params);
  // 请求动画loading
  if (showDialog) {
    openLoading()
  }

  try {
    let res = await axios({
      ...option,
      params: params
    })
    if (res.success) {
      res.success = JSON.parse(Decrypt(res.success))
    }
    console.log(`%c${option.url}返回值res: `, 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', res);
    return res
  } catch (e) {
    console.error(e)
  }
}

const httpPost = async (option, data = null, showDialog = false) => {
  console.log(`%c${option.method}   ${option.url}请求参数data: `, 'color: MidnightBlue; background: #ccc; font-size: 16px;', data);
  // 请求动画loading
  if (showDialog) {
    openLoading()
  }
  let newData = {}
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const ele = data[key];
      newData[key] = Encrypt(ele)
    }
  }
  try {
    let res = await axios({
      ...option,
      data: newData
    })
    if (res.success) {
      res.success = JSON.parse(Decrypt(res.success))
    }
    console.log(`%c${option.url}返回值res: `, 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', res);
    return res
  } catch (e) {
    console.error('e:', e)
    return false
  }
}


export { httpGet, httpPost }
