import { Encrypt, Decrypt } from './crypto'

const storage = window.sessionStorage
const serialize = val => Encrypt(JSON.stringify(val))
const deserialize = val => {
  if (!val) {
    return null
  }
  let res = ''
  try {
    res = Decrypt(val)
  } catch (e) {
    res = val
  }
  res !== undefined ? res : val

  return (res = JSON.parse(res))
}

export const setStore = (key, value) => {
  storage.setItem(key, serialize(value))
}

export const removeStore = key => {
  storage.removeItem(key)
}

export const getStore = key => deserialize(storage.getItem(key))



/**
 * localStatorage设置超时时间
 * 
 * @param {localStatorage键值} key 
 * @param {localStatorage值} value 
 * @param {超时时间(毫秒)} expire 
 */
export const setLsExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire,
  }

  ls.setItem(key, serialize(obj));
};

export const getLsExpire = key => {
  let value = ls.getItem(key);
  if (!value) {
    // localStorage不存在
    return "nonExistent";
  }
  value = JSON.parse(value);
  if(Date.now() - value.time > value.expire){
      ls.removeItem(key);
      return "timeout";
  }
  return value.data;
};