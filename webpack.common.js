const path = require("path");
const SRC = path.resolve(__dirname, 'public');

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.join(__dirname, "public", "dist"),
        filename: "bundle.js",
        publicPath: "/"
    }
}