module.exports = {
    send: (proxyReq, body) => {
        let bodyStr = JSON.stringify(body)
        proxyReq.setHeader('Content-Type', 'application/json')
        proxyReq.setHeader('Content-Length', bodyStr.length)
        proxyReq.write(bodyStr)
        proxyReq.end()
    }
}