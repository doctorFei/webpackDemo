const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'vue'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../public/vendor'),
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            name: '[name]_library',
            path: path.join(__dirname, '../public/vendor/[name]-mainfest.json')
        })
    ]
};