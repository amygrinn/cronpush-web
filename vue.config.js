const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const backend = 'https://cronpush.tygr.info/api' // 'http://localhost:8080'

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
    port: 8081,
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../reports/build-report.html',
      }),
      new MomentLocalesPlugin(),
    ],
  },
}
