const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: "eval",
    mode: process.env.NODE_ENV,
    entry: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?reload=true",
        "webpack/hot/only-dev-server",
        "./example/index.js"
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        //do not emit compiled assets that include errors
    ],
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "example"),
                    path.join(__dirname, "src")
                ],
                loader: require.resolve('babel-loader'),
                options: {
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                    compact: false
                },
            }
        ]
    }
};
