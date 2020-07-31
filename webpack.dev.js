const path = require('path');
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC = path.resolve(__dirname, 'mp3');

// process.env.NODE_ENV = process.env.NODE_ENV || "development";
// if(process.env.NODE_ENV === 'development')
// {
//  const dotenv = require('dotenv').config({path: path.resolve(__dirname, '.env')})
// }
// else {
//   const dotenv = require('dotenv').config({path: path.resolve(__dirname, '.env')})
  
// }

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.m?js$/,
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    "plugins": [
                        "@babel/plugin-proposal-object-rest-spread"
                      ]
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.mp3$/,
                include: SRC,
                loader: 'file-loader',
              }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "public", "dist"),
        historyApiFallback: true,
        
        proxy: {
            // for when you have a separate API backend development server and you want to send API requests on the same domain
            '/api': "http://localhost:5000"
            
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "DL MUSIC APP",
            template: "src/index.html",

        })
    
    ]
})