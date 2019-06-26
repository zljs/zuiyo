import { httpPost } from "@/config/http/plugins/http";
import apis from '@/config/network/apiMaps.js'

const checkUpdate = async (data) => {

  const res = await httpPost(apis.conmonApis.checkUpdate, data)
  return res
}

const register = async (data = null) => {

  const res = await httpPost(apis.conmonApis.register, data)
  return res
}
export { checkUpdate, register };
