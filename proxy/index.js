const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware")
const bodyParser = require('body-parser')
const express = require('express')

module.exports = (options) => {
    const slot = require('../slots/'+options.slot)
    const proxy = createProxyMiddleware({
        target: options.url,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyReq: slot.request,
        onProxyRes: responseInterceptor(slot.response)
    })
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/', proxy)
    app.listen(options.port)
}
