const createApp = require('../../lib/create-app')

const app = createApp()

test('"use" function to be defined', () => {
  expect(app.use).toBeDefined()
})

test('"httpHandler" function to be defined', () => {
  expect(app.httpHandler).toBeDefined()
})
