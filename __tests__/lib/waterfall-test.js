const waterfall = require('../../lib/waterfall')

test('sync actions', () => {
  const actions = []

  actions.push(next => {
    return next(1)
  })

  actions.push((one, next) => {
    return next(one + 2)
  })

  return waterfall(actions)
    .then(r => expect(r).toBe(3))
})

test('async actions', () => {
  const actions = []

  actions.push(next => new Promise(resolve => {
    setTimeout(() => {
      resolve(next(1))
    }, 200)
  }))

  actions.push((one, next) => new Promise(resolve => {
    setTimeout(() => {
      resolve(next(one + 2))
    }, 200)
  }))

  return waterfall(actions)
    .then(r => expect(r).toBe(3))
})

test('rejects on exception', () => {
  const actions = []

  actions.push(() => {
    throw 'an error'
  })

  return waterfall(actions)
    .catch(e => expect(e).toBe('an error'))
})

test('after action', () => {
  const actions = []

  actions.push(next => {
    return next(1)
      .then(two => two + 1)
  })

  actions.push(one => {
    return one + 1
  })

  return waterfall(actions)
    .then(r => expect(r).toBe(3))
})