const merge = require('webpack-merge')

const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                // mini-css-extract-plugin 暂时不支持hmr
                use: ExtractTextPlugin.extract( {
                    fallback: 'style-loader',
                    use: 'css-loader'
                } )
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
    }
})
