"use strict";

const NODE_ENV = process.env.NODE_ENV;
const path = require("path");
const webpack = require("webpack");
module.exports = {
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                query: {presets: ["es2015", "react"]}
            },
            {
                test: /three/,
                loader: "babel-loader",
                query: {presets: ["es2015", "react"]}
            },
            { test: /\.glsl$/, loader: "raw"}
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ["node_modules"]
    },
    context: path.join(__dirname, "frontend"),
    entry: {
        arkanoid: "./arkanoid"
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
        publicPath: "public"
    },
    devServer: {
        host: "0.0.0.0"
    },
    watch: NODE_ENV != "production",
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == "development" ? "source-map" : null,
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
if (NODE_ENV == "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
                unsafe: true
            }
        })
    );
}
