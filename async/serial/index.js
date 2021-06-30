const logTime = (name) => {
  console.log(`log...${name} ${new Date().toLocaleDateString()}`);
}

/** callback */
exports.callback = () => {
  setTimeout(() => {
    logTime('callback 1')
    setTimeout(() => {
      logTime('callback 2')
    }, 100)
  }, 100)
}

/** promise */
const promise = (name, delay = 100) => new Promise(resolve => {
  setTimeout(() => {
    logTime(name)
    resolve()
  }, delay)
})

exports.promise = () => {
  promise('promise 1')
    .then(promise('promise 2'))
    .then(promise('promise3'))
}

/** generator */
function* func() {
  console.log('one')
  yield '1'
  console.log('two');
  yield '2'
  console.log('three');
  yield '3'
}

exports.generator = () => {
  const generator = function* (name) {
    yield promise(`${name}1`)
    yield promise(`${name}2`)
    yield promise(`${name}3`)
  }

  let co = generator => {
    if (it = generator.next().value) {
      it.then(res => {
        co(generator)
      })
    } else {
      return
    }
  }

  co(generator('Co-generator'))
}

/** async-await */
exports.asyncAwait = async () => {
  await promise('asyncawait1')
  await promise('asyncawait2')
  await promise('asyncawait3')
  await promise('asyncawait4')
}

/** 事件驱动 */
exports.event = async () => {
  const asyncFun = name => event => {
    setTimeout(() => {
      logTime(name)
      event.emit('end')
    }, 100)
    return event
  }

  const arry = [
    asyncFun('event1'),
    asyncFun('event2'),
    asyncFun('event3')
  ]

  const { EventEmitter } = require('events')
  const event = new EventEmitter()
  let i = 0
  event.on('end', () => {
    i < arry.length && arry[i++](event)
  })
  event.emit('end')
}