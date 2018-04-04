var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

/*
@ref https://github.com/webpack/webpack/issues/6568
```shell
yarn add extract-text-webpack-plugin@next -D
```
 */
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry: {
      index:'./src/index.js',
      tags: './src/tags.js'
  },

    module: {
        rules: [

            // 这两行是处理 react 相关的内容
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
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
        new HtmlWebpackPlugin( {
            title: "My Blog App",
            template: './src/templates/index.html',
            filename: "index.html",
            chunks: ['index']
        } ),
        new HtmlWebpackPlugin( {
            template: './src/templates/tags.html',
            filename: "tags.html",
            chunks: ['tags']
        } ),
        new ExtractTextPlugin('style.css')
    ],
};
