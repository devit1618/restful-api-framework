const isPromise = value =>
  typeof value.then === 'function'

const isGenerator = value =>
  typeof value.next === 'function'

const resolveIterator = iterator => new Promise((resolve, reject) => {
  const iterate = (data, x = 'next') => {
    let iteration

    try {
      iteration = iterator[x](data)
    } catch (ex) {
      reject(ex)
      return
    }

    iteration.done ?
      resolve(iteration.value) :
      Promise.resolve(iteration.value)
        .then(iterate, reason => {
          iterate(reason, 'throw')
        })
  }

  iterate()
})

const resolveValue = value =>
  isPromise(value) ?
    value :
    isGenerator(value) ?
      resolveIterator(value) :
      Promise.resolve(value)

const waterfall = (array = []) => {
  const iterate = index => (...args) => {
    const fn = array[index]
    const next = iterate(index + 1)

    return fn ?
      resolveValue(fn(...args, next)) :
      Promise.resolve(...args)
  }

  try {
    return iterate(0)()
  } catch (ex) {
    return Promise.reject(ex)
  }
}

module.exports = waterfall
