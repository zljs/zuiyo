const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};
module.exports = {
  devServer: {
    open: false,
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    disableHostCheck: true,
    proxy: {
      '/zuiyo': {
        target: 'http://0.0.0.0:3000/', // 接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/*': '' // 需要rewrite的,
        }
      }

    },
    progress: true
  },
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@', resolve('src'))
        // .set('assets', resolve('src/assets'))
        // .set('components', resolve('src/components'))
},

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  }
}
