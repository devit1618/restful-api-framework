const waterfall = (array = []) => {
  const iterate = index => (...args) => {
    const fn = array[index]
    const next = iterate(index + 1)

    return fn ?
      Promise.resolve(fn(...args, next)) :
      Promise.resolve(...args)
  }

  try {
    return iterate(0)()
  } catch (ex) {
    return Promise.reject(ex)
  }
}

module.exports = waterfall
