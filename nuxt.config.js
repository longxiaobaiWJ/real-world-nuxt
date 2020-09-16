module.exports = {
    router: {
        // base: '/nuxt/', // 使用vercel测试时，不能添加
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {

        }
    },
    plugins: ['~/plugins/request', '~/plugins/format', '~/plugins/directive'],
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost,
    }
}
