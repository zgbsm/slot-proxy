const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware")
const bodyParser = require('body-parser')
const express = require('express')

module.exports = (options) => {
    let proxy
    if (options.slot === "None") {
        proxy = createProxyMiddleware({
            target: options.url,
            changeOrigin: true,
            secure: false
        })
    } else {
        const slot = require('../slots/'+options.slot)
        proxy = createProxyMiddleware({
            target: options.url,
            changeOrigin: true,
            selfHandleResponse: true,
            onProxyReq: slot.request,
            onProxyRes: responseInterceptor(slot.response),
            secure: false
        })
    }
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/', proxy)
    app.listen(options.port)
}
