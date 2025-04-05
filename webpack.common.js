
import path from "path";
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: {
        app: "./src/app.jsx"
    },
    output: {
        path: path.join(__dirname, "public", "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "Music Tag",
            clean: true
        })
    ]
}