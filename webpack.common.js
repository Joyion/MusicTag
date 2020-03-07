const path = require("path");

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.join(__dirname, "public", "dist"),
        filename: "bundle.js"
    }
}