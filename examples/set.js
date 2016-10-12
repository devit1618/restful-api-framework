const { createServer } = require('http')
const { createApp } = require('../lib')

const app = createApp()

app.use(() => new Set([1, 2, 3]))

createServer(app.httpHandler).listen(80, '127.0.0.1', () => {
  console.log('Server running at http://localhost/')
})
