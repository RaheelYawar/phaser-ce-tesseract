const path = require("path");
const CONFIG = require('./config');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const tesseract = path.join(__dirname, "node_modules/tesseract.js/dist/tesseract.min.js");

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    resolve: {
        alias: {
            "tesseract.js": tesseract,
        }
    }
});