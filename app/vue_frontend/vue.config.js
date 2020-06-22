//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//    .BundleAnalyzerPlugin;

var webpack = require('webpack');
module.exports = {
    configureWebpack: {

        plugins: [
            //new BundleAnalyzerPlugin(),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            })
        ],
    },

//indexPath: process.env.NODE_ENV === 'production' ? '../../wq_flask/app/static/intro_page.html' : '/dist/index.html',
    //publicPath: process.env.NODE_ENV === 'production' ? '../../wq_flask/app/static' : '/dist/static',
    //assetsDir: process.env.NODE_ENV === 'production' ? 'vue' : '',
    /*
    pages: {
        intropage: {
            // entry for the page
            entry: 'src/pages/intro_page/main.js',
            // the source template
            template: 'public/intro_page.html',
            // output as dist/index.html
            filename: 'intro_page.html'

        },
        mappage: {
            entry: 'src/pages/olmappage/main.js',
            template: 'public/map_page.html',
            filename: 'map_page.html'
        }
    },
    */
    chainWebpack: config => config.optimization.minimize(false),

};
