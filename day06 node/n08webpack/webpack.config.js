const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack =require('webpack')

const config = {
  // 开发模式,默认找public文件夹的资源
  mode: 'development',
  // 入口
  // entry: path.resolve(__dirname, './src/login/index.js'),
  entry: {
    'login': path.resolve(__dirname, 'src/login/index.js'),
    'content': path.resolve(__dirname, 'src/content/index.js'),
    // 'publish': path.resolve(__dirname, 'src/publish/index.js')
  },

  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/index.js',
    clean: true
  },
  // http自动打包
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      // 绝对路径
      filename: path.resolve(__dirname, 'dist/login/index.html'),
      template: path.resolve(__dirname, 'public/login.html'),
      useCdn: process.env.NODE_ENV === 'production', // 生产模式下使用 cdn 引入的地址
      chunks:['login']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/content.html'), // 模板文件
      filename: path.resolve(__dirname, 'dist/content/index.html'), // 输出文件
      useCdn: process.env.NODE_ENV === 'production', // 生产模式下使用 cdn 引入的地址
      chunks: ['content']
    }),
    new MiniCssExtractPlugin({
      filename: './[name]/index.css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })

  ],
  // css加载器（loader）自动打包
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [process.env.NODE_ENV = 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV = 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },

    ],
  },
  // 打包优化器 
  optimization: {
    // css压缩，没有写在自动打包的plugins设置项里
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  // 解析
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }


};
// 开发环境下使用 sourcemap 选项
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map'
}
// 生产环境下使用相关配置
if (process.env.NODE_ENV === 'production') {
  // 外部扩展（让 webpack 防止 import 的包被打包进来）
  config.externals = {
    // key：import from 语句后面的字符串
    // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
    'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
    'axios': 'axios',
    'form-serialize': 'serialize',
    '@wangeditor/editor': 'wangEditor'
  }
}

module.exports = config