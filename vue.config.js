const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/wochenplan/' : '/',
    configureWebpack: {
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, './public/index.html'),
                    path.join(__dirname, './src/**/*.vue'),
                    path.join(__dirname, './src/**/*.ts')
                ])
            })
        ]
    }
}