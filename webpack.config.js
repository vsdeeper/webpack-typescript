
const { merge } = require('webpack-merge');
const webpackBaseConf = require('./config/webpack.base.conf');
const webpackDevConf = require('./config/webpack.dev.conf');
const webpackProdConf = require('./config/webpack.prod.conf');

module.exports = (env) => {
  if (env.STAGING === 'prod') {
    return merge(webpackBaseConf(env), webpackProdConf);
  } else {
    return merge(webpackBaseConf(env), webpackDevConf);
  }
}
