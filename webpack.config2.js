const path = require("path");
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  entry: "./src/pages/index.js",
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
      }, {
        // 它会应用到普通的 `.js` 文件
        // 以及 `.vue` 文件中的 `<script>` 块
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }, {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   // 开启 CSS Modules
            //   modules: true,
            //   // 自定义生成的类名
            //   localIdentName: '[local]_[hash:base64:8]'
            // }
          }
        ]
      }, {
        test: /\.less$/,
        use: [{
          loader: "vue-style-loader" // creates style nodes from JS strings
        }, {
          loader: 'css-loader',
          // options: {
          //   modules: true
          // }
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            esModule: false
          },
        }, ],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        use: [{
          loader: "file-loader"
        }]
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: "file-loader?limit=10000&mimetype=application/octet-stream"
        }]
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: "file-loader?limit=10000&mimetype=image/svg+xml"
        }]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
    // alias: {
    //   '$assets': path.resolve(__dirname, './assets'),
    // }
  },
  output: {
    path: "/dist",
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    // library: `${packageName}-[name]`,
    // libraryTarget: 'umd',
    // jsonpFunction: `webpackJsonp_${packageName}`,
  },
  devServer: {
    port: 96,
    historyApiFallback: true,
    open:true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/pages/index.html",
      publicPath: "/", //输出静态页面页面的资源文件的前缀,
    }),
    new VueLoaderPlugin()
  ]
}