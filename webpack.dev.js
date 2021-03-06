const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: ['./src/index.js'],
    devServer: {
        host: '0.0.0.0',
        port: 8888,
        static: {
            directory: __dirname,
        },
    },
    target: 'web',
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
                        // creates style nodes from JS strings
                        loader: 'style-loader',
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'expanded',
                                sourceMapContents: true,
                            },
                        },
                    },
                    // Please note we are not running postcss here
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
        }),
    ],
}
