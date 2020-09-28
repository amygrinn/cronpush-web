const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const backend = 'http://localhost:8080' // 'https://cronpush.tygr.info/api'

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['src/styles'],
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: backend,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MomentLocalesPlugin(),
    ],
  },
}
