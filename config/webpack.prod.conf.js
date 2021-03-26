module.exports = {
  mode: 'production',
  performance: {
    // 打包资源过大提示
    hints: 'warning'
  },
  optimization: {
    // 模块标识符，防止未修改的模块重复打包
    moduleIds: 'deterministic',
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
