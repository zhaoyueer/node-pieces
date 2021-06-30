const http = require('http')

function updateTime() {
  setInterval(() => this.time = new Date().toUTCString(), 1000)
  return this.time
}

http.createServer((req, res) => {
  console.log(`url: ${req.method} ${req.url}`);

  const { url } = req
  if ('/' === url) {
    res.setHeader('Expires', new Date(Date.now() + 1000 * 1000).toUTCString())
    res.end(`
    <html>
      <!-- <meta http-equiv="Refresh" content="5" /> -->
      Html Update Time: ${updateTime()}
      <script src="main.js"></script>
    </html>
    `)
  } else if (url === '/main.js') {
    const content = `document.writeln('<br>Js Update Time: ${updateTime()}')`

    /** 强缓存 */
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    // res.setHeader('Cache-Control', 'max-age=20')

    /** 协商缓存 - last-modified */
    // res.setHeader('Cache-Control', 'no-cache')
    // res.setHeader('last-modified', new Date().toUTCString())
    // if (new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }

    /** 协商缓存 - etag */
    res.setHeader('Cache-Control', 'no-cache')
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('Etag', hash)
    if (req.headers['if-none-match'] === hash) {
      res.statusCode = 304
      res.end()
      return
    }

    res.statusCode = 200
    res.end(content)
  } else if (url === '/favicon.icon') {
    res.end('')
  }
})
.listen(3000, () => {
  console.log('Http cache test at: 3000');
})