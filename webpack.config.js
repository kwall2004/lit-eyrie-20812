const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    css: path.join(__dirname, 'css'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js']
    },
    entry: {
        app: PATHS.src,
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'react-bootstrap',
            'react-router-bootstrap',
            'redux',
            'immutable'
        ]
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('css'),
                include: [path.join(__dirname, 'node_modules'), PATHS.css]
            },
            {
                test: /\.less$/,
                loader: ExtractTextWebpackPlugin.extract('css!less'),
                include: [path.join(__dirname, 'node_modules'), PATHS.css]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=25000',
            },
            {
                test: /\.css$/,
                loaders: ['style/url', 'file?name=[name].css', 'extract', 'css'],
                include: PATHS.src
            },
            {
                test: /\.less$/,
                loaders: ['style/url', 'file?name=[name].css', 'extract', 'css', 'less'],
                include: PATHS.src
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: PATHS.src
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new ExtractTextWebpackPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: '/'
        })
    ]
};
