const path = require('path');
const Webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssGapProperties = require('postcss-gap-properties');
module.exports = {
  entry: [
    './app/assets/javascripts/app.js',
    './public/javascripts/shopinvader.jquery.js',
    './public/javascripts/application.js',
  ],
  output: {
    path:     path.resolve(__dirname, '../../public'),
    filename: 'javascripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: () => [
              postcssGapProperties(/* pluginOptions */)
            ]
          } }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                importer: globImporter()
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]&useRelativePath=false&publicPath=../'
      },
      {
        test: /\.(ttf|eot|otf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]&useRelativePath=false&publicPath=../'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader', options: {
              outputPath: 'images/',
              name: '[path][name].[ext]'
            }
          },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } }
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        }]
      }
    ]
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({ filename: 'stylesheets/bundle.css', allChunks: true })
  ]
};
