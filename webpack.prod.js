const path = require('path');
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
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
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "DL MUSIC TAG APP",
            template: "src/index.html",
            filename:"index.html"

        })
    
    ]
})