const { createServer } = require('http')
const { createApp, createRouter } = require('../lib')

const app = createApp()
const router = createRouter()

const setName = (req, next) => next(req.params.name)
const hello = name => `Hello, ${name}!`

router.get('/hello/:name', setName, hello)

app.use(router.middleware)

createServer(app.httpHandler).listen(80, '127.0.0.1', () => {
  console.log('Server running at http://localhost/')
})
