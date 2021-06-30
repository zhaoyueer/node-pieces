// 返回Promise风格接口 并使用async await语法
;(async () => {
  const fs = require('fs')
  const { promisify } = require('util')

  const readFile = promisify(fs.readFile)
  const data = await readFile('./config.json')
  console.log('data:', data.toString());
})()