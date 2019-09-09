const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack')
// const ExtractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

//process.env 在packge.json 里面申明变量在里面

const isDev = process.env.NODE_ENV === "development"

const config = {
  //taget
  target: "web",
  // 入口
  entry: path.join(__dirname, 'src/index.js'),

  // 输入
  output: {
    // 输入名字
    filename: 'bundle.[hash:5].js',
    // 输入路径
    path: path.join(__dirname, 'dist'),

  },

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpeg|jpg|svg|png)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024, //图片最小值
            name: '[name].[ext]' // name npm文件名 ext 后缀 输出
          }
        }]
      },
    ]
  },

  // 引用插件 
  plugins: [
    // make sure to include the plugin for the magic 最新版的 vue-loader  需要的new
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    // vue and html plugin
    new HTMLplugin(),
    new VueLoaderPlugin(),
  ],

}

if (isDev) {
  config.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'less-loader',

    ]
  })
  config.devtool = '#cheap-module-eval-source-map' //webpack 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  // webpack devServer
  config.devServer = {
    port: '9999', // 端口
    host: '192.168.1.52', // ip地址
    overlay: { // 报错处理
      errors: true,
    },
    // historyFallback: {

    // }, // 
    open: true, //编译成功自动打开
    hot: true //热更新
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //热更新 plugin
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {

  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }

  config.module.rules.push({
    test: /\.less$/,
    // use: Extractplugin.extract({
    // fallback: 'style-loader',
    use: [
      miniCssExtractPlugin.loader,
      'css-loader',
      {
        // 浏览器兼容 css loader
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      // less 编译loader
      'less-loader',
    ]
    // })
  })
  // js hash 编译
  config.output.filename = '[name].[chunkhash:5].js'
  // css hash 编译
  config.plugins.push(
    new miniCssExtractPlugin('styles.[contentHash:5].css'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   splitChunks: {
    //     name: 'vendor'
    //   }
    // })
    
  )
  // webpack 4 CommonsChunkPlugin 取消了 这个 变量 添加了 optimization 来处理 划分插件
  config.optimization = {
    splitChunks: {
      name: 'vendor'
    },
    // 它的作用是将包含chunks 映射关系的 list单独从 
    // app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
    // 所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
    runtimeChunk: {
      name: 'runtime'
    }
  }
}

module.exports = config