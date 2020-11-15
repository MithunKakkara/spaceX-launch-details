const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  resolve: {
   extensions: ['.js', '.jsx']
},
  entry: {
    client: './src/client.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
         test: /\.(js|jsx)?$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/react',
                    '@babel/preset-env'
                ]
            }
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    url: false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            },
            {
                loader: "sass-loader",
                options: {
                    url: false
                }
            },
            {
                loader: "webpack-import-glob-loader",
                options: {
                    url: false
                }
            }
        ]
    },
   ]
 },
 plugins: [
   new MiniCssExtractPlugin({
      filename: '[name].css',
   })
 ],
}
