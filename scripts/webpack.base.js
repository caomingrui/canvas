const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const JSXPlugin = require("../plugins/jsx_parser")

const htmlPlugin = new HtmlPlugin({
    template: 'public/index.html',
    filename: 'index.html'
})

const baseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: ['./main.tsx'],
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    }]
            },
            {
                test: /\.js|.ts|.jsx|.tsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/preset-env',  {
                            targets: {
                                browsers: ['last 2 versions']
                            }
                        }],
                        '@babel/preset-typescript',
                    ],
                    plugins: [[JSXPlugin, { "pragma": "h" }]]
                }
            }]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [htmlPlugin],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
}


module.exports = baseConfig;
