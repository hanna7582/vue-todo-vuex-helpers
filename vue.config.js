const CopyPlugin = require('copy-webpack-plugin');
let assetsDir = "assets";

module.exports = {
    publicPath: '/vue-todo-vuex-helpers/',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/styles.scss";`
            }
        }
    },
    assetsDir: assetsDir,
    configureWebpack: {
        output: {
            filename: "[name].js",
            chunkFilename: "chunk/[name].js"
        },
        plugins: [
            new CopyPlugin([{ from: 'src/assets', to: 'assets' }])
        ]
    },

    chainWebpack: config => {
        if (config.plugins.has("extract-css")) {
            const extractCSSPlugin = config.plugin("extract-css");
            extractCSSPlugin &&
                extractCSSPlugin.tap(() => [{
                    filename: assetsDir + "/[name].css",
                    chunkFilename: assetsDir + "/[name].css"
                }]);
        }

        config.plugins
            // .delete("html")
            .delete("prefetch")
            // .delete("preload");
    }
}