const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    css: path.join(__dirname, 'css'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
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
            'react-leaflet',
            'react-fontawesome',
            'redux',
            'redux-thunk',
            'immutable',
            'kendo-ui-web/scripts/kendo.grid.min',
            'kendo-ui-web/scripts/kendo.combobox.min',
            'kendo-ui-web/scripts/kendo.datepicker.min',
            'kendo-ui-web/scripts/kendo.tooltip.min',
            'kendo-ui-web/scripts/kendo.data.min',
            'moment',
            'js-cookie',
        ],
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
                include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components'), PATHS.css]
            },
            {
                test: /\.less$/,
                loader: ExtractTextWebpackPlugin.extract('css!less'),
                include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components'), PATHS.css]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
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
                test: /\.(jpg|png|gif)$/,
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
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT,
        outputPath: PATHS.build,
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'bower_components/jquery/dist/jquery.min.js')
        }]),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new ExtractTextWebpackPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: '/'
        })
    ]
};
