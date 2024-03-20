const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
      bookshop: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'code.js',
    },
    mode: 'production',
    plugins: [new MiniCssExtractPlugin()],    
    module: {
      rules: [
        { test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
      ]
    }    
}
