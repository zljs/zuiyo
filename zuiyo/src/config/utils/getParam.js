
// export default name => {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
//     var r = window.location.search.substr(1).match(reg); //匹配目标参数
//     if (r != null) return decodeURIComponent(r[2]); //返回参数值
//     return "";
//   };

// 兼容search和hash参数
export default (name = null) => {
  let query = {}
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => query[k] = v)
  location.hash.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => query[k] = v)
  if (name) {
    return query[name]
  }
  return query
}
