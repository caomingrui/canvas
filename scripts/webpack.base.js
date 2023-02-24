const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

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
                        // options: {
                        //     importLoaders: 1
                        // }
                    },
                    {
                        loader: 'less-loader',
                        // options: {
                        //     importLoaders: 1
                        // }
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
                        ['@babel/preset-react', {"runtime": "automatic"}]
                    ]
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
