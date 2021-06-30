const fs = require('fs');
const http = require('http');

const server = http.createServer((requset, response) => {
  // console.log('center', getPrototypeChain(response));
  const { url, method, headers } = requset

  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        response.end('500 服务器错误')
        return
      }
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if (url === '/user' && method === 'GET') {
    response.writeHead(200, {'Content-Type':'application/json'})
    response.end(JSON.stringify({ name: 'zy' }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 统一描述所有的图片请求
    fs.createReadStream('.' + url).pipe(response)
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/plain;charset=utf-8')
    response.end('404 页面不存在')
  }
})
server.listen(3000, () => {
  console.log('server at 3000');
})

function getPrototypeChain(obj) {
  var protoChain = []
  while(obj = Object.getPrototypeOf(obj)) {
    protoChain.push(obj)
  }
  return protoChain
}