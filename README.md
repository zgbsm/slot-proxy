# slot-proxy

## 运行
安装依赖：
```shell
npm install
```
运行：
```shell
node index.js -slot=hmac -url=http://127.0.0.1:8000 -port=8888
```

- -slot: slots文件夹下面的模块，定义了http请求和相应的处理方法
- -url: 代理的目标url
- -port: 代理服务的监听端口

## 编写slot

模板：
```javascript
const HMAC = require('crypto-js/hmac-md5')
const sendForm = require('../../utils/send-form')

let key = ''

module.exports = {
    request: (proxyReq, req, res) => {
        if (req.method === 'POST') {
            req.body.hmac = HMAC(req.body.id, key)
            console.log(key)
            // 将请求体作为表单发送
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
```
上面的代码在每次请求发送的时候，用html页面上的key对`id`参数进行hmac运算用来通过后端的数据校验，在每次接收请求的时候都会通过字符串处理算法提取页面上的key

具体的拦截/发送请求的代码说明可以参照http-proxy-middleware的例子：
- https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/response-interceptor.md
- https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md


