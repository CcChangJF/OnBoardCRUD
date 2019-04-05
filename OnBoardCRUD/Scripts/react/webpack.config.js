const path = require('path');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        index: "./index.jsx",
        customer: "./Customer/Customer.jsx",
        store: "./Store/Store.jsx",
        product: "./Product/Product.jsx",
        sales: "./Sales/Sales.jsx"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react', 'es2016'],
                        plugins: "babel-plugin-transform-class-properties"
                    }
                }
            },
            {
                test: /\.(s?)css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },

            // may need more test
            {
                test: /\.(png|svg|jpg|gif|ico|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }

        ]
    }
}