const path = require("path");
const SRC = path.resolve(__dirname, 'public');
const Dotenv = require("dotenv-webpack");
const { plugin } = require("mongoose");

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.join(__dirname, "public", "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new Dotenv()
    ]
}