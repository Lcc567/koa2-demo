const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const fs = require('fs')
// const PluginProposalClassProperties= require('@babel/plugin-proposal-class-properties')

let envValues = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8')
envValues = envValues.split('\r\n').reduce((pre, cur) => {
    const keyValue = cur.split('=')
    Object.assign(pre, {
        [keyValue[0]]: JSON.stringify(keyValue[1])
    })
    return pre
}, {})
console.log(envValues);

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 9000,
        contentBase: './dist',
        publicPath: '/',
        historyApiFallback: true
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js', '.jsx', 'ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            ['@babel/preset-react']
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: "css-loader",
                    // options: {
                    //     esModule: true,
                    //     modules: {
                    //         // ?????????true??????????????????import { XX } from 'xx.css'????????????
                    //         // ???????????? import styles from 'xx.css'?????????
                    //         // namedExport: true,
                    //         // localIdentName: 'foo__[name]__[local]',
                    //         localIdentName: '[local]_[hash:5]',
                    //     }
                    // }
                }]
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    // options: {
                    //     esModule: true,
                    //     modules: {
                    //         // ?????????true??????????????????import { XX } from 'xx.css'????????????
                    //         // ???????????? import styles from 'xx.css'?????????
                    //         namedExport: true,
                    //         // localIdentName: 'foo__[name]__[local]',
                    //         localIdentName: '[local]_[hash:5]',
                    //     }
                    // }
                }, {
                    loader: 'less-loader',
                    options: {
                        webpackImporter: true,
                    },
                }]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        //     ignoreOrder: false, // ?????????????????????????????????
        // }),
        new webpack.DefinePlugin({
            process: {
                env: envValues
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/'
        })
    ]
}