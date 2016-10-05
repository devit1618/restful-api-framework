const json = (req, next) => new Promise((resolve, reject) => {
  const contentType = String(req.headers['content-type']).toLowerCase()

  if (!contentType.includes('application/json'))
    return resolve(next(req))

  req.setEncoding('utf8')

  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', () => {
    try {
      req.body = JSON.parse(body)
    } catch (ex) {
      return reject({
        statusCode: 400,
        headers: {},
        body: {
          message: 'Invalid json body'
        }
      })
    }

    resolve(next(req))
  })
})

const bodyParser = {
  json
}

module.exports = bodyParser
