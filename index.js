const server = require('./proxy')

const args = process.argv.slice(2)
let options = {
    slot: '',
    port: 0,
    url: ''
}
for (const arg of args) {
    const option = arg.split('=', 2)
    switch (option[0]) {
        case '-slot':
            options.slot = option[1]
            break
        case '-url':
            options.url = option[1]
            break
        case '-port':
            options.port = option[1]
            break
    }
}
server(options)


// https://github.com/chimurai/http-proxy-middleware