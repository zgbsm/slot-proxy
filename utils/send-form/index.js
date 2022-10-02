module.exports = {
    send: (proxyReq, body) => {
        let bodyStr = Object.keys(body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
        }).join('&')
        proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        proxyReq.setHeader('Content-Length', bodyStr.length)
        proxyReq.write(bodyStr)
        proxyReq.end()
    }
}