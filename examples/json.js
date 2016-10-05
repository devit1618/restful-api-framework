const { createServer } = require('http')
const { createApp, bodyParser } = require('../lib')

const app = createApp()

app.use(bodyParser.json)
app.use(req => ({
  body: req.body
}))

createServer(app.httpHandler).listen(80, '127.0.0.1', () => {
  console.log('Server running at http://localhost/')
})
