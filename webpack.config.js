const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        lambda1: './modules/lambda1/index.ts',
        lambda2: './modules/lambda2/index.ts',
    },
    mode: 'production',
    resolve: {
        alias: {
            ourproduct: path.resolve(__dirname, 'modules/'),
        },
        extensions: ['.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
}
