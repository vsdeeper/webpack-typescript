module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  performance: {
    // 打包资源过大提示
    hints: false
  },
  optimization: {
    // 对调试更友好的可读的id
    moduleIds: 'named',
    // 多入口必要配置，将runtime代码拆分为一个单独的chunk
    runtimeChunk: 'single',
    // 提取第三方库，减少向server端获取资源
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
}
