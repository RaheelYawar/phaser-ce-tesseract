const path = require("path");
const CONFIG = require('./config');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const tesseract = path.join(__dirname, "node_modules/tesseract.js/dist/tesseract.min.js");

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
        contentBase: CONFIG.BUILD_PATH,
        compress: true,
   },
    resolve: {
        alias: {
            "tesseract.js": tesseract,
        }
    }
});