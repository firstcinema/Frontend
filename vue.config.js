module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                ws: true,
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('raw')
            .test(/\.html$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
    }
}