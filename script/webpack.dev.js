const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.base')

module.exports = merge(base, {

    mode: 'development',

    output: {
        filename: '[name].boudle.js',
        path: __dirname + "./../dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                  MiniCssExtractPlugin.loader,
                  "css-loader"
                ]
            },
            {
              test: /\.html$/,
              use: [ {
                loader: 'html-loader',
                options: {
                  minimize: false
                }
              } ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin( {
            filename: "[name].css",
            chunkFilename: "[id].css"
        } )
    ]
})
