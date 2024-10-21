const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { Generator } = require("webpack");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname, "build"),
        assetModuleFilename: 'assets/[name][ext]',
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
       template: path.resolve (__dirname,'src', 'index.html'),

    }),
    new MiniCssExtractPlugin({
        filename: 'index.css',
    })

   ],
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
          {
            test: /\.(c|sa|sc)ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
          {
            test: /\.woff2?$/i,
               type: 'asset/resource',
               generator: {
                   filename: 'fonts/[name][ext]',
            }
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
          }
        ],
      },
      
};