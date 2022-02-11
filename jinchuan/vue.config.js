/**
 * @Author 张宇辉
 * @Date 2021-03-22 15:28
 * @QQ 1719945567
 */

module.exports = {
    publicPath: "./",
    // assetsPublicPath: './',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/sass/main.scss";`,
            },
        }
    },
    devServer:{
        port:8081
    },
    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      },
/*        jquery:{
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ["popper.js", "default"]
        }*/

    },

    transpileDependencies: [
      'quasar'
    ]
}
