import { Encrypt, Decrypt } from './crypto'

const storage = window.localStorage
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

export const setLocalStore = (key, value) => {
  storage.setItem(key, serialize(value))
}

export const removeLocalStore = key => {
  storage.removeItem(key)
}
export const getLocalStore = key => deserialize(storage.getItem(key))
