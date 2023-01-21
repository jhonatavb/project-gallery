const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    devServer: {
        static: './public',
        port: 9000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new CssMinimizerPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src/', from: '**/*.html' },
                { context: 'src/', from: 'imgs/**/*' }
            ]
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                // add CSS in DOM inject a tag style
                // 'style-loader',
                MiniCssExtractPlugin.loader,
                // interprets @import, url()...
                'css-loader',
                'sass-loader'
            ]
        }/*, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: ['file-loader']
        }*/]
    }
};

