
const path=require("path");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const svrPort=92;
const packageName = require('./package.json').name;
module.exports = {
  entry: {
    index:"./src/pages/index.js",
  },
  mode: 'development',
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true 
        }
      },{
        // 它会应用到普通的 `.js` 文件
        // 以及 `.vue` 文件中的 `<script>` 块
        test: /\.js$/,
        loader: 'babel-loader'
      },{
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      },{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },{
        test: /\.less$/,
        use: [{
          loader: "vue-style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },{
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule:false
            },
          },
        ],
      },{
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        use: [{ loader: "file-loader" }]
      },{
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "file-loader?limit=10000&mimetype=application/octet-stream"
          }
        ]
      },{
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{ loader: "file-loader?limit=10000&mimetype=image/svg+xml" }]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      '$assets': path.resolve(__dirname, './src/assets'),
    }
  },
  output: {
    path: __dirname + "/dist",//不能用 "/dist"  ?
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
  devServer: {
    port: svrPort,
    historyApiFallback:true,
    proxy:  [{
      context: ['/cms/api'],
      target: 'http://localhost:81/'
    }],
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:"src/pages/index.html",
      publicPath:"/",//输出静态页面页面的资源文件的前缀,
      filename: "index.html",
      inject: "body",
      chunks: ['index'],
      scriptLoading: "blocking"
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}