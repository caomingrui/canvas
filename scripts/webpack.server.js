const merge = require("webpack-merge").merge;
const webpackBase = require('./webpack.base');

module.exports = merge(webpackBase, {
    devServer: {
        port: '2333',
        compress: true
    },
});
