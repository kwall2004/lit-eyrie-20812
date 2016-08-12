const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// The drive letter is lower case in VS Code.
const dirname = __dirname.replace(/^([A-Z]:)/, function (x) { return x.toLowerCase(); });

const PATHS = {
    src: path.join(dirname, 'src'),
    build: path.join(dirname, 'build')
};

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: {
        app: path.join(PATHS.src, 'components/main'),
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
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['file?name=[name].css', 'extract', 'css'],
                include: path.join(dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                loaders: ['style/url', 'file?name=[name].css', 'extract', 'css'],
                include: PATHS.src
            },
            {
                test: /\.less$/,
                loaders: ['style/url', 'file?name=[name].[hash].css', 'extract', 'css', 'less'],
                include: PATHS.src
            },
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                include: PATHS.src
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "file" 
            },
            { 
                test: /\.(woff|woff2)$/, 
                loader: "url?prefix=font/&limit=5000" 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "url?limit=10000&mimetype=application/octet-stream" 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "url?limit=10000&mimetype=image/svg+xml" 
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            publicPath: '/'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': "'production'"
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
};
