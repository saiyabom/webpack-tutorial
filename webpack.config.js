const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const resolve = (entry) => {
  return path.resolve(__dirname, entry);
}
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.js', '.jsx'],
  },
 
  entry: './src/index.js',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              babelrc: false,
              plugins: [
                require('@babel/plugin-proposal-object-rest-spread'),
                require('@babel/plugin-proposal-async-generator-functions'),
              
              ]
            }
          }
        ]

      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
}