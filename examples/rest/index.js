const { createServer } = require('http')
const { createApp, createRouter, bodyParser } = require('../../lib')
const todos = require('./todos')
const respond = require('./respond')

const app = createApp()
const router = createRouter()

router.use(bodyParser.json)

router.get('/todos', todos.fetch)
router.post('/todos', todos.insert)
router.get('/todos/:id', todos.find)
router.route(['PATCH', 'PUT'], '/todos/:id', todos.update)
router.del('/todos/:id', todos.remove)

router.any('*', () => respond('Unknown endpoint', 404))

app.use(router.middleware)

createServer(app.httpHandler).listen(80, '127.0.0.1', () => {
  console.log('Server running at http://localhost/')
})
