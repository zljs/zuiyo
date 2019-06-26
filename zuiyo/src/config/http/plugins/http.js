// import { Toast } from "vant";
import axios from '../http'
import { openLoading } from '@/config/utils/storeUtils.js'
const httpGet = async (option, params = null, showDialog = false) => {
  // 请求动画loading
  if (showDialog) {
    openLoading()
  }

  try {
    let res = await axios({
      ...option,
      params: params
    })
    console.log('%cres: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',res);
    return res
  } catch (e) {
    console.error(e)
    return false
  }
}

const httpPost = async (option, data = null, showDialog = false) => {
  // 请求动画loading
  if (showDialog) {
    openLoading()
  }

  try {
    let res = await axios({
      ...option,
      data: data
    })
    console.log('%cres: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',res);
    return res
  } catch (e) {
    console.error(e)
    return false
  }
}


export { httpGet, httpPost }
