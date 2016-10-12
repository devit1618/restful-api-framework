const { Readable } = require('stream')

const isObject = obj =>
  obj === Object(obj)

const isPlainObject = obj =>
  isObject(obj) && !Array.isArray(obj)

const isNumber = num =>
  typeof num === 'number'

const couldBeJson = value =>
  isObject(value) ||
  value instanceof Set ||
  value instanceof Map

const isResponse = value =>
  isPlainObject(value) &&
  isNumber(value.statusCode) &&
  isPlainObject(value.headers)

const stringify = value => JSON.stringify(
  value instanceof Set ?
    [...value] :
    value instanceof Map ?
      [...value].reduce((a, [k, v]) => { a[k] = v; return a }, {}) :
      value
)

const respond = (serverResponse, rejected = false) => response => {
  let statusCode, headers, body

  if (isResponse(response)) {
    statusCode = response.statusCode
    headers = response.headers
    body = response.body
  } else {
    statusCode = rejected ? 500 : 200
    headers = {}
    body = response
  }

  if (body instanceof Error)
    body = body.message

  if (body instanceof Readable) {
    serverResponse.writeHead(statusCode, Object.assign({
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/octet-stream',
      'Transfer-Encoding': 'chunked'
    }, headers))

    body.pipe(serverResponse)
  }

  else if (couldBeJson(body)) {
    const bodyString = stringify(body)

    serverResponse.writeHead(statusCode, Object.assign({
      'Content-Length': Buffer.byteLength(bodyString),
      'Content-Type': 'application/json'
    }, headers))

    serverResponse.end(bodyString)
  }

  else {
    const bodyString = typeof body === 'undefined' ? '' : String(body)

    serverResponse.writeHead(statusCode, Object.assign({
      'Content-Length': Buffer.byteLength(bodyString),
      'Content-Type': 'text/plain'
    }, headers))

    serverResponse.end(bodyString)
  }
}

const createResponse = serverResponse => [
  respond(serverResponse),
  respond(serverResponse, true)
]

module.exports = createResponse
