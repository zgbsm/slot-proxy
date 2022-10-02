const HMAC = require('crypto-js/hmac-md5')
const sendForm = require('../../utils/send-form')

let key = ''

module.exports = {
    request: (proxyReq, req, res) => {
        if (req.method === 'POST') {
            req.body.hmac = HMAC(req.body.id, key)
            console.log(key)
            sendForm.send(proxyReq, req.body)
        }
    },
    response: async (responseBuffer, proxyRes, req, res) => {
        let text = responseBuffer.toString()
        let lines = text.split('\n')
        for (const line of lines) {
            if (line.match('let key = ')) {
                key = line.replace("let key = '", "")
                key = key.replaceAll(' ', '')
                key = key.replaceAll("'", "")
                break
            }
        }
        return responseBuffer
    }
}

// https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/response-interceptor.md
// https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md