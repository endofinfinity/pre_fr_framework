// 1. 引入http，创建服务应用
const http = require('http')
const server = http.createServer()
// 2.监听request请求，设置响应头和响应体
server.on('request', (req, res) => {
    // 响应头
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    // 响应体
    res.end('hello node.js')
})
// 3.配置端口，启动服务
server.listen(3001, () => console.log('node启动web服务'))