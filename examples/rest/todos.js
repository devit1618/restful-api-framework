const { todos } = require('./db')
const { generate: generateId } = require('shortid')
const respond = require('./respond')

/*
|--------------------------------------------------------------------------
| GET /todos
|--------------------------------------------------------------------------
*/
const fetch = () =>
  todos.value()

/*
|--------------------------------------------------------------------------
| POST /todos
|--------------------------------------------------------------------------
*/
const insert = ({ body: { title }}) => {
  const todo = {
    id: generateId(),
    title,
    done: false
  }

  todos
    .push(todo)
    .value()

  const inserted = todos
    .find({ id: todo.id })
    .value()

  return respond(inserted, 201)
}

/*
|--------------------------------------------------------------------------
| GET /todos/:id
|--------------------------------------------------------------------------
*/
const find = ({ params: { id } }) =>
  todos
    .find({ id })
    .value() || respond('Todo not found', 404)

/*
|--------------------------------------------------------------------------
| PATCH /todos/:id
| PUT /todos/:id
|--------------------------------------------------------------------------
*/
const update = ({ params: { id }, body: { title, done } }) => {
  const todo = todos
    .find({ id })
    .value()

  if (!todo)
    return respond('Todo not found', 404)

  if (typeof title !== 'undefined')
    todo.title = title
  if (typeof done !== 'undefined')
    todo.done = done

  return todos
    .find({ id })
    .assign(todo)
    .value()
}

/*
|--------------------------------------------------------------------------
| DELETE /todos/:id
|--------------------------------------------------------------------------
*/
const remove = ({ params: { id } }) => {
  const removed = todos
    .remove({ id })
    .value()

  if (!removed.length)
    return respond('Todo not found', 404)

  return respond(undefined, 204)
}

exports.fetch = fetch
exports.insert = insert
exports.find = find
exports.update = update
exports.remove = remove
