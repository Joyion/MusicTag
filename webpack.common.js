// const path = require("path");
// const SRC = path.resolve(__dirname, 'public');
// const Dotenv = require("dotenv-webpack");
// const { plugin } = require("mongoose");

// module.exports = {
//     entry: {
//         app: "./src/app.js"
//     },
//     output: {
//         path: path.join(__dirname, "public", "dist"),
//         filename: "bundle.js",
//         publicPath: "/"
//     },
//     plugins: [
//         new Dotenv()
//     ]
// }


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');


import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import sass from "sass";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Music Tag",
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { 'runtime': 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader',
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              implementation: sass
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};