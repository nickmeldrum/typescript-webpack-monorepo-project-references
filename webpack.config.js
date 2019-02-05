const webpack = require('webpack')
const path = require('path')

module.exports = {
    devtool: 'sourcemap',
    entry: {
        lambda1: './modules/lambda1/index.js',
        lambda2: './modules/lambda2/index.js',
    },
    mode: 'production',
    resolve: {
        alias: {
            ourproduct: path.resolve(__dirname, 'modules/'),
        },
    },
    module: {
        rules: [
        ],
    },
}
