const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const buildConf = require('./build')
// const fs = require('fs');
// const dotenv = require('dotenv');
// const envConfig = dotenv.parse(fs.readFileSync('./staging/.env.dev'));
// console.log(envConfig)

module.exports = (env) => {
  
  // 组装entry，plugins
  const entry = {}
  const plugins = []
  const files = glob.sync('src/views/**/index.ts')
  const fileNames = files.map(file => {
    const lastIndex = file.lastIndexOf('index.ts')
    return file.substring(10, lastIndex - 1)
  })
  fileNames.map(fileName => {
    const nFileName = fileName.slice(0, 1).toLowerCase() + fileName.slice(1)
    entry[nFileName] = [`./src/views/${fileName}`]
    if (env.STAGING === 'dev.local') {
      entry[nFileName].push(/* 热重载配置 */`webpack-dev-server/client?http://localhost:${buildConf.port}`)
    }

    const htmlObj = new HtmlWebpackPlugin({
      title: fileName,
      favicon: buildConf.favicon,
      filename: `${nFileName}.html`,
      chunks: [`${nFileName}`],
      template: `src/views/${fileName}/index.html`,
      inject: 'body',
      minify: true
    })
    plugins.unshift(htmlObj)
  })

  return {
    entry,
    devServer: {
      index: buildConf.index,
      contentBase: path.join(__dirname, '../dist'),
      open: true,
      hot: true,
      port: 1314
    },
    output: {
      publicPath: '/',
      filename: 'js/[name].[contenthash:7].js',
      path: path.resolve(__dirname, '../dist'),
      clean: true
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: plugins.concat(
      // 分阶段（dev|uat|prod）将自定义全局变量打包成可在项目中调用的变量
      new Dotenv({
        path: path.resolve(__dirname, `../staging/.env.${env.STAGING}`),
        safe: true,
        defaults: true
      })
    ),
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            'style-loader',
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Postcss 编译成 CSS
            'postcss-loader'
          ] //  webpack loader 从右到左 / 从底到顶执行
        },
        {
          test: /\.s[ac]ss$/i,
          //  webpack loader 从右到左 / 从底到顶执行
          use: [
            // 将 JS 字符串生成为 style 节点
            'style-loader',
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Postcss 编译成 CSS
            'postcss-loader',
            // 将 Sass 编译成 CSS
            {
              loader: 'sass-loader',
              options: {
                // 设置`dart-sass` 是首选
                implementation: require("sass"),
                sassOptions: {
                  // 提升编译速度
                  fiber: false
                }
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          // webpack5及以上支持
          type: 'asset',
          // 自定义输出目录和文件名
          generator: {
            filename: 'img/[name].[hash:7][ext][query]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 10kb
            }
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          // webpack5及以上支持
          type: 'asset',
          // 自定义输出目录和文件名
          generator: {
            filename: 'fonts/[name].[hash:7][ext][query]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 10kb
            }
          }
        },
        // import导入csv|tsv|xml类型的数据将被解析为JSON
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.xml$/i,
          use: ['xml-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
}
