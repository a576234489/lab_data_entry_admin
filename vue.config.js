const path = require('path')
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir)
}

const utils = require('./src/common/utils')
module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        assets:'@/assets',
        common:'@/common',
        components:'@/components',
        network:'@/network',
        views:'@/views'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]

  },
  chainWebpack: config => {
    config.module
        .rule('svg')
        .uses.clear()
    config.module
        .rule('svg1')
        .test(/\.svg$/)
        .use('svg-sprite')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
        .include
        .add(resolve('src/icons'))
        .end()
  }
}
