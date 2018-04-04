const webpack = require( 'webpack' )

const merge = require( 'webpack-merge' )

const base = require( './webpack.base' )

const MiniCssPlugin = require( 'mini-css-extract-plugin' )

module.exports = merge( base, {

  mode: 'production',

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
        ), // a chunk has no name!!!
        new MiniCssPlugin( {
            filename: '[name].[chunkhash:6].css',
            chunkFilename: '[name].[chunkhash:6].css'
        } )
    ]
} )
