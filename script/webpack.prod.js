const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const base = require('./webpack.base')


module.exports = merge(base, {

    mode: 'production',

    output: {
        filename: '[name].boudle.js',
        path: __dirname + "./../dist"
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin( {
                cache: true,
                parallel: true,
                sourceMap: true,
            } ),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader'
                  ]
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                } ],
            }
        ]
    },

    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin(
            chunk => chunk.name || 'faceless-chunk'
        ),
        new MiniCssPlugin({
            filename: '[name].[chunkhash:6].css',
            chunkFilename: '[id].css'
        } )
    ]
} )
