// 缓冲区 内存中的东西都是缓冲区 处理二进制对象 描述的二进制
const buf1 = Buffer.alloc(10)
console.log('buf1', buf1);

const buf2 = Buffer.from('a')
console.log('buf2', buf2);

// 图片分包 合并
const buf3 = Buffer.concat([buf2, Buffer.from('中')])
console.log('buf3', buf3);