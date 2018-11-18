const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const glob = require('glob')
/*
@ref https://github.com/webpack/webpack/issues/6568
```shell
yarn add extract-text-webpack-plugin@next -D
```
 */
// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry: () => {
    let entries = {}
    glob.sync('./public/*.html').forEach((filepath, idx) => entries['page' + idx] = filepath)
    return entries
  },

    module: {
        rules: [
            // 这两行是处理 react 相关的内容
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {   // load font
                // Capture eot, ttf, woff, and woff2
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    /**
                     * url-loader 是 file-loader 的封装，返回指定文件的
                     * DataUrl。但是如果文件大于指定的限制`limit`，就会
                     * 默认使用 file-loader 来处理。
                     * @type {String}
                     */
                    loader: 'url-loader',
                    options: {
                        limit: 4048,
                        publicPath: './css/font/',
                        outputPath: './css/font/',
                        name: '[name].[ext]'
                    }
                },
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                  }
                },
              ]
            },

        ]
    },
    plugins: [
       ...glob.sync('./public/*.html').map((html, idx) =>
         new HtmlWebpackPlugin({
           title: "My Blog App",
           template: html,
           filename: "page" + idx + ".html",
           chunks: ['page' + idx]
         })
       )
    ]
}
