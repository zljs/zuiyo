import apis from './apis'

// const $api_root = process.env.ROOTAPI

let apiMapsKey = Object.keys(apis)


let map = {}
apiMapsKey.forEach(fileName => {
  
  
  map[fileName] = apis[fileName]
})

export default map
