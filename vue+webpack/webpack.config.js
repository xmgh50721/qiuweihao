const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack')

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
    filename: 'bundle.js',
    // 输入路径
    path: path.join(__dirname, 'dist'),

  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
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
      },
      {
        test: /\.(gif|jpeg|jpg|svg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, //图片最小值
              name: '[name].[ext]' // name npm文件名 ext 后缀 输出
            }
          }
        ]
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
    new HTMLplugin({

    }),
    new VueLoaderPlugin(),
    
  ],

}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map' //webpack 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  // webpack devServer
  config.devServer = {
    port: '8082', // 端口
    host: '0.0.0.0', // ip地址
    overlay: { // 报错处理
      errors: true,
    },
    // historyFallback: {
      
    // }, // 
    // open: true, //编译成功自动打开
    hot: true  //热更新
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //热更新 plugin
    new webpack.NoEmitOnErrorsPlugin() 
  )
}

module.exports = config