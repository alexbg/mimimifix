const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/mimimifix.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mimimifix.min.js',
    libraryExport: 'default',
    libraryTarget: 'umd',
    library: 'MimimiFix'
  },
  module:{
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader',{
          loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }
        }],
      },
    ]
  }
};