const framework = require('../../lib')

test('"createApp" to be defined', () => {
  expect(framework.createApp).toBeDefined()
})
