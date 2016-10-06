const low = require('lowdb')

const db = low('rest-data.json')
db.defaults({ todos: [] }).value()

const todos = db.get('todos')

exports.todos = todos
