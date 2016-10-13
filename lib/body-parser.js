const hasBody = req =>
  req.headers['transfer-encoding'] !== undefined ||
  !isNaN(req.headers['content-length'])

const isJson = req =>
  String(req.headers['content-type'])
    .toLowerCase()
    .includes('application/json')

const json = (req, next) => new Promise((resolve, reject) => {
  if (!hasBody(req) || !isJson(req)) {
    resolve(next(req))
    return
  }

  req.setEncoding('utf8')

  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', () => {
    try {
      req.body = JSON.parse(body)
    } catch (ex) {
      reject({
        statusCode: 400,
        headers: {},
        body: {
          message: 'Invalid json body'
        }
      })
      return
    }

    resolve(next(req))
  })
})

const bodyParser = {
  json
}

module.exports = bodyParser
