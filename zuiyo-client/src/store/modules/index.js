/**
 * 以一种一次性的方式自动导入所有 vuex modules
 * 不应该有任何理由编辑这个文件。
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
