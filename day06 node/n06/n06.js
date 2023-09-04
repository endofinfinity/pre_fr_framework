const fs = require('fs')
const path = require('path')

const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    if (req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            // 响应体
            res.end(data.toString())
        })
    } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.eventNames("资源不存在")
    }
})

server.listen(8080,()=>{
    console.log('web已经启动');
})