const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: buildPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // Runs compiled CSS through postcss for vendor prefixing
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            // All default supported tags and attributes
                            '...',
                            {
                                tag: 'img',
                                attribute: 'data-srcset',
                                type: 'srcset',
                            },
                            {
                                tag: 'source',
                                attribute: 'data-srcset',
                                type: 'srcset',
                            },
                        ],
                    },
                },
            },
        ],
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // Inject the js bundle at the end of the body of the given template
            inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css',
        }),
    ],
}
